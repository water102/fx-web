import { createWorkerRequestPool } from './worker-request-pool';

describe('createWorkerRequestPool', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('resolves on complete', async () => {
    const pool = createWorkerRequestPool({
      logTag: 'test',
      workerErrorFallback: null,
    });
    const promise = pool.track(1, 'fallback');
    pool.complete(1, 'ok');
    await expect(promise).resolves.toBe('ok');
  });

  test('resolves fallback on timeout', async () => {
    const pool = createWorkerRequestPool({
      logTag: 'test',
      timeoutMs: 100,
      workerErrorFallback: 'err',
    });
    const promise = pool.track(2, 'timeout');
    jest.advanceTimersByTime(100);
    await expect(promise).resolves.toBe('timeout');
  });
});
