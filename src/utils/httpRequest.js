import axios from 'axios';
import {API_URL} from '@env';

const httpRequest = axios.create({
  baseURL: API_URL,
});

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

export const patchHttpRequest = async (path, options = {}) => {
  const response = await httpRequest.patch(path, options);
  return response.data;
};

export default httpRequest;
