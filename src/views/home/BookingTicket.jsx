import {
  Image,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import QRCode from 'react-native-qrcode-svg';
import {
  bgDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../../assets/styles/styles';
import IconIon from 'react-native-vector-icons/Ionicons';
import ViewShot, {captureScreen} from 'react-native-view-shot';
import {EZButton} from '../../components/core/EZButton';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {LocalNotification} from '../../shared/LocalPushController';
import {androidNotification} from '../../shared/androidNotification';
import {hasStorePermission} from '../../shared/androidPermission';
import {useGetBookingHistory} from '../../hooks/api/getBookingParkingLot';
import useRQGlobalState from '../../hooks/useRQGlobal';

const BookingTicket = ({navigation, route}) => {
  const {spaceOwnerId, idBookings} = route.params;
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  const refViewShot = useRef();
  const mutationBookingHistory = useGetBookingHistory();
  const [histories, setHistories] = useRQGlobalState('history', []);
  const [userInfo] = useRQGlobalState('user', {});
  useEffect(() => {
    mutationBookingHistory.mutate(userInfo.id);
  }, []);
  useEffect(() => {
    if (mutationBookingHistory.isSuccess) {
      setHistories(mutationBookingHistory.data?.data);
    }
  }, [mutationBookingHistory.status]);

  let valueQrCode = `${spaceOwnerId}`;
  idBookings.forEach(item => {
    valueQrCode = valueQrCode.concat('|', item);
  });
  const handleCapture = () => {
    refViewShot.current.capture().then(
      uri => {
        if (hasStorePermission()) {
          CameraRoll.save(uri, {type: 'photo', album: 'EZParking'});
          LocalNotification(
            'Your QRcode has been saved in your storage',
            'Take QRcode photo successfuly',
            'Your QRcode photo saved in your storage in EZParking album',
            uri,
          );
        } else {
          return;
        }
      },
      error => console.error('Oops, snapshot failed', error),
    );
  };
  return (
    <EZContainer
      styleEZContainer={{
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
      }}
      bgEZStatusBar="transparent"
      translucent>
      <Image
        source={require('../../assets/images/qr_code_top_bg.png')}
        style={styles.imageTop}
      />
      <View style={styles.ticket}>
        <Image
          source={require('../../assets/images/bg-qrcode-ticket.png')}
          style={styles.bgTicket}
        />
        <View style={[styles.badge, {backgroundColor: BG}]}>
          <IconIon
            name="barcode-outline"
            size={FONTSIZE.iconHuge}
            color={COLORS.secondary}
          />
          <IconIon
            name="checkmark-circle-outline"
            size={FONTSIZE.iconLarge}
            color={COLORS.secondary}
            style={[styles.check, {backgroundColor: BG}]}
          />
          <Image
            source={require('../../assets/images/dotDown.png')}
            style={styles.dotDown}
          />
        </View>
        <View style={styles.content}>
          <EZText styleEZText={styles.contentTop} textAlign="center">
            Your parking has been booked successfully
          </EZText>
          <ViewShot
            ref={refViewShot}
            options={{
              fileName: `QR_code_screenshot_${new Date().toString()}`,
              format: 'jpg',
              quality: 1,
            }}>
            <QRCode
              value={valueQrCode}
              logo={require('../../assets/images/logo.png')}
              logoSize={30}
              logoBackgroundColor="transparent"
              size={200}
              color={COLOR}
              backgroundColor={BG}
            />
          </ViewShot>
          <EZText
            styleEZText={{marginTop: 10, width: '60%'}}
            textAlign="center"
            color={COLORS.disable}>
            Scan this when you are in the parking lot
          </EZText>
        </View>
      </View>
      <View style={styles.btnBottom}>
        <TouchableOpacity
          onPress={handleCapture}
          style={{flexDirection: 'row', gap: 10}}>
          <IconIon
            name="camera-outline"
            size={FONTSIZE.iconLarge}
            color={COLORS.primary}
          />
          <EZText color={COLORS.disable}>Save to phone</EZText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('bottomTab', {
              screen: 'homeStack',
              params: {
                screen: 'home',
              },
            })
          }
          style={{flexDirection: 'row', gap: 10}}>
          <IconIon
            name="close"
            size={FONTSIZE.iconLarge}
            color={COLORS.white}
            style={styles.closeBtn}
          />
          <EZText color={COLORS.disable}>Exit</EZText>
        </TouchableOpacity>
      </View>
    </EZContainer>
  );
};

export default BookingTicket;

const styles = StyleSheet.create({
  imageTop: {
    width: '100%',
    height: '23%',
    resizeMode: 'cover',
  },
  ticket: {
    width: '95%',
    height: 564,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  bgTicket: {
    position: 'absolute',
    width: '100%',
    height: 564,
    resizeMode: 'contain',
  },
  badge: {
    width: 100,
    height: 100,
    position: 'absolute',
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primary,
    top: 15,
  },
  check: {
    position: 'absolute',
    top: 0,
    right: 5,
    borderRadius: 20,
  },
  dotDown: {
    width: 44,
    height: 47,
    position: 'absolute',
    bottom: -47,
  },
  contentTop: {
    width: '100%',
    paddingBottom: 20,
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    marginBottom: 20,
  },
  content: {
    position: 'absolute',
    width: '100%',
    height: 380,
    justifyContent: 'space-between',
    alignItems: 'center',
    bottom: 20,
    paddingHorizontal: 10,
  },
  btnBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  closeBtn: {
    backgroundColor: COLORS.redLight,
    borderRadius: 30,
  },
});
