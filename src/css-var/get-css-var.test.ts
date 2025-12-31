import { getCssVar } from './get-css-var';

describe('getCssVar', () => {
  beforeEach(() => {
    document.documentElement.style.setProperty('--test-color', '#ff0000');
    document.documentElement.style.setProperty('--test-spacing', '16px');
  });

  afterEach(() => {
    document.documentElement.style.removeProperty('--test-color');
    document.documentElement.style.removeProperty('--test-spacing');
  });

  test('Gets a CSS variable value that exists', () => {
    const result = getCssVar('--test-color');
    // jsdom may return the value as-is or as rgb, so check for either
    expect(result === '#ff0000' || result === 'rgb(255, 0, 0)').toBe(true);
  });

  test('Gets a CSS variable value with spacing', () => {
    const result = getCssVar('--test-spacing');
    expect(result.trim()).toBe('16px');
  });

  test('Returns empty string for non-existent CSS variable', () => {
    const result = getCssVar('--non-existent');
    expect(result).toBe('');
  });

  test('Returns empty string when :root is not found', () => {
    // Mock querySelector to return null
    const originalQuerySelector = document.querySelector;
    document.querySelector = jest.fn().mockReturnValue(null);

    const result = getCssVar('--test-color');
    expect(result).toBe('');

    document.querySelector = originalQuerySelector;
  });
});

