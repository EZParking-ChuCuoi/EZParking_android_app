import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZText from '../core/EZText';
import {
  bgDefault,
  bgSecondaryDefault,
  colorDefault,
  COLORS,
} from '../../assets/styles/styles';
import Lottie from 'lottie-react-native';
import {handleCurrenCy} from '../../shared/handleCurrenCy';
import {EZButtonText} from '../core/EZButton';
import {useNavigation} from '@react-navigation/native';
import {dateFormatMomentWithoutSecond} from '../../shared/handleDate';

const ScanQRSuccess = ({data, refInfo}) => {
  console.log(data?.updatedBookings?.bookDate);
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const navigation = useNavigation();
  return (
    <>
      <Lottie
        source={require('../../assets/images/tick.json')}
        autoPlay
        loop
        style={styles.imageTicket}
        speed={1}
      />
      <EZText size="quiteLarge" color={COLORS.primary} bold>
      {data?.updatedBookings ? 'Completely finished!' : 'Scan ticket successfully!'}
      </EZText>
      {data?.updatedBookings && (
        <View style={styles.content}>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Client name
            </EZText>
            <EZText bold>{data?.updatedBookings?.userName}</EZText>
          </View>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Booking date
            </EZText>
            <EZText bold>
              {dateFormatMomentWithoutSecond(data?.updatedBookings?.bookDate)}
            </EZText>
          </View>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Total payment
            </EZText>
            <EZText bold color={COLORS.redLight}>
              {handleCurrenCy(Math.round(data?.updatedBookings?.totalPrice))}
            </EZText>
          </View>
        </View>
      )}
      {data?.bookings && (
        <View style={styles.content}>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Client name
            </EZText>
            <EZText bold>{data.bookings[0].fullName}</EZText>
          </View>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Parking name
            </EZText>
            <EZText>{data.bookings[0].parking_lot_name}</EZText>
          </View>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Address
            </EZText>
            <EZText styleEZText={{width: '80%'}} textAlign="right" lines={3}>
              {data.bookings[0].address}
            </EZText>
          </View>
          <EZText color={COLORS.primary} bold>
            {data.bookings.length} slots booked
          </EZText>
          <View style={styles.slots}>
            {data.bookings.map(item => {
              return (
                <View style={styles.slotItem} key={item.booking_id}>
                  <View style={styles.flexRow}>
                    <EZText bold color={COLORS.disable}>
                      Vehicle
                    </EZText>
                    <EZText>
                      <EZText>
                        {item.carType === '4-16SLOT'
                          ? '4-16 seats vehicle - '
                          : '16-34 seats vehicle - '}
                      </EZText>
                      <EZText
                        styleEZText={styles.license}
                        transform="uppercase">{`${item.licensePlate.slice(
                        0,
                        3,
                      )}-${item.licensePlate.slice(
                        3,
                        6,
                      )}.${item.licensePlate.slice(6, 8)}`}</EZText>
                    </EZText>
                  </View>
                  <View style={styles.flexRow}>
                    <EZText bold color={COLORS.disable}>
                      Slot name
                    </EZText>
                    <EZText>{`${item.nameBlock}/${item.slotName}`}</EZText>
                  </View>
                </View>
              );
            })}
          </View>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Start time
            </EZText>
            <EZText color={COLORS.secondary}>
              {dateFormatMomentWithoutSecond(data.bookings[0].bookDate)}
            </EZText>
          </View>
          <View style={styles.flexRow}>
            <EZText bold color={COLORS.disable}>
              Total payment
            </EZText>
            <EZText>{handleCurrenCy(Math.round(data.totalPayment))}</EZText>
          </View>
        </View>
      )}
      <EZButtonText
        text="Done"
        styleEZButtonText={styles.btnDone}
        color={COLORS.white}
        handlePress={() => {
          refInfo.current.close();
          navigation.navigate('bottomTab', {screen: 'homeStack'});
        }}
      />
    </>
  );
};

export default ScanQRSuccess;

const styles = StyleSheet.create({
  content: {
    width: '100%',
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 15,
    gap: 10,
  },
  imageTicket: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  slots: {
    alignItems: 'flex-end',
    width: '100%',
  },
  slotItem: {
    width: '95%',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderInput,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  license: {
    backgroundColor: COLORS.circleOverlay,
    borderRadius: 5,
  },
  btnDone: {
    backgroundColor: COLORS.tertiary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
});
