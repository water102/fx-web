/**
 * Cookie management helper class.
 * @example
 * const cookies = new CookiesHelper();
 * cookies.setItem('sessionId', 'abc123', new Date('2024-12-31'), '/', '', false);
 * const value = cookies.getItem('sessionId');
 */
export declare class CookiesHelper {
    /**
     * Gets a cookie value by key.
     * @param sKey - The cookie key
     * @returns The cookie value or null if not found
     */
    getItem(sKey: string): string | null;
    /**
     * Sets a cookie.
     * @param sKey - The cookie key
     * @param sValue - The cookie value
     * @param vEnd - Expiration date or max-age in seconds
     * @param sPath - The path for the cookie
     * @param sDomain - The domain for the cookie
     * @param bSecure - Whether the cookie should be secure (HTTPS only)
     * @returns True if the cookie was set successfully
     */
    setItem(sKey: string, sValue: string, vEnd: Date | number, sPath: string, sDomain: string, bSecure: boolean): boolean;
    /**
     * Removes a cookie.
     * @param sKey - The cookie key to remove
     * @param sPath - The path of the cookie
     * @param sDomain - The domain of the cookie
     * @returns True if the cookie was removed successfully
     */
    removeItem(sKey: string, sPath: string, sDomain: string): boolean;
    /**
     * Checks if a cookie exists.
     * @param sKey - The cookie key to check
     * @returns True if the cookie exists
     */
    hasItem(sKey: string): boolean;
    /**
     * Gets all cookie keys.
     * @returns An array of all cookie keys
     */
    keys(): string[];
}
//# sourceMappingURL=cookies-helper.d.ts.map