import { setCssVar } from './set-css-var';

describe('setCssVar', () => {
  beforeEach(() => {
    document.documentElement.style.removeProperty('--test-var');
  });

  afterEach(() => {
    document.documentElement.style.removeProperty('--test-var');
  });

  test('Sets a CSS variable with string value', () => {
    setCssVar('--test-var', '#ff0000');
    const value = document.documentElement.style.getPropertyValue('--test-var');
    expect(value).toBe('#ff0000');
  });

  test('Sets a CSS variable with number value', () => {
    setCssVar('--test-var', 16);
    const value = document.documentElement.style.getPropertyValue('--test-var');
    expect(value).toBe('16');
  });

  test('Sets a CSS variable with spacing value', () => {
    setCssVar('--test-var', '16px');
    const value = document.documentElement.style.getPropertyValue('--test-var');
    expect(value).toBe('16px');
  });

  test('Does nothing when :root is not found', () => {
    const originalQuerySelector = document.querySelector;
    document.querySelector = jest.fn().mockReturnValue(null);

    setCssVar('--test-var', 'value');
    // Should not throw
    expect(true).toBe(true);

    document.querySelector = originalQuerySelector;
  });
});

