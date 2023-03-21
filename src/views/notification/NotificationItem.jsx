import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {AVATAR} from '../../utils/defaultImage';
import {COLORS} from '../../assets/styles/styles';
import EZText from '../../components/core/EZText';
import {formatRelativeTime} from '../../shared/handleDate';
import useRQGlobalState from '../../hooks/useRQGlobal';
import {useNavigation} from '@react-navigation/native';
import {EZButton, EZButtonText} from '../../components/core/EZButton';
import {openGoogleMapsApp} from '../../shared/map';
const NotificationItem = ({data}) => {
  const [userInfo] = useRQGlobalState('user', {});
  const [notices, setNotices] = useRQGlobalState('notice', []);
  const navigation = useNavigation();
  const handlePress = () => {
    if (data.type === 'QRCode' && data.title === 'Completed parking lot') {
      navigation.navigate('notiBookingSuccess', {
        data: data.data,
        id: data.id,
      });
    }
  };
  const handleOpenMap = () => {
    openGoogleMapsApp(
      data.data.inFoParking.address_latitude,
      data.data.inFoParking.address_longitude,
    );
  };
  useEffect(() => {}, []);
  return (
    <TouchableOpacity
      style={styles.noticeItem}
      onPress={handlePress}
      disabled={
        data.type === 'booking' &&
        data.title === 'New booking' &&
        data.nameUserSend === userInfo.fullName
          ? true
          : false
      }>
      {data.read === 0 && <View style={styles.new} />}
      <Image source={{uri: data.image}} style={styles.avatar} />
      <View style={styles.noticRight}>
        <EZText lines={3} styleEZText={styles.noticRightTop}>
          <EZText bold color={COLORS.primary}>
            {data.nameUserSend !== userInfo.fullName &&
            !data.message.includes('have completely finished')
              ? data.nameUserSend
              : null}
          </EZText>
          <EZText>
            {data.nameUserSend === userInfo.fullName && 'You'}
            {data.message.includes('have completely finished') && 'You'}
            {` ${data.message}`}
          </EZText>
        </EZText>
        {data.type === 'booking' &&
        data.title === 'New booking' &&
        data.nameUserSend === userInfo.fullName ? (
          <EZButtonText
            text={`Direct to ${data.data.inFoParking.nameParkingLot}`}
            color={COLORS.secondary}
            handlePress={handleOpenMap}
          />
        ) : null}
        <EZText size="small" color={COLORS.disable}>
          {formatRelativeTime(data.created_at)}
        </EZText>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationItem;

const styles = StyleSheet.create({
  noticeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomColor: COLORS.borderBrighter,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  avatar: {
    width: Dimensions.get('screen').width * 0.15,
    height: Dimensions.get('screen').width * 0.15,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  new: {
    width: 8,
    height: 8,
    borderRadius: 6,
    backgroundColor: COLORS.redLight,
  },
  noticRightTop: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    gap: 6,
  },
  noticRight: {
    width: '80%',
    justifyContent: 'space-between',
  },
});
