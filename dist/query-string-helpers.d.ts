/**
 * Updates or removes a query string parameter in a URI.
 * @param uri - The URI to update
 * @param key - The query parameter key
 * @param value - The value to set, or undefined to remove the parameter
 * @returns The updated URI
 * @example
 * const newUrl = updateQueryString('/page', 'id', '123');
 * const removed = updateQueryString('/page', 'id', undefined);
 */
export declare function updateQueryString(uri: string, key: string, value: string | number | undefined): string;
/**
 * Gets a query string parameter from the current URL.
 * @param name - The parameter name
 * @param defaultVal - The default value if parameter is not found
 * @returns The parameter value or default value
 * @example
 * const userId = getQueryString('userId', '0');
 * const token = getQueryString('token');
 */
export declare function getQueryString(name: string, defaultVal?: string): string;
//# sourceMappingURL=query-string-helpers.d.ts.map