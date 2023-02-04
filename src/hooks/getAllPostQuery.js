import {useQuery} from '@tanstack/react-query';
import axios from 'axios';

const postApiUrl = 'https://jsonplaceholder.typicode.com/posts';
const getAllPost = async () => {
  const response = await axios.get(postApiUrl);
  return response.data;
};

export const UseGetAllPost = () => {
  const {isLoading, data} = useQuery(['posts'], getAllPost);
  return {data, isLoading};
};