type PendingRequest<T> = {
  resolve: (value: T) => void;
  timeoutId: ReturnType<typeof setTimeout>;
};

export type WorkerRequestPool<TFallback> = {
  track: (requestId: number, fallback: TFallback) => Promise<TFallback>;
  complete: (requestId: number, value: TFallback) => void;
  rejectAll: (fallback: TFallback) => void;
  attachFailureHandlers: (worker: Worker, terminateWorker: () => void) => void;
};

export const createWorkerRequestPool = <TFallback>(opts: {
  logTag: string;
  timeoutMs?: number;
  onWorkerReset?: () => void;
  workerErrorFallback: TFallback;
}): WorkerRequestPool<TFallback> => {
  const pending = new Map<number, PendingRequest<TFallback>>();
  const timeoutMs = opts.timeoutMs ?? 15_000;

  const rejectAll = (fallback: TFallback): void => {
    if (pending.size > 0) {
      console.warn(`[${opts.logTag}] rejecting pending worker requests`, {
        pendingCount: pending.size,
      });
    }
    for (const req of pending.values()) {
      clearTimeout(req.timeoutId);
      req.resolve(fallback);
    }
    pending.clear();
    opts.onWorkerReset?.();
  };

  const complete = (requestId: number, value: TFallback): void => {
    const req = pending.get(requestId);
    if (!req) {
      return;
    }
    pending.delete(requestId);
    clearTimeout(req.timeoutId);
    req.resolve(value);
  };

  const track = (requestId: number, fallback: TFallback): Promise<TFallback> =>
    new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        if (!pending.has(requestId)) {
          return;
        }
        pending.delete(requestId);
        console.warn(`[${opts.logTag}] worker request timeout`, {
          requestId,
          timeoutMs,
        });
        resolve(fallback);
      }, timeoutMs);
      pending.set(requestId, { resolve, timeoutId });
    });

  const attachFailureHandlers = (
    worker: Worker,
    terminateWorker: () => void,
  ): void => {
    worker.onerror = () => {
      console.warn(`[${opts.logTag}] worker error`);
      terminateWorker();
      rejectAll(opts.workerErrorFallback);
    };
    worker.onmessageerror = () => {
      console.warn(`[${opts.logTag}] worker message error`);
      terminateWorker();
      rejectAll(opts.workerErrorFallback);
    };
  };

  return { track, complete, rejectAll, attachFailureHandlers };
};
