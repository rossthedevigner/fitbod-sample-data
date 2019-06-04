import ky from 'ky';

import { API_LOCAL_STORAGE_KEY, API_URL, GET_USERS } from './constants';

async function api(endpoint, { body, ...config } = {}) {
  const token = window.localStorage.getItem(API_LOCAL_STORAGE_KEY);
  const headers = {
    ...config.headers,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true
  };

  headers.Authorization = `Basic ${token}`;

  let kyConfig = {
    prefixUrl: API_URL,
    method: 'GET',
    ...config,
    headers
  };

  return await ky(endpoint, { ...kyConfig }).json();
}

export { api };
