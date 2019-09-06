import axios from 'axios';
import {API_PUBLIC_KEY, API_PRIVATE_KEY, API_VERSION, API_PREFIX, API_URL} from '../config/api.config';
import md5 from 'crypto-js/md5'

const ts = new Date().getTime();
const hash = md5(`${ts}${API_PRIVATE_KEY}${API_PUBLIC_KEY}`).toString();
const baseURL = API_URL + API_VERSION + API_PREFIX;
const defaultParams = {
  apikey: API_PUBLIC_KEY,
  ts,
  hash
};

export default class {
  static get(uri, params = {}) {
    return axios.get(`${baseURL}${uri}`, {
      params: {
        ...defaultParams,
        ...params,
      },
    });
  }
}