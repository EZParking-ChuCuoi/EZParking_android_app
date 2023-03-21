import {useMutation} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

export const useCreateComment = () => {
  return useMutation({
    mutationFn: params => {
      //"userId": "1000000",
      // "parkingId": "1000000",
      // "content": "good",
      // "ranting": "2",
      return httpRequest.postHttpRequest('/comments', params);
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationFn: params => {
      let formData = new FormData();
      formData.append('_method', 'PATCH');
      formData.append('content', params.content);
      formData.append('ranting', params.ranting);
      return httpRequest.postHttpRequest(
        `comments/${params.id}/update`,
        formData,
      );
    },
  });
};
