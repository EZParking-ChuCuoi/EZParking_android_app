import {useMutation, useQuery} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

export const useGetNearlyParkingLot = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.getHttpRequest('parking-lot/location', {
        params,
      });
    },
  });
};
