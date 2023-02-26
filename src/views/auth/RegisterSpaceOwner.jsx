import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import ImageCropPicker from 'react-native-image-crop-picker';
import {EZButton} from '../../components/core/EZButton';

const RegisterSpaceOwner = () => {
  const pickImage = () => {
    ImageCropPicker.openPicker({
      cropping: true,
    }).then(img => console.log(img));
  };

  return (
    <EZContainer>
      <EZText>RegisterSpaceOwner</EZText>
      <EZButton title="Pick image" handlePress={pickImage} />
    </EZContainer>
  );
};

export default RegisterSpaceOwner;

const styles = StyleSheet.create({});
