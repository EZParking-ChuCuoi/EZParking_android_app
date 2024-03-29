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
import {handleCurrenCy} from '../../shared/handleCurrenCy';
import useRQGlobalState from '../../hooks/useRQGlobal';
import {validateLicensePlate} from '../../shared/handleValidate';

const BookingPreview = ({navigation, route}) => {
  const {dateStart, dateReturn, idSlotArr} = route.params;
  const mutationBookingPreview = useBookingPreview();
  const mutationBookingNow = useBookingNow();
  const [errMessage, setErrMessage] = useState('');
  const [userInfo] = useRQGlobalState('user', {});
  const [licensePlate, setLicensePlate] = useState(new Array(idSlotArr.length));
  useEffect(() => {
    const inital = async () => {
      mutationBookingPreview.mutate({
        ids: idSlotArr,
        start_datetime: dateStart,
        end_datetime: dateReturn,
      });
    };
    inital();
  }, []);

  useEffect(() => {
    if (mutationBookingNow.isSuccess) {
      navigation.navigate('bookingTicket', {
        spaceOwnerId: mutationBookingNow.data.data.idSpaceOwner,
        idBookings: mutationBookingNow.data.data.idBookings,
      });
    }
  }, [mutationBookingNow.status]);
  const validate = () => {
    let check = true;
    [...Array(licensePlate.length)].forEach((val, index) => {
      if (licensePlate[index] !== undefined) {
        if (licensePlate[index].length > 7 || licensePlate[index].length < 9) {
          if (licensePlate[index] === licensePlate[index - 1]) {
            check = false;
            setErrMessage('License plates must be unique!');
            return;
          } else if (!validateLicensePlate(licensePlate[index])) {
            check = false;
            setErrMessage('Invalid license plates format [Ex: 43A12345]');
            return;
          }
        } else {
          check = false;
          setErrMessage('License plates must be 8 or 9 characters!');
          return;
        }
      } else {
        check = false;
        setErrMessage('Please fill in all license plates!');
        return;
      }
    });
    return check;
  };
  const handleBooking = async () => {
    if (validate()) {
      mutationBookingNow.mutate({
        licensePlate: licensePlate,
        slot_ids: idSlotArr,
        user_id: userInfo.id,
        start_datetime: dateStart,
        end_datetime: dateReturn,
      });
    }
  };
  const handleChange = (license, index) => {
    let arrTemp = licensePlate;
    arrTemp[index] = license.toUpperCase();
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
          mutationBookingPreview?.data?.slots?.map((item, index) => (
            <View style={styles.row} key={index}>
              <EZInput
                placeholder="Car's plate"
                styleEZInput={{width: '30%'}}
                defaultValue={licensePlate[index]}
                onChangeText={license => handleChange(license, index)}
                styleEZInputField={{
                  textTransform: 'uppercase',
                  paddingRight: 10,
                }}
              />
              <EZText size="small">
                {item.carType === '4-16SLOT' ? '4-16 seats' : '16-34 seats'}
              </EZText>
              <EZText size="small">{item.blockName}</EZText>
              <EZText size="small">{item.price}</EZText>
            </View>
          ))}
        <View style={styles.row}>
          <EZText bold color={COLORS.primary}>
            Quantity : {idSlotArr.length}
          </EZText>
          <EZText bold color={COLORS.secondary}>
            Total price:{' '}
            {handleCurrenCy(Math.round(mutationBookingPreview.data?.total))}
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
