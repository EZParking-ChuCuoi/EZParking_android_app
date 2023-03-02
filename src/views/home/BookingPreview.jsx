import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {
  useBookingNow,
  useBookingPreview,
} from '../../hooks/api/getBookingParkingLot';
import EZInput from '../../components/core/EZInput';
import {COLORS, SPACING} from '../../assets/styles/styles';
import {EZButton} from '../../components/core/EZButton';
import EZLoading from '../../components/core/EZLoading';
import {getData} from '../../shared/asyncStorages';

const BookingPreview = ({navigation, route}) => {
  const {dateStart, dateReturn, idSlotArr} = route.params;
  const mutationBookingPreview = useBookingPreview();
  const mutationBookingNow = useBookingNow();
  const [errMessage, setErrMessage] = useState('');
  const [uid, setUid] = useState('');
  const [licensePlate, setLicensePlate] = useState(new Array(idSlotArr.length));
  useEffect(() => {
    const inital = async () => {
      mutationBookingPreview.mutate({
        ids: idSlotArr,
        start_datetime: dateStart,
        end_datetime: dateReturn,
      });
      const uid = await getData('EZUid');
      setUid(uid);
    };
    inital();
  }, []);
  useEffect(() => {
    if (mutationBookingNow.isSuccess) {
      navigation.navigate('bookingTicket', {
        userId: uid,
        startDateTime: dateStart,
      });
    }
  }, [mutationBookingNow.status]);
  const handleBooking = async () => {
    let check = false;
    [...Array(licensePlate.length)].forEach((val, index) => {
      if (licensePlate[index] !== undefined) {
        if (licensePlate[index].length === 8) {
          check = true;
        }
      } else {
        check = false;
        setErrMessage('Please fill in all license plates!');
        return;
      }
    });
    if (check) {
      mutationBookingNow.mutate({
        licensePlate: licensePlate,
        slot_ids: idSlotArr,
        user_id: uid,
        start_datetime: dateStart,
        end_datetime: dateReturn,
      });
    } else {
      setErrMessage('Please enter all valid license plates!');
    }
  };
  const handleChange = (license, index) => {
    let arrTemp = licensePlate;
    arrTemp[index] = license;
    setLicensePlate(arrTemp);
  };
  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      {mutationBookingNow.isLoading && <EZLoading />}
      {mutationBookingPreview.isLoading && <EZLoading />}
      <View style={[styles.rowTop, styles.row]}>
        <EZText bold color={COLORS.primary}>
          Enter license plate
        </EZText>
        <EZText bold color={COLORS.primary}>
          Vehicle type
        </EZText>
        <EZText bold color={COLORS.primary}>
          Block name
        </EZText>
        <EZText bold color={COLORS.primary}>
          Price
        </EZText>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listItem}>
        {mutationBookingPreview.isSuccess &&
          mutationBookingPreview.data.slots.map((item, index) => (
            <View style={styles.row} key={index}>
              <EZInput
                placeholder="License plate"
                styleEZInput={{width: '30%'}}
                defaultValue={licensePlate[index]}
                onChangeText={license => handleChange(license, index)}
                styleEZInputField={{textTransform: 'uppercase'}}
              />
              <EZText size="small">{item.carType}</EZText>
              <EZText size="small">{item.blockName}</EZText>
              <EZText size="small">{item.price}</EZText>
            </View>
          ))}
        <View style={styles.row}>
          <EZText bold color={COLORS.primary}>
            Quantity : {idSlotArr.length}
          </EZText>
          <EZText bold color={COLORS.primary}>
            Total price: {mutationBookingPreview.data?.total}
          </EZText>
        </View>
        {errMessage !== '' && (
          <EZText styleEZText={{marginTop: 10}} color={COLORS.redLight}>
            {errMessage}
          </EZText>
        )}
        <EZButton
          styleEZButton={{marginVertical: 15}}
          title="Booking"
          handlePress={handleBooking}
          w="50%"
        />
      </ScrollView>
    </EZContainer>
  );
};

export default BookingPreview;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 15,
    paddingTop: 10,
    borderBottomColor: COLORS.borderBrighter,
    borderBottomWidth: 1,
  },
  listItem: {
    alignItems: 'center',
  },
});
