import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../core/EZContainer';
import EZText from '../../core/EZText';
import {
  bgDefault,
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  SPACING,
} from '../../../assets/styles/styles';
import {useGetBookingDetailHistory} from '../../../hooks/api/getBookingParkingLot';
import {handleCurrenCy} from '../../../shared/handleCurrenCy';
import {EZButtonText} from '../../core/EZButton';
import QRCode from 'react-native-qrcode-svg';
import {getData} from '../../../shared/asyncStorages';
import EZLoading from '../../core/EZLoading';

const BookingHistoryInfo = ({bookings, idSpaceOwner}) => {
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  const {BG2ND} = bgSecondaryDefault();
  const mutationBookingDetails = useGetBookingDetailHistory();
  const [bookingInfo, setBookingInfo] = useState([]);
  const [display, setDisplay] = useState(false);
  let valueQrCode = `${idSpaceOwner}`;
  useEffect(() => {
    mutationBookingDetails.mutate(bookings);
  }, []);
  useEffect(() => {
    if (mutationBookingDetails.isSuccess) {
      setBookingInfo(mutationBookingDetails.data.data.bookings);
    }
  }, [mutationBookingDetails.status]);
  const BookingInfoItem = ({item}) => {
    return (
      <View style={[styles.container, {backgroundColor: BG2ND}]}>
        {mutationBookingDetails.isLoading && <EZLoading text=" " />}
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
  const handleRegenerate = async () => {
    if (bookingInfo.length > 0) {
      bookings.forEach(item => {
        valueQrCode = valueQrCode.concat('|', item);
      });
    }
    console.log(valueQrCode)
    setDisplay(true);
  };
  return (
    <EZContainer
      styleEZContainer={{
        paddingHorizontal: SPACING.pxComponent,
        paddingVertical: 20,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <EZButtonText
          text="Regenerate QR code"
          color={COLORS.primary}
          handlePress={handleRegenerate}
        />
        {display && (
          <View style={styles.ticket}>
            <QRCode
              value={valueQrCode}
              logo={require('../../../assets/images/logo.png')}
              logoSize={30}
              logoBackgroundColor="transparent"
              size={150}
              color={COLOR}
              backgroundColor={BG}
            />
          </View>
        )}
        {bookingInfo.map(item => {
          return <BookingInfoItem item={item} key={item.booking_id} />;
        })}
      </ScrollView>
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
  ticket: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: 180,
  },
});
