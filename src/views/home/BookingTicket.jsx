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
import React, {useEffect} from 'react';
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
import {captureScreen} from 'react-native-view-shot';
import {EZButton} from '../../components/core/EZButton';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {LocalNotification} from '../../shared/LocalPushController';
import {androidNotification} from '../../shared/androidNotification';
import {hasStorePermission} from '../../shared/androidPermission';

const BookingTicket = ({navigation, route}) => {
  const {userId, startDateTime} = route.params;
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();

  const handleCapture = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      uri => {
        if (hasStorePermission()) {
          CameraRoll.save(uri, {type: 'photo', album: 'EZParking'});
          LocalNotification(
            'Screenshot has been saved in your storage',
            'Take screenshot successfuly',
            'Your screenshot saved in your storage',
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
          <QRCode
            value={`${userId}|${startDateTime}`}
            logo={require('../../assets/images/logo.png')}
            logoSize={30}
            logoBackgroundColor="transparent"
            size={150}
            color={COLOR}
            backgroundColor={BG}
          />
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
          <EZText color={COLORS.disable}>Take screenshot</EZText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('home')}
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
    width: 383,
    height: 564,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  bgTicket: {
    position: 'absolute',
    width: 383,
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
