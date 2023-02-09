import {useQuery} from '@tanstack/react-query';
import {API_COUNTRY_CODE} from '@env';
import * as httpRequest from '../utils/httpRequest';
import axios from 'axios';

const getCountriesCode = async () => {
  const response = await axios.get(`${API_COUNTRY_CODE}countriesCode`);
  return response.data;
};

export const UseGetCountriesCode = () => {
  const {isLoading, data} = useQuery(['countryCode'], getCountriesCode);
  return {data, isLoading};
};
