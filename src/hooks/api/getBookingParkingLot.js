import {useMutation} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

export const useBookingPreview = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.getHttpRequest('booking/slots', {
        params,
      });
    },
  });
};

export const useBookingNow = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.postHttpRequest('booking', params);
    },
  });
};