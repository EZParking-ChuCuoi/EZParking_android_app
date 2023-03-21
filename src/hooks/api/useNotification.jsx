import {useMutation} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

export const useGetNotification = () => {
  return useMutation({
    mutationFn: id => {
      return httpRequest.getHttpRequest(`notifications/${id}`);
    },
  });
};

export const useMakeRead = () => {
  return useMutation({
    mutationFn: id => {
      let formData = new FormData();
      formData.append('_method', 'PATCH');
      return httpRequest.postHttpRequest(
        `notifications/${id}/read`,
        formData,
      );
    },
  });
};
