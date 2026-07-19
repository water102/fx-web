export type ImageObjectUrlCacheOptions = {
  /** Max cached source URLs; oldest entries are revoked when exceeded. */
  maxEntries?: number;
  fetchImpl?: typeof fetch;
  createObjectURL?: (blob: Blob) => string;
  revokeObjectURL?: (url: string) => void;
};

export type ImageObjectUrlCache = {
  get: (sourceUrl: string) => Promise<string | null>;
  clear: () => void;
};

/**
 * Fetch once per source URL and reuse a `blob:` object URL.
 * Concurrent loads for the same URL share one in-flight promise.
 */
export const createImageObjectUrlCache = (
  options: ImageObjectUrlCacheOptions = {},
): ImageObjectUrlCache => {
  const maxEntries = options.maxEntries ?? 200;
  const fetchImpl = options.fetchImpl ?? fetch.bind(globalThis);
  const createObjectURL =
    options.createObjectURL ?? ((blob: Blob) => URL.createObjectURL(blob));
  const revokeObjectURL =
    options.revokeObjectURL ?? ((url: string) => URL.revokeObjectURL(url));

  const blobCache = new Map<string, Blob>();
  const objectUrlCache = new Map<string, string>();
  const loading = new Map<string, Promise<string | null>>();
  const order: string[] = [];

  const touch = (sourceUrl: string): void => {
    const idx = order.indexOf(sourceUrl);
    if (idx >= 0) {
      order.splice(idx, 1);
    }
    order.push(sourceUrl);
  };

  const evictIfNeeded = (): void => {
    while (order.length > maxEntries) {
      const oldest = order.shift();
      if (!oldest) {
        break;
      }
      const url = objectUrlCache.get(oldest);
      if (url) {
        revokeObjectURL(url);
      }
      objectUrlCache.delete(oldest);
      blobCache.delete(oldest);
      loading.delete(oldest);
    }
  };

  const get = (sourceUrl: string): Promise<string | null> => {
    const urlHit = objectUrlCache.get(sourceUrl);
    if (urlHit) {
      touch(sourceUrl);
      return Promise.resolve(urlHit);
    }

    const pending = loading.get(sourceUrl);
    if (pending) {
      return pending;
    }

    const promise = (async (): Promise<string | null> => {
      let blob = blobCache.get(sourceUrl);
      if (!blob) {
        const response = await fetchImpl(sourceUrl);
        if (!response.ok) {
          return null;
        }
        blob = await response.blob();
        if (!blob.size) {
          return null;
        }
        blobCache.set(sourceUrl, blob);
      }

      const objectUrl = createObjectURL(blob);
      objectUrlCache.set(sourceUrl, objectUrl);
      touch(sourceUrl);
      evictIfNeeded();
      return objectUrl;
    })().finally(() => {
      loading.delete(sourceUrl);
    });

    loading.set(sourceUrl, promise);
    return promise;
  };

  const clear = (): void => {
    for (const url of objectUrlCache.values()) {
      revokeObjectURL(url);
    }
    objectUrlCache.clear();
    blobCache.clear();
    loading.clear();
    order.length = 0;
  };

  return { get, clear };
};
