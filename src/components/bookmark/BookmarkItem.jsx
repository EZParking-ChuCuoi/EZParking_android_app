import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {AVATAR} from '../../utils/defaultImage';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../../assets/styles/styles';
import EZText from '../core/EZText';
import {EZButtonText} from '../core/EZButton';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  useGetParkingLotInfo,
  useHandleSavedParkingLot,
} from '../../hooks/api/getParkingLots';
import {Link, useNavigation} from '@react-navigation/native';
import {getData} from '../../shared/asyncStorages';
import {androidNotification} from '../../shared/androidNotification';
import EZLoading from '../core/EZLoading';
const BookmarkItem = ({data, onRefresh}) => {
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const navigation = useNavigation();
  const mutationHandleRemove = useHandleSavedParkingLot();
  const mutationParkingLotInfo = useGetParkingLotInfo();
  const handleBookNow = async () => {
    const uid = await getData('EZUid');
    mutationParkingLotInfo.mutate({parkingId: data.parking_lot_id, uid});
  };
  const handleRemove = async () => {
    const uid = await getData('EZUid');
    mutationHandleRemove.mutate({
      userId: uid,
      parkingLotId: data.parking_lot_id,
    });
  };
  useEffect(() => {
    if (mutationHandleRemove.isSuccess) {
      androidNotification('Removed from saved list!');
      onRefresh();
    }
  }, [mutationHandleRemove.status]);
  useEffect(() => {
    if (mutationParkingLotInfo.isSuccess) {
      navigation.navigate('booking', {
        info: mutationParkingLotInfo.data[0],
      });
    }
  }, [mutationParkingLotInfo.status]);
  return (
    <View style={styles.bookmarkItem}>
      {mutationParkingLotInfo.isLoading && <EZLoading />}
      {data.count > 0 ? (
        <View
          style={[styles.left, {backgroundColor: BG2ND, shadowColor: COLOR}]}>
          <EZText color={COLORS.secondary} bold>
            Booked
          </EZText>
          <EZText color={COLORS.secondary} size="quiteLarge" bold>
            {data.count}
          </EZText>
          <EZText color={COLORS.secondary} bold>
            times before
          </EZText>
        </View>
      ) : (
        <EZButtonText
          text="Book now"
          handlePress={handleBookNow}
          color={COLORS.secondary}
          styleEZButtonText={{
            backgroundColor: BG2ND,
            borderRadius: 8,
            alignItems: 'center',
            padding: 10,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
          }}
        />
      )}
      <View style={styles.middle}>
        <Link
          to={{
            screen: 'spaceDetail',
            params: {parkingId: data.parking_lot_id},
          }}>
          <EZText bold color={COLORS.primary}>
            {data.nameParkingLot}
          </EZText>
        </Link>
        <EZText>{data.address}</EZText>
      </View>
      <TouchableOpacity style={styles.right} onPress={handleRemove}>
        <IconMaterial
          name="bookmark-minus-outline"
          size={FONTSIZE.iconHuge}
          color={COLORS.redLight}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkItem;

const styles = StyleSheet.create({
  bookmarkItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    overflow: 'hidden',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  left: {
    borderRadius: 8,
    alignItems: 'center',
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  middle: {
    alignItems: 'flex-start',
    width: '60%',
    paddingLeft: 10,
    paddingTop: 10,
  },
  right: {
    paddingTop: 10,
    justifyContent: 'flex-start',
  },
});
