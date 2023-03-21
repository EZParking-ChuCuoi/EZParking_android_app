import {useMutation} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

export const useGetNotification = () => {
  return useMutation({
    mutationFn: id => {
      return httpRequest.getHttpRequest(`notifications/${id}`);
    },
  });
};
