export function updateQueryString(
  uri: string,
  key: string,
  value: string | number | undefined
) {
  const re = new RegExp('([?&])' + key + '=.*?(&|#|$)', 'i');
  if (value === undefined) {
    if (uri.match(re)) {
      return uri.replace(re, '$1$2');
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

export function getQueryString(name: string, defaultVal = '') {
  const regexS = '[\\?&]' + name + '=([^&#]*)',
    regex = new RegExp(regexS, 'i'),
    results = regex.exec(window.location.search);
  if (results == null) {
    return defaultVal;
  } else {
    return decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
}
