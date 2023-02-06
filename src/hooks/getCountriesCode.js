import {useQuery} from '@tanstack/react-query';
import {API_COUNTRY_CODE} from '@env';
import * as httpRequest from '../utils/httpRequest';

const getCountriesCode = async () => {
  const response = await httpRequest.getHttpRequest(`${API_COUNTRY_CODE}countriesCode`);
  return response;
};

export const UseGetCountriesCode = () => {
  const {isLoading, data} = useQuery(['countryCode'], getCountriesCode);
  return {data, isLoading};
};
