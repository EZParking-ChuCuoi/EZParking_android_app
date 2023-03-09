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

export const useGetBookingHistory = () => {
  return useMutation({
    mutationFn: userId => {
      return httpRequest.getHttpRequest(`booking/${userId}/history`);
    },
  });
};

export const useGetBookingDetailHistory = () => {
  return useMutation({
    mutationFn: bookingIds => {
      let formData = new FormData();
      formData.append('_method', 'GET');
      bookingIds.forEach(item => {
        formData.append('bookingIds[]', item);
      });
      return httpRequest.postHttpRequest('booking/history/details', formData);
    },
  });
};
