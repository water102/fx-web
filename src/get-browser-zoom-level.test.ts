import { getBrowserZoomLevel } from './get-browser-zoom-level';

describe('getBrowserZoomLevel', () => {
  test('Returns device pixel ratio', () => {
    const result = getBrowserZoomLevel();
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThan(0);
    expect(result).toBe(window.devicePixelRatio);
  });

  test('Returns 1 for normal zoom level', () => {
    // Mock devicePixelRatio
    const originalDevicePixelRatio = window.devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 1,
    });

    const result = getBrowserZoomLevel();
    expect(result).toBe(1);

    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: originalDevicePixelRatio,
    });
  });

  test('Returns zoomed value when zoomed in', () => {
    // Mock devicePixelRatio
    const originalDevicePixelRatio = window.devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: 1.5,
    });

    const result = getBrowserZoomLevel();
    expect(result).toBe(1.5);

    Object.defineProperty(window, 'devicePixelRatio', {
      writable: true,
      configurable: true,
      value: originalDevicePixelRatio,
    });
  });
});

