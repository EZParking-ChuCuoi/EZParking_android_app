import { AVATAR } from '../utils/defaultImage';

const {useEffect, useState} = require('react');
const {getData} = require('../shared/asyncStorages');
const {useGetUserInfo} = require('./api/auth');

export const useGetUserInfoApp = () => {
  const mutationGet = useGetUserInfo();
  const [userInfo, setUserInfo] = useState({
    avatar: AVATAR,
    email: '',
    fullName: '',
    id: '',
  });
  const onRefresh = async () => {
    console.log('firstCCC')
    const EZUid = await getData('EZUid');
    mutationGet.mutate(EZUid);
  };
  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (mutationGet.isSuccess) {
      setUserInfo(mutationGet.data.data[0]);
    }
  }, [mutationGet.status]);

  return {userInfo, onRefresh, mutationGet};
};
