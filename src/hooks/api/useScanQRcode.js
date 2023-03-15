import {useMutation, useQuery} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

// Scan QRcode
export const useScanBookingQRcode = () => {
  return useMutation({
    mutationFn: idArr => {
      let formData = new FormData();
      formData.append('_method', 'GET');
      idArr.forEach(item => {
        formData.append('bookingIds[]', item);
      });
      return httpRequest.postHttpRequest('booking/show', formData);
    },
  });
};

export const useScanConfirmBookingQRcode = () => {
  return useMutation({
    mutationFn: idArr => {
      let formData = new FormData();
      formData.append('_method', 'PATCH');
      idArr.forEach(item => {
        formData.append('bookingIds[]', item);
      });
      return httpRequest.postHttpRequest('booking/update', formData);
    },
  });
};
