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
export function updateQueryString(
  uri: string,
  key: string,
  value: string | number | undefined
): string {
  const re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
  if (value === undefined) {
    if (uri.match(re)) {
      const replaced = uri.replace(re, '$1$2');
      // Clean up double separators (e.g., ?& -> ?)
      return replaced.replace(/\?&/, '?').replace(/&&/g, '&');
    } else {
      return uri;
    }
  } else {
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      let hash = '';
      if (uri.indexOf('#') !== -1) {
        hash = uri.replace(/.*#/, '#');
        uri = uri.replace(/#.*/, '');
      }
      const separator = uri.indexOf('?') !== -1 ? '&' : '?';
      return uri + separator + key + '=' + value + hash;
    }
  }
}

/**
 * Gets a query string parameter from the current URL.
 * @param name - The parameter name
 * @param defaultVal - The default value if parameter is not found
 * @returns The parameter value or default value
 * @example
 * const userId = getQueryString('userId', '0');
 * const token = getQueryString('token');
 */
export function getQueryString(name: string, defaultVal = ''): string {
  const regexS = '[\\?&]' + name + '=([^&#]*)',
    regex = new RegExp(regexS, 'i'),
    results = regex.exec(window.location.search);
  if (results == null) {
    return defaultVal;
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
}
