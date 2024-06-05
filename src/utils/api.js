import axios from 'axios';
import { BASE_API_URL } from '../config/constant';

export const auth_token = '';

/**
 * @function yukAPI
 * @descriptoion axios request setting module function
 * @param {*the address the request will be sent to} url
 * @param {*request data} data
 * @param {*the way to request} method
 * @param {*user info token} token
 * @param {* request waiting time} timeout
 * @returns
 */
export const yukAPI = (url, data, method, token = '') => {
  return axios({
    method: method,
    url: BASE_API_URL + url,
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token
    },
    responseType: 'json'
  });
};

/**
 * @function goRedirect
 * @descriptoion Switch to another page
 * @param {*the address the request will be sent to} url
 * @returns
 */
export const goRedirect = (url) => {
  setTimeout(() => {
    window.location.href = url;
  }, 500);
};
