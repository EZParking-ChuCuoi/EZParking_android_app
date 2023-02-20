import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import ImageCropPicker from 'react-native-image-crop-picker';
import {EZButton} from '../../components/core/EZButton';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

const RegisterSpaceOwner = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  const pickImage = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(img => console.log(img));
  };

  useEffect(() => {
    const cameraPermission = async () => {
      const permission = await Camera.getCameraPermissionStatus();
      console.log('permission', permission);
    };
    cameraPermission();
  }, []);
  return (
    <EZContainer>
      <EZText>RegisterSpaceOwner</EZText>
      <EZButton title="Pick image" handlePress={pickImage} />
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
    </EZContainer>
  );
};

export default RegisterSpaceOwner;

const styles = StyleSheet.create({});
