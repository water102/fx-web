/**
 * Stores data in localStorage with JSON serialization.
 * @param key - The storage key
 * @param data - The data to store (will be serialized to JSON)
 * @example
 * setItem('user', { name: 'John', age: 30 });
 */
export const setItem = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    }
    catch (error) {
        throw new Error(`Failed to set item in localStorage: ${error instanceof Error ? error.message : String(error)}`);
    }
};
/**
 * Retrieves data from localStorage with JSON parsing.
 * @param key - The storage key
 * @returns The parsed data or null if not found
 * @example
 * const user = getItem('user'); // { name: 'John', age: 30 }
 */
export const getItem = (key) => {
    try {
        const json = localStorage.getItem(key);
        if (json) {
            return JSON.parse(json);
        }
        return null;
    }
    catch (error) {
        throw new Error(`Failed to get item from localStorage: ${error instanceof Error ? error.message : String(error)}`);
    }
};
