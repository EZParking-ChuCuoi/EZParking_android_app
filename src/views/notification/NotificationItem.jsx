import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {AVATAR} from '../../utils/defaultImage';
import {COLORS} from '../../assets/styles/styles';
import EZText from '../../components/core/EZText';
import { formatRelativeTime } from '../../shared/handleDate';

const NotificationItem = ({data}) => {
  console.log(data);
  const handlePress = ()=>{
    if(data.type==='QRCode' && data.title==='Completed parking lot'){

    }
  }
  return (
    <TouchableOpacity style={styles.noticeItem} onPress={handlePress}>
      <View style={styles.new} />
      <Image source={{uri: data.image}} style={styles.avatar} />
      <View style={styles.noticRight}>
        <EZText lines={3} styleEZText={styles.noticRightTop}>
          <EZText bold color={COLORS.primary}>
          {data.type==='QRCode' && data.title==='Completed parking lot' && 'You'}
          {data.type==='booking' && data.title==='New booking' && 'Someone'}
          {data.type==='wishlist' && data.title==='New Wishlist' && 'Someone'}
            {' '}
          </EZText>
          <EZText>
            {data.type==='booking' && data.title==='New booking' && 'Has booked your parking lot'}
            {data.type==='QRCode' && data.title==='Completed parking lot' && `completed your booking at ${data.type}`}
            {data.type==='wishlist' && data.title==='New Wishlist' && 'added your parking lot to their wishlist'}
          </EZText>
        </EZText>
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
    width: 50,
    height: 50,
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
