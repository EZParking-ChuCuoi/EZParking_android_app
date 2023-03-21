import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {
  EZButton,
  EZButtonBack,
  EZButtonText,
} from '../../components/core/EZButton';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  EZStatusBar,
} from '../../assets/styles/styles';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import EZBgTopRounded from '../../components/core/EZBgTopRounded';
import Lottie from 'lottie-react-native';
import EZLoading from '../../components/core/EZLoading';
import {
  useScanBookingQRcode,
  useScanConfirmBookingQRcode,
} from '../../hooks/api/useScanQRcode';
import EZRBSheetModal from '../../components/core/EZRBSheetModal';
import ScanQRSuccess from '../../components/scanner/ScanQRSuccess';
import {Neomorph} from 'react-native-neomorph-shadows';
import useRQGlobalState from '../../hooks/useRQGlobal';
const ScanQRCode = () => {
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const refInfo = useRef();
  const refFailed = useRef();
  const [isChecking, setIsChecking] = useState(false);
  const [errMess, setErrMess] = useState('Scan ticket failed!');
  const mutationScan = useScanBookingQRcode();
  const mutationScanConfirm = useScanConfirmBookingQRcode();
  const [userInfo] = useRQGlobalState('user', {});
  const [scanData, setScanData] = useState({});
  const [isStart, setIsStart] = useState(true);
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  const btnActive = {
    width: '50%',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  };
  const btnDeactive = {
    width: '50%',
    backgroundColor: BG2ND,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  };
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  useEffect(() => {
    if (barcodes.length > 0) {
      setIsChecking(true);
    }
  }, [barcodes.length]);
  useEffect(() => {
    if (isChecking && barcodes.length>0) {
      const arr = barcodes[0]?.displayValue.split('|');
      let bookingIds = [];
      arr.forEach((item, index) => {
        if (index !== 0) {
          bookingIds.push(item);
        }
      });

      if (arr.length < 2) {
        setErrMess('Invalid QR code!');
        refFailed.current.open();
        return;
      }
      if (isStart) {
        console.log('STARTTTTTTTTTTT');
        mutationScan.mutate(bookingIds);
        return;
      } else {
        console.log('ENDDDDDDDD');
        mutationScanConfirm.mutate(bookingIds);
        return;
      }
    }
  }, [isChecking]);
  useEffect(() => {
    if (mutationScan.isSuccess) {
      if (mutationScan.data?.data?.bookings[0]?.idSpaceOwner == userInfo.id) {
        if (
          new Date(mutationScan.data?.data?.bookings[0]?.returnDate) <
          new Date()
        ) {
          setErrMess('Booking ticket has expired!');
          refFailed.current.open();
          return;
        }
        setScanData(mutationScan.data.data);
        refInfo.current.open();
      } else {
        setErrMess('Scan ticket failed!');
        refFailed.current.open();
      }
    }
  }, [mutationScan.status]);

  useEffect(() => {
    if (mutationScanConfirm.isSuccess) {
      setScanData(mutationScanConfirm.data);
      refInfo.current.open();
    } else if (
      mutationScanConfirm.error?.response?.data?.error ===
      'Booking has expired!'
    ) {
      setErrMess('Booking ticket has expired!');
      refFailed.current.open();
    } else if (
      mutationScanConfirm.error?.response?.data?.error ===
      'Booking has not yet started!'
    ) {
      setErrMess('Booking has not yet started!');
      refFailed.current.open();
    }
  }, [mutationScanConfirm.status]);

  const handleCancle = () => {
    mutationScan.reset();
    mutationScanConfirm.reset();
    setIsChecking(!isChecking);
  };
  return (
    device != null &&
    hasPermission && (
      <EZContainer
        bgEZStatusBar={COLORS.tertiary}
        styleEZContainer={styles.container}>
        {mutationScan.isLoading && <EZLoading />}
        {mutationScanConfirm.isLoading && <EZLoading />}
        <EZBgTopRounded styleEZBgTopRounded={styles.bgTop} height={120}>
          <EZText size="large" bold color={COLORS.white}>
            Scan QR code
          </EZText>
        </EZBgTopRounded>
        <View style={styles.mainContent}>
          <View style={[styles.btnGroup, {shadowColor: COLOR}]}>
            <TouchableOpacity
              onPress={() => setIsStart(true)}
              style={isStart ? btnActive : btnDeactive}>
              <EZText bold>Start parking</EZText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsStart(false)}
              style={!isStart ? btnActive : btnDeactive}>
              <EZText bold>Finish parking</EZText>
            </TouchableOpacity>
          </View>
          <View style={styles.cameraWrapper}>
            <Camera
              style={styles.camera}
              device={device}
              isActive={isChecking ? false : true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
              enableZoomGesture={true}
            />
            <Lottie
              source={require('../../assets/images/scan.json')}
              autoPlay
              loop
              style={styles.imageScan}
              speed={isChecking ? 0 : 0.7}
            />
          </View>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={handleCancle}
              style={[styles.btnScan, {backgroundColor: BG2ND}]}>
              <EZText
                bold
                size="quiteLarge"
                color={isChecking ? COLORS.primary : COLORS.redLight}>
                {isChecking ? 'Start scan' : 'Cancle'}
              </EZText>
            </TouchableOpacity>
          </View>
        </View>
        <EZRBSheetModal refRBSheet={refInfo} height="auto">
          <ScanQRSuccess data={scanData} refInfo={refInfo} />
        </EZRBSheetModal>
        <EZRBSheetModal refRBSheet={refFailed} height="auto">
          <Lottie
            source={require('../../assets/images/failed.json')}
            autoPlay
            loop
            style={styles.imageTicket}
            speed={1}
          />
          <EZText color={COLORS.redLight} bold>
            {errMess}
          </EZText>
        </EZRBSheetModal>
      </EZContainer>
    )
  );
};

export default ScanQRCode;

const styles = StyleSheet.create({
  camera: {
    position: 'relative',
    width: Dimensions.get('screen').width - 25,
    height: Dimensions.get('screen').width - 25,
  },
  cameraWrapper: {
    width: Dimensions.get('screen').width - 20,
    height: Dimensions.get('screen').width - 20,
    borderWidth: 2,
    borderColor: COLORS.strokeColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    alignItems: 'center',
  },
  bgTop: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    width: '100%',
    marginTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageScan: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
    resizeMode: 'cover',
    position: 'absolute',
  },
  content: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  imageTicket: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  btnScan: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnGroup: {
    width: '90%',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
