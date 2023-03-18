import {useMutation, useQuery} from '@tanstack/react-query';
import * as httpRequest from '../../utils/httpRequest';

// Dashboard API
export const useGetUsersParkingLot = () => {
  return useMutation({
    mutationFn: userId => {
      return httpRequest.getHttpRequest(`dashboard/parkingLots/${userId}`);
    },
  });
};

export const useGetPeriodManagingRevenueParkingLot = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.getHttpRequest(
        `dashboard/${params.userId}/revenue/${params.period}`,
      );
    },
  });
};

export const useGetPeriodRevenueByParkingLots = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.getHttpRequest(
        `dashboard/parkingLots/${params.id}/${params.period}`,
      );
    },
  });
};

// Parkinglot API
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

export const useEditParkingLot = () => {
  return useMutation({
    mutationFn: params => {
      let formData = new FormData();
      formData.append('nameParkingLot', params.name);
      formData.append('desc', params.desc);
      formData.append('address', params.address);
      formData.append('address_latitude', params.lat);
      formData.append('address_longitude', params.lng);
      formData.append('openTime', params.open);
      formData.append('endTime', params.close);
      formData.append('_method', 'PUT');
      if (params.imagesUpdate.length !== 0) {
        params.imagesUpdate.forEach(img => {
          formData.append('images[]', {
            uri: img.path,
            name: img.path.substring(img.path.lastIndexOf('/') + 1),
            type: img.mime,
          });
        });
      }
      return httpRequest.postHttpRequest(
        `parking-lot/update/${params.idParkingLot}`,
        formData,
      );
    },
  });
};

export const useDeleteParkingLot = () => {
  return useMutation({
    mutationFn: idParkingLot => {
      return httpRequest.deleteHttpRequest(
        `parking-lot/delete/${idParkingLot}`,
      );
    },
  });
};

// Block API
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

export const useGetBlockInfo = () => {
  return useMutation({
    mutationFn: idBlock => {
      return httpRequest.getHttpRequest(`parking-lot/block/${idBlock}`);
    },
  });
};

export const useEditBlockInfo = () => {
  return useMutation({
    mutationFn: params => {
      let formData = new FormData();
      formData.append('nameBlock', params.data.nameBlock);
      formData.append('price', params.data.price);
      formData.append('desc', params.data.desc);
      formData.append('carType', params.data.carType);
      formData.append('_method', 'PUT');
      return httpRequest.postHttpRequest(
        `/parking-lot/block/${params.idBlock}/update`,
        formData,
      );
    },
  });
};

export const useDeleteBlock = () => {
  return useMutation({
    mutationFn: idBlock => {
      return httpRequest.deleteHttpRequest(
        `parking-lot/block/${idBlock}/delete`,
      );
    },
  });
};

// Slot API
export const useGetSlotsOfBlock = () => {
  return useMutation({
    mutationFn: idBlock => {
      return httpRequest.getHttpRequest(`parking-lot/block/${idBlock}/slots`);
    },
  });
};

export const useGetSlotDetail = () => {
  return useMutation({
    mutationFn: idSlot => {
      return httpRequest.getHttpRequest(`parking-lot/block/slots/${idSlot}`);
    },
  });
};

export const useCreateSlot = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.postHttpRequest(
        'parking-lot/block/slots/create',
        params,
      );
    },
  });
};

export const useDeleteSlot = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.postHttpRequest('parking-lot/block/slots/delete', {
        ids: params.idSlotArr,
      });
    },
  });
};

export const useEditSlot = () => {
  return useMutation({
    mutationFn: params => {
      let formData = new FormData();
      formData.append('slotName', params.slotName);
      formData.append('_method', 'PUT');
      return httpRequest.postHttpRequest(
        `parking-lot/block/slots/update/${params.idSlot}`,
        formData,
      );
    },
  });
};
