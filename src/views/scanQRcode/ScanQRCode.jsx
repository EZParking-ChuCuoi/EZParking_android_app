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
import {COLORS, EZStatusBar} from '../../assets/styles/styles';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import EZBgTopRounded from '../../components/core/EZBgTopRounded';
import Lottie from 'lottie-react-native';
import EZLoading from '../../components/core/EZLoading';
import {useScanBookingQRcode} from '../../hooks/api/useScanQRcode';
import EZRBSheetModal from '../../components/core/EZRBSheetModal';
import ScanQRSuccess from '../../components/scanner/ScanQRSuccess';

const ScanQRCode = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const refInfo = useRef();
  const refFailed = useRef();
  const [isChecking, setIsChecking] = useState(false);
  const mutationScan = useScanBookingQRcode();
  const [idSpaceOwner, setIdSpaceOwner] = useState(undefined);
  const [scanData, setScanData] = useState({});
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  useEffect(() => {
    if (barcodes.length > 0) {
      setIsChecking(true);
      const arr = barcodes[0].displayValue.split('|');
      let bookingIds = [];
      arr.forEach((item, index) => {
        if (index !== 0) {
          bookingIds.push(item);
        }
      });
      setIdSpaceOwner(arr[0]);
      mutationScan.mutate(bookingIds);
    }
  }, [barcodes]);
  console.log(mutationScan.data?.data?.bookings[0].idSpaceOwner)
  useEffect(() => {
    if (mutationScan.isSuccess) {
      if (mutationScan.data?.data?.bookings[0].idSpaceOwner == idSpaceOwner) {
        refInfo.current.open();
      } else {
        refFailed.current.open();
      }
      setScanData(mutationScan.data?.data);
    }
  }, [mutationScan.status]);

  const handleCancle = () => {
    setIsChecking(!isChecking);
  };
  return (
    device != null &&
    hasPermission && (
      <EZContainer
        bgEZStatusBar={COLORS.tertiary}
        styleEZContainer={styles.container}>
        {mutationScan.isLoading && <EZLoading />}
        <EZBgTopRounded styleEZBgTopRounded={styles.bgTop} height={120}>
          <EZText size="large" bold color={COLORS.white}>
            Scan QR code
          </EZText>
        </EZBgTopRounded>
        <View style={styles.mainContent}>
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
            <TouchableOpacity onPress={handleCancle}>
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
          <ScanQRSuccess data={scanData} />
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
            Scan ticket failed!
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
    height: '100%',
    paddingTop: 50,
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
});
