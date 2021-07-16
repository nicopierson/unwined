import Cookies from 'js-cookie';

export async function csrfFetch(url, options = {}) {
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  // if method is not 'GET', set 'Content-Type' header to 'application/json'
  // and set the 'XSRF-TOKEN' header to the value of the cookie
  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = 
      options.headers['Content-Type'] || 'application/json';
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
  }

  // call default window fetch with url and options
  const res = await window.fetch(url, options);

  // if res is 400, throw error
  if (res.status >= 404) throw res;

  return res;
}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}