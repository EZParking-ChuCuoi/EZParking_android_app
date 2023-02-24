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

export const useGetParkingLotInfo = () => {
  return useMutation({
    mutationFn: id => {
      return httpRequest.getHttpRequest(`parking-lot/${id}/info`);
    },
  });
};

export const useGetParkingLotComment = () => {
  return useMutation({
    mutationFn: id => {
      return httpRequest.getHttpRequest(`parking-lot/${id}/info/comment`);
    },
  });
};

const getAllParkingLot = async () => {
  const response = await httpRequest.getHttpRequest('parking-lot');
  return response;
};

export const UseGetAllParkingLot = () => {
  const {isLoading, data, isSuccess} = useQuery(['getAll'], getAllParkingLot);
  return {data, isLoading, isSuccess};
};

export const useGetSlots = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.getHttpRequest(`parking-lot/${params.id}/slots`, {
        params: {
          start_datetime: params.start_datetime,
          end_datetime: params.end_datetime,
        },
      });
    },
  });
};
