import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import {COLORS, EZStatusBar} from '../../assets/styles/styles';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';

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
  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        <View style={styles.content}>
          <EZText>Scan result:</EZText>
          {barcodes.map((barcode, idx) => (
            <EZText key={idx} style={styles.barcodeTextURL}>
              {barcode.displayValue}
            </EZText>
          ))}
        </View>
      </>
    )
  );
};

export default ScanQRCode;

const styles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.tertiary,
  },
});
