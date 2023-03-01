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

export const useUploadImage = () => {
  return useMutation({
    mutationFn: img => {
      let formData = new FormData();
      formData.append('image', {
        uri: img.path,
        name: img.path.substring(img.path.lastIndexOf('/') + 1),
        type: img.mime,
      });
      return httpRequest.postHttpRequest('parking-lot/upload', formData);
    },
  });
};
