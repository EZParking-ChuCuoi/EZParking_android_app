import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {API_URL} from '@env';
import * as httpRequest from '../utils/httpRequest';

const getAllPost = async () => {
  const response = await httpRequest.getHttpRequest(`${API_URL}posts`);
  return response;
};

export const UseGetAllPost = () => {
  const {isLoading, data} = useQuery(['posts'], getAllPost);
  return {data, isLoading};
};