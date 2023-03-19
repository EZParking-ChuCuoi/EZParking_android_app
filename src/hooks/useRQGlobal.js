import {QueryClient, useQuery} from '@tanstack/react-query';
import {clientQuery} from '../..';

const useRQGlobalState = (key, initialData) => [
  useQuery([key], () => initialData, {enabled: false, initialData}).data,
  value => {
    clientQuery.setQueriesData([key], value);
  },
];
export default useRQGlobalState;
