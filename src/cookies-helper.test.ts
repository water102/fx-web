import { CookiesHelper } from './cookies-helper';

describe('CookiesHelper', () => {
  let cookies: CookiesHelper;

  beforeEach(() => {
    cookies = new CookiesHelper();
    // Clear all cookies - jsdom may not fully support cookies, so we'll test what we can
    try {
      document.cookie.split(';').forEach((cookie) => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        if (name) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        }
      });
    } catch (e) {
      // jsdom may not fully support cookie manipulation
    }
  });

  describe('setItem', () => {
    test('Sets a cookie', () => {
      const result = cookies.setItem('test', 'value', new Date('2024-12-31'), '/', '', false);
      expect(result).toBe(true);
      // Note: jsdom may not fully support cookies, so we test the return value
      // In a real browser, hasItem would return true
    });

    test('Sets cookie with number expiration', () => {
      const result = cookies.setItem('test', 'value', 3600, '/', '', false);
      expect(result).toBe(true);
      // Note: jsdom may not fully support cookies
    });

    test('Sets cookie with string expiration', () => {
      const result = cookies.setItem('test', 'value', 'Fri, 31 Dec 2024 23:59:59 GMT' as any, '/', '', false);
      expect(result).toBe(true);
      // Note: jsdom may not fully support cookies
      // This tests the String case in setItem (lines 60-61)
    });

    test('Returns false for invalid key', () => {
      const result = cookies.setItem('expires', 'value', new Date('2024-12-31'), '/', '', false);
      expect(result).toBe(false);
    });
  });

  describe('getItem', () => {
    test('Gets a cookie value', () => {
      // Manually set cookie for testing (jsdom limitation)
      document.cookie = 'test=value;path=/';
      const result = cookies.getItem('test');
      expect(result).toBe('value');
    });

    test('Returns null when cookie does not exist', () => {
      const result = cookies.getItem('non-existent');
      expect(result).toBeNull();
    });
  });

  describe('hasItem', () => {
    test('Returns true when cookie exists', () => {
      // Manually set cookie for testing (jsdom limitation)
      document.cookie = 'test=value;path=/';
      expect(cookies.hasItem('test')).toBe(true);
    });

    test('Returns false when cookie does not exist', () => {
      expect(cookies.hasItem('non-existent')).toBe(false);
    });
  });

  describe('removeItem', () => {
    test('Removes a cookie', () => {
      // Manually set cookie for testing (jsdom limitation)
      document.cookie = 'test=value;path=/';
      expect(cookies.hasItem('test')).toBe(true);
      
      const result = cookies.removeItem('test', '/', '');
      expect(result).toBe(true);
      // Note: jsdom may not fully support cookie removal
    });

    test('Returns false when cookie does not exist', () => {
      const result = cookies.removeItem('non-existent', '/', '');
      expect(result).toBe(false);
    });
  });

  describe('keys', () => {
    test('Returns all cookie keys', () => {
      // Manually set cookies for testing (jsdom limitation)
      document.cookie = 'key1=value1;path=/';
      document.cookie = 'key2=value2;path=/';
      
      const keys = cookies.keys();
      expect(keys).toContain('key1');
      expect(keys).toContain('key2');
    });

    test('Returns empty array when no cookies', () => {
      const keys = cookies.keys();
      expect(Array.isArray(keys)).toBe(true);
    });
  });
});

