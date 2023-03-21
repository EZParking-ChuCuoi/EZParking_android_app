import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {AVATAR} from '../../utils/defaultImage';
import {COLORS, SPACING} from '../../assets/styles/styles';
import useRQGlobalState from '../../hooks/useRQGlobal';
import NotificationItem from './NotificationItem';
import {useGetNotification} from '../../hooks/api/useNotification';
import EZLoading from '../../components/core/EZLoading';

const Notification = () => {
  const [notices, setNotices] = useRQGlobalState('notice', []);
  const [userInfo] = useRQGlobalState('user', {});
  const mutationGetNotification = useGetNotification();
  useEffect(() => {
    mutationGetNotification.mutate(userInfo.id);
  }, []);
  useEffect(() => {
    if (mutationGetNotification.isSuccess) {
      setNotices(mutationGetNotification.data);
    }
  }, [mutationGetNotification.status]);
  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      {mutationGetNotification.isLoading && <EZLoading />}
      <FlatList
        data={notices}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <NotificationItem data={item} />}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              mutationGetNotification.mutate(userInfo.id);
            }}
          />
        }
      />
    </EZContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({});
