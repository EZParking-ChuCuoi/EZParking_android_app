import {
  Dimensions,
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
import Lottie from 'lottie-react-native';

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
        contentContainerStyle={{paddingVertical: 20, paddingBottom: 50}}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              mutationGetNotification.mutate(userInfo.id);
            }}
          />
        }
        ListEmptyComponent={
            notices.length === 0 && mutationGetNotification.isSuccess && (
              <View style={styles.empty}>
                <EZText bold size="quiteLarge" color={COLORS.secondary}>
                  Your notification is empty!
                </EZText>
                <Lottie
                  source={require('../../assets/images/notifications.json')}
                  autoPlay
                  loop
                  style={[styles.image]}
                />
              </View>
            )
          }
      />
    </EZContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({
  image: {
    position: 'relative',
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  empty: {
    width: '100%',
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
});
