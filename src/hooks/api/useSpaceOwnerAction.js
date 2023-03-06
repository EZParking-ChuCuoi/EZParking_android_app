import {useMutation, useQuery} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

export const useCreateParkingLot = () => {
  return useMutation({
    mutationFn: params => {
      let formData = new FormData();
      formData.append('userId', params.uid);
      formData.append('nameParkingLot', params.name);
      formData.append('desc', params.desc);
      formData.append('address', params.address);
      formData.append('address_latitude', params.lat);
      formData.append('address_longitude', params.lng);
      formData.append('openTime', params.open);
      formData.append('endTime', params.close);
      params.images.forEach(img => {
        formData.append('images[]', {
          uri: img.path,
          name: img.path.substring(img.path.lastIndexOf('/') + 1),
          type: img.mime,
        });
      });
      return httpRequest.postHttpRequest('parking-lot/create/', formData);
    },
  });
};

export const useGetUsersParkingLot = () => {
  return useMutation({
    mutationFn: userId => {
      return httpRequest.getHttpRequest(`dashboard/parkingLots/${userId}`);
    },
  });
};

export const useCreateBlock = () => {
  return useMutation({
    mutationFn: newBlock => {
      return httpRequest.postHttpRequest('parking-lot/block/create', newBlock);
    },
  });
};

export const useGetBlock = () => {
  return useMutation({
    mutationFn: idParking => {
      return httpRequest.getHttpRequest(`parking-lot/${idParking}/blocks`);
    },
  });
};
