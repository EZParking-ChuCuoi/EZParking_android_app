import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const ScanQRCode = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);
  useEffect(() => {}, [barcodes]);
  return (
    device != null &&
    hasPermission && (
      <EZContainer
        bgEZStatusBar={COLORS.tertiary}
        styleEZContainer={styles.container}>
        <EZBgTopRounded styleEZBgTopRounded={styles.bgTop} height={120}>
          <EZText size="large" bold>
            Scan QR code
          </EZText>
        </EZBgTopRounded>
        <View style={styles.mainContent}>
          <View style={styles.cameraWrapper}>
            <Camera
              style={styles.camera}
              device={device}
              isActive={true}
              frameProcessor={frameProcessor}
              frameProcessorFps={5}
              enableZoomGesture={true}
            />
            <Lottie
              source={require('../../assets/images/scan.json')}
              autoPlay
              loop
              style={styles.imageScan}
            />
          </View>
          <View style={styles.content}>
            <EZText>Scan result:</EZText>
            {barcodes.map((barcode, idx) => (
              <EZText key={idx} style={styles.barcodeTextURL}>
                {barcode.displayValue}
              </EZText>
            ))}
          </View>
        </View>
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
});
