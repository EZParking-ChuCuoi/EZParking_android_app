import axios from 'axios';
import {BASE_API_URL} from '@env';
import {getData} from '../shared/asyncStorages';

const httpRequest = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'X-Custom-Header': 'foobar',
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

httpRequest.interceptors.request.use(
  async config => {
    const accessToken = await getData('EZToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
export const getHttpRequest = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const postHttpRequest = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  return response.data;
};

export const deleteHttpRequest = async path => {
  const response = await httpRequest.delete(path);
  return response.data;
};

export const putHttpRequest = async (path, options = {}) => {
  const response = await httpRequest.put(path, options);
  return response.data;
};

export const patchHttpRequest = async (path, options = {}) => {
  const response = await httpRequest.patch(path, options);
  return response.data;
};

export default httpRequest;
