import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import EZRBSheetModal from '../../components/core/EZRBSheetModal';

const EditAccount = ({onRefresh, refEdit}) => {
  const mutationEditProfile = useEditProfile();
  const refErr = useRef();
  const [params, setParams] = useState({
    userId: '',
    fullName: '',
    avatar: null,
  });
  const [errMess, setErrMess] = useState({
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
      refEdit.current.close();
      onRefresh();
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
    let mess = {
      fullName: '',
      avatar: null,
    };
    let check = true;
    if (params.fullName === '') {
      if (params.avatar === null) {
        mess.fullName = 'Please enter at least 1 field!';
        check = false;
      } else if (params.avatar.size / 1000 > 1044) {
        mess.avatar = 'Image too large!';
        check = false;
      }
    } else {
      if (params.fullName.length < 3) {
        mess.fullName = 'User name must be from 3 characters!';
        check = false;
      }
      if (params.avatar !== null && params.avatar.size / 1000 > 1044) {
        mess.avatar = 'Image too large!';
        check = false;
      }
    }
    if (check) {
      mutationEditProfile.mutate(params);
    } else {
      refErr.current.open();
      setErrMess(mess);
    }
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
      <EZRBSheetModal refRBSheet={refErr} height="auto">
        <EZText
          styleEZText={{marginBottom: 10}}
          bold
          size="quiteLarge"
          color={COLORS.redLight}>
          Warning
        </EZText>
        <EZText styleEZText={{marginBottom: 10}}>{errMess.fullName}</EZText>
        <EZText styleEZText={{marginBottom: 10}}>{errMess.avatar}</EZText>
      </EZRBSheetModal>
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
