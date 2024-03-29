import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {getData} from '../../shared/asyncStorages';
import * as httpRequest from '../../utils/httpRequest';

export const useLogin = () => {
  return useMutation({
    mutationFn: params => {
      return httpRequest.postHttpRequest('auth/login', params);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: newUser => {
      return httpRequest.postHttpRequest('account/register', newUser);
    },
  });
};

export const useSendOTP = () => {
  return useMutation({
    mutationFn: newUser => {
      return httpRequest.postHttpRequest(
        'account/confirm-registration',
        newUser,
      );
    },
  });
};

export const useGetUserInfo = () => {
  return useMutation({
    mutationFn: uid => {
      return httpRequest.getHttpRequest(`user/${uid}/info`);
    },
    mutationKey: 'userInfo',
  });
};

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: params => {
      let formData = new FormData();
      formData.append('fullName', params.fullName);
      formData.append('_method', 'PUT');
      if (params.avatar !== null) {
        formData.append('avatar', {
          uri: params.avatar.path,
          name: params.avatar.path.substring(
            params.avatar.path.lastIndexOf('/') + 1,
          ),
          type: params.avatar.mime,
        });
      }
      return httpRequest.postHttpRequest(
        `user/update/${params.userId}`,
        formData,
      );
    },
  });
};

export const isSpaceOwner = async () => {
  const uid = await getData('EZUid');
  const res = await httpRequest.getHttpRequest(`user/${uid}/role`);
  if (res.role === 'user') {
    return false;
  } else {
    return true;
  }
};

export const useRegisterSpaceOwner = () => {
  return useMutation({
    mutationFn: params => {
      let formData = new FormData();
      formData.append('phone', params.phone);
      formData.append('businessScale', params.businessScale);
      formData.append('_method', 'PUT');
      formData.append('imageCardIdBef', {
        uri: params.imageCardIdBef.path,
        name: params.imageCardIdBef.path.substring(
          params.imageCardIdBef.path.lastIndexOf('/') + 1,
        ),
        type: params.imageCardIdBef.mime,
      });
      formData.append('imageCardIdAft', {
        uri: params.imageCardIdAft.path,
        name: params.imageCardIdAft.path.substring(
          params.imageCardIdAft.path.lastIndexOf('/') + 1,
        ),
        type: params.imageCardIdAft.mime,
      });
      return httpRequest.postHttpRequest(`owner/create/${params.id}`, formData);
    },
  });
};

