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

const ScanQRSuccess = ({data}) => {
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
      <EZText color={COLORS.primary} bold>
        Scan ticket success!
      </EZText>
      <View style={styles.content}>
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
          <EZText>{data.totalPayment}</EZText>
        </View>
        {data.bookings.map(item => {
          return (
            <View style={styles.slotItem} key={item.booking_id}>
              <View style={styles.flexRow}>
                <EZText bold color={COLORS.disable}>
                  Vehicle
                </EZText>
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
                )}-${item.licensePlate.slice(3, 6)}.${item.licensePlate.slice(
                  6,
                  8,
                )}`}</EZText>
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
        <View style={styles.flexRow}>
          <EZText bold color={COLORS.disable}>
            Booking date
          </EZText>
          <EZText>{data.bookings[0].bookDate}</EZText>
        </View>
        <View style={styles.flexRow}>
          <EZText bold color={COLORS.disable}>
            Total payment
          </EZText>
          <EZText>{handleCurrenCy(Math.round(data.totalPayment))}</EZText>
        </View>
      </View>
      <EZButtonText
        text="Done"
        styleEZButtonText={styles.btnDone}
        color={COLORS.white}
        handlePress={() =>
          navigation.navigate('bottomTab', {screen: 'homeStack'})
        }
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
    alignItems: 'center',
  },
  slotItem: {
    width: '100%',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderBrighter,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  license: {
    padding: 5,
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
