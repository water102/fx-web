import { getWindowDimensions } from './get-window-dimensions';

describe('getWindowDimensions', () => {
  test('Returns window width and height', () => {
    const result = getWindowDimensions();
    expect(result).toHaveProperty('width');
    expect(result).toHaveProperty('height');
    expect(typeof result.width).toBe('number');
    expect(typeof result.height).toBe('number');
    expect(result.width).toBe(window.innerWidth);
    expect(result.height).toBe(window.innerHeight);
  });

  test('Returns correct dimensions', () => {
    // Mock window dimensions
    const originalInnerWidth = window.innerWidth;
    const originalInnerHeight = window.innerHeight;

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    });

    const result = getWindowDimensions();
    expect(result.width).toBe(1920);
    expect(result.height).toBe(1080);

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });
});

