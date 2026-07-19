export type ProtocolWorkerLogger = {
  warn: (message: string, meta?: Record<string, unknown>) => void;
};

export type ProtocolWorkerClientConfig<
  TIn,
  TOut,
  TAction,
  TArgs extends unknown[] = [],
> = {
  /** Caller must construct via `new Worker(new URL(..., import.meta.url))` or `?worker` so Vite bundles it. */
  createWorker: () => Worker;
  logTag: string;
  parseTimeoutMs?: number;
  logger?: ProtocolWorkerLogger;
  isParsedMessage: (
    msg: TOut,
  ) => msg is TOut & {
    type: "parsed";
    requestId: number;
    action: TAction | null;
  };
  buildParseMessage: (
    requestId: number,
    frameBuf: ArrayBuffer,
    ...args: TArgs
  ) => TIn;
};

export type ProtocolWorkerClient<TAction, TArgs extends unknown[] = []> = {
  parseFrameInWorker: (
    frame: Uint8Array,
    ...args: TArgs
  ) => Promise<TAction | null> | null;
};

type PendingRequest<T> = {
  resolve: (action: T | null) => void;
  timeoutId: ReturnType<typeof setTimeout>;
};

const defaultLogger: ProtocolWorkerLogger = {
  warn: (message, meta) => {
    console.warn(message, meta);
  },
};

/**
 * Shared Web Worker client for binary frame parse off the main thread.
 * Returns `null` from `parseFrameInWorker` when Worker is unavailable.
 */
export const createProtocolWorkerClient = <
  TIn,
  TOut,
  TAction,
  TArgs extends unknown[] = [],
>(
  config: ProtocolWorkerClientConfig<TIn, TOut, TAction, TArgs>,
): ProtocolWorkerClient<TAction, TArgs> => {
  const log = config.logger ?? defaultLogger;
  let worker: Worker | null = null;
  let requestId = 1;
  const pending = new Map<number, PendingRequest<TAction>>();
  const parseTimeoutMs = config.parseTimeoutMs ?? 1_500;

  const terminateWorker = (): void => {
    if (!worker) {
      return;
    }
    try {
      worker.terminate();
    } catch {
      /* ignore */
    }
    worker = null;
  };

  const resolveAllPendingAsFallback = (): void => {
    log.warn(`[${config.logTag}] fallback all pending requests`, {
      pendingCount: pending.size,
    });
    for (const req of pending.values()) {
      clearTimeout(req.timeoutId);
      req.resolve(null);
    }
    pending.clear();
  };

  const onWorkerMessage = (event: MessageEvent<TOut>): void => {
    const msg = event.data;
    if (!config.isParsedMessage(msg)) {
      return;
    }
    const req = pending.get(msg.requestId);
    if (!req) {
      return;
    }
    pending.delete(msg.requestId);
    clearTimeout(req.timeoutId);
    req.resolve(msg.action);
  };

  const ensureWorker = (): Worker | null => {
    if (worker) {
      return worker;
    }
    if (typeof Worker === "undefined") {
      return null;
    }
    try {
      worker = config.createWorker();
      worker.onmessage = onWorkerMessage;
      worker.onerror = () => {
        log.warn(`[${config.logTag}] worker error, fallback to main thread`);
        terminateWorker();
        resolveAllPendingAsFallback();
      };
      worker.onmessageerror = () => {
        log.warn(`[${config.logTag}] message error, fallback to main thread`);
        terminateWorker();
        resolveAllPendingAsFallback();
      };
      return worker;
    } catch {
      return null;
    }
  };

  const parseFrameInWorker = (
    frame: Uint8Array,
    ...args: TArgs
  ): Promise<TAction | null> | null => {
    const w = ensureWorker();
    if (!w) {
      return null;
    }
    if (!(frame instanceof Uint8Array)) {
      return null;
    }
    const id = requestId++;
    const frameBuf = frame.buffer.slice(
      frame.byteOffset,
      frame.byteOffset + frame.byteLength,
    ) as ArrayBuffer;
    const promise = new Promise<TAction | null>((resolve) => {
      const timeoutId = setTimeout(() => {
        const req = pending.get(id);
        if (!req) {
          return;
        }
        log.warn(`[${config.logTag}] parse timeout, fallback`, {
          requestId: id,
          timeoutMs: parseTimeoutMs,
        });
        pending.delete(id);
        resolve(null);
      }, parseTimeoutMs);
      pending.set(id, { resolve, timeoutId });
    });
    const msg = config.buildParseMessage(id, frameBuf, ...args);
    w.postMessage(msg, [frameBuf]);
    return promise;
  };

  return { parseFrameInWorker };
};
