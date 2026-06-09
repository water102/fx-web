/**
 * Stores data in localStorage with JSON serialization.
 * @param key - The storage key
 * @param data - The data to store (will be serialized to JSON)
 * @example
 * setItem('user', { name: 'John', age: 30 });
 */
export declare const setItem: <T>(key: string, data: T) => void;
/**
 * Retrieves data from localStorage with JSON parsing.
 * @param key - The storage key
 * @returns The parsed data or null if not found
 * @example
 * const user = getItem('user'); // { name: 'John', age: 30 }
 */
export declare const getItem: <T>(key: string) => T | null;
//# sourceMappingURL=index.d.ts.map