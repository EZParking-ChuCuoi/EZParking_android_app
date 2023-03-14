import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZDeveloping from '../../components/core/EZDeveloping';
import EZContainer from '../../components/core/EZContainer';
import {COLORS, SPACING} from '../../assets/styles/styles';
import EZInput from '../../components/core/EZInput';
import ImageCropPicker from 'react-native-image-crop-picker';
import EZText from '../../components/core/EZText';
import Lottie from 'lottie-react-native';
import {EZButton} from '../../components/core/EZButton';
import {getData} from '../../shared/asyncStorages';
import {useEditProfile} from '../../hooks/api/auth';
import EZLoading from '../../components/core/EZLoading';

const EditAccount = ({navigation}) => {
  const mutationEditProfile = useEditProfile();
  const [params, setParams] = useState({
    userId: '',
    fullName: '',
    avatar: null,
  });

  useEffect(() => {
    const setUid = async () => {
      const uid = await getData('EZUid');
      setParams({...params, ['userId']: uid});
    };
    setUid();
  }, []);
  useEffect(() => {
    if (mutationEditProfile.isSuccess) {
      navigation.navigate('profile')
    }
  }, [mutationEditProfile.status]);
  const handlePickImage = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      cropping: true,
    }).then(img => {
      setParams({...params, ['avatar']: img});
    });
  };
  const handleUpdate = () => {
    console.log(params.avatar.size);
    mutationEditProfile.mutate(params);
  };
  return (
    <EZContainer
      styleEZContainer={{padding: SPACING.pxComponent, alignItems: 'center'}}>
      {mutationEditProfile.isLoading && <EZLoading />}
      <EZInput
        label="Full name"
        styleEZInput={{marginBottom: SPACING.mbInputItem}}
        placeholder="Full name"
        maxLength={50}
        defaultValue={params.fullName}
        onChangeText={name => setParams({...params, ['fullName']: name})}
      />
      {params.avatar === null ? (
        <Pressable onPress={handlePickImage} style={styles.uploadImage}>
          <Lottie
            source={require('../../assets/images/upload.json')}
            autoPlay
            loop
            style={{position: 'relative', width: 100, height: 100}}
          />
          <EZText>Upload avatar </EZText>
        </Pressable>
      ) : (
        <Image source={{uri: params.avatar.path}} style={styles.image} />
      )}
      <EZButton title="Update my profile" handlePress={handleUpdate} />
    </EZContainer>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  uploadImage: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 120,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 20,
  },
});
