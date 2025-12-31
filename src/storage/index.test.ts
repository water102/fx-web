import { setItem, getItem } from './index';

describe('Storage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('setItem', () => {
    test('Stores an object in localStorage', () => {
      const data = { name: 'John', age: 30 };
      setItem('user', data);
      const stored = localStorage.getItem('user');
      expect(stored).toBe(JSON.stringify(data));
    });

    test('Stores a string in localStorage', () => {
      setItem('message', 'Hello World');
      const stored = localStorage.getItem('message');
      expect(stored).toBe('"Hello World"');
    });

    test('Stores a number in localStorage', () => {
      setItem('count', 42);
      const stored = localStorage.getItem('count');
      expect(stored).toBe('42');
    });

    test('Stores an array in localStorage', () => {
      const data = [1, 2, 3];
      setItem('numbers', data);
      const stored = localStorage.getItem('numbers');
      expect(stored).toBe(JSON.stringify(data));
    });

    test('Throws error when localStorage is full', () => {
      // Mock localStorage.setItem to throw using jest.spyOn
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('QuotaExceededError');
      });

      expect(() => {
        setItem('key', 'value');
      }).toThrow('Failed to set item in localStorage');

      setItemSpy.mockRestore();
    });

    test('Throws error with non-Error exception', () => {
      // Test error handling when exception is not an Error instance (line 12)
      const setItemSpy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw 'String error';
      });

      expect(() => {
        setItem('key', 'value');
      }).toThrow('Failed to set item in localStorage');

      setItemSpy.mockRestore();
    });
  });

  describe('getItem', () => {
    test('Retrieves an object from localStorage', () => {
      const data = { name: 'John', age: 30 };
      localStorage.setItem('user', JSON.stringify(data));
      const result = getItem<typeof data>('user');
      expect(result).toEqual(data);
    });

    test('Retrieves a string from localStorage', () => {
      localStorage.setItem('message', JSON.stringify('Hello World'));
      const result = getItem<string>('message');
      expect(result).toBe('Hello World');
    });

    test('Retrieves a number from localStorage', () => {
      localStorage.setItem('count', '42');
      const result = getItem<number>('count');
      expect(result).toBe(42);
    });

    test('Returns null when key does not exist', () => {
      const result = getItem('non-existent');
      expect(result).toBeNull();
    });

    test('Throws error when JSON is invalid', () => {
      localStorage.setItem('invalid', 'not valid json{');
      expect(() => {
        getItem('invalid');
      }).toThrow('Failed to get item from localStorage');
    });

    test('Throws error with non-Error exception in getItem', () => {
      // Test error handling when exception is not an Error instance (line 31)
      const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw 'String error';
      });

      expect(() => {
        getItem('key');
      }).toThrow('Failed to get item from localStorage');

      getItemSpy.mockRestore();
    });
  });
});

