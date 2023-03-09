import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../core/EZContainer';
import EZText from '../../core/EZText';
import {
  bgSecondaryDefault,
  COLORS,
  SPACING,
} from '../../../assets/styles/styles';
import {useGetBookingDetailHistory} from '../../../hooks/api/getBookingParkingLot';
import {handleCurrenCy} from '../../../shared/handleCurrenCy';

const BookingHistoryInfo = ({bookings}) => {
  const {BG2ND} = bgSecondaryDefault();
  const mutationBookingDetails = useGetBookingDetailHistory();
  const [bookingInfo, setBookingInfo] = useState([]);
  useEffect(() => {
    mutationBookingDetails.mutate(bookings);
  }, []);
  useEffect(() => {
    if (mutationBookingDetails.isSuccess) {
      setBookingInfo(mutationBookingDetails.data.data.bookings);
    }
  }, [mutationBookingDetails.status]);
  const renderItem = ({item}) => {
    return (
      <View style={[styles.container, {backgroundColor: BG2ND}]}>
        {mutationBookingDetails.isSuccess && (
          <>
            <View style={styles.left}>
              <EZText>
                Vehicle type:{' '}
                {item.carType === '4-16SLOT' ? '4 -16 seats' : '16 - 34 seats'}
              </EZText>
              <EZText>
                Slot name: {item.nameBlock}/{item.slotName}
              </EZText>
              <View style={styles.licenseGroup}>
                <EZText>License plate: </EZText>
                <View style={styles.license}>
                  <EZText transform="uppercase">{`${item.licensePlate.slice(
                    0,
                    3,
                  )}-${item.licensePlate.slice(3, 6)}.${item.licensePlate.slice(
                    6,
                    8,
                  )}`}</EZText>
                </View>
              </View>
            </View>
            <View style={styles.right}>
              <EZText color={COLORS.secondary}>
                {handleCurrenCy(item.payment)}
              </EZText>
            </View>
          </>
        )}
      </View>
    );
  };
  return (
    <EZContainer
      styleEZContainer={{
        paddingHorizontal: SPACING.pxComponent,
        paddingVertical: 20,
      }}>
      <FlatList
        data={bookingInfo}
        renderItem={renderItem}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
      />
    </EZContainer>
  );
};

export default BookingHistoryInfo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 15,
    borderRadius: 10,
    marginBottom: 15,
    position: 'relative',
  },
  right: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  licenseGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  license: {
    padding: 10,
    backgroundColor: COLORS.circleOverlay,
    borderRadius: 5,
  },
});
