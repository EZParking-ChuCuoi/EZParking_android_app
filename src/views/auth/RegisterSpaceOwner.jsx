import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import ImageCropPicker from 'react-native-image-crop-picker';
import {EZButton} from '../../components/core/EZButton';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import EZLoading from '../../components/core/EZLoading';

const RegisterSpaceOwner = () => {
  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null)
    return (
      <EZContainer>
        <EZText>RegisterSpaceOwner</EZText>
        <EZLoading />
      </EZContainer>
    );
  const pickImage = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(img => console.log(img));
  };

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
