/**
 * Cookie management helper class.
 * @example
 * const cookies = new CookiesHelper();
 * cookies.setItem('sessionId', 'abc123', new Date('2024-12-31'), '/', '', false);
 * const value = cookies.getItem('sessionId');
 */
export class CookiesHelper {
    /**
     * Gets a cookie value by key.
     * @param sKey - The cookie key
     * @returns The cookie value or null if not found
     */
    getItem(sKey) {
        return (decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' +
            encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null);
    }
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
    setItem(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        let sExpires;
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires =
                        vEnd === Infinity
                            ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                            : '; max-age=' + vEnd;
                    break;
                case String:
                    sExpires = '; expires=' + vEnd;
                    break;
                case Date:
                    sExpires = '; expires=' + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie =
            encodeURIComponent(sKey) +
                '=' +
                encodeURIComponent(sValue) +
                sExpires +
                (sDomain ? '; domain=' + sDomain : '') +
                (sPath ? '; path=' + sPath : '') +
                (bSecure ? '; secure' : '');
        return true;
    }
    /**
     * Removes a cookie.
     * @param sKey - The cookie key to remove
     * @param sPath - The path of the cookie
     * @param sDomain - The domain of the cookie
     * @returns True if the cookie was removed successfully
     */
    removeItem(sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) {
            return false;
        }
        document.cookie =
            encodeURIComponent(sKey) +
                '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
                (sDomain ? '; domain=' + sDomain : '') +
                (sPath ? '; path=' + sPath : '');
        return true;
    }
    /**
     * Checks if a cookie exists.
     * @param sKey - The cookie key to check
     * @returns True if the cookie exists
     */
    hasItem(sKey) {
        return new RegExp('(?:^|;\\s*)' +
            encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=').test(document.cookie);
    }
    /**
     * Gets all cookie keys.
     * @returns An array of all cookie keys
     */
    keys() {
        const aKeys = document.cookie
            .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
            .split(/\s*(?:\=[^;]*)?;\s*/);
        for (let nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
}
