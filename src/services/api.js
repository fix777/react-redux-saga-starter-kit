import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';

export const APP_NAME_MAP = {
  GITHUB: 'github',
};

export const API_ROOT_MAP = {
  development: {
    [APP_NAME_MAP.GITHUB]: 'https://api.github.com/',
  },
}[process.env.NODE_ENV];

export function callApi({ appName, endpoint }, schema) {
  const fullUrl = /^https?:\/\//.test(endpoint) ? endpoint : API_ROOT_MAP[appName] + endpoint;

  return fetch(fullUrl)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return { ...normalize(camelizedJson, schema) };
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened' })
    );
}
