import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import ImageCropPicker from 'react-native-image-crop-picker';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import EZInput from '../../components/core/EZInput';
import {COLORS, FONTSIZE, SPACING} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import {getData} from '../../shared/asyncStorages';
import {useRegisterSpaceOwner} from '../../hooks/api/auth';
import EZLoading from '../../components/core/EZLoading';
import {useUploadImage} from '../../hooks/api/getBookingParkingLot';
import {useNavigation} from '@react-navigation/native';

const RegisterSpaceOwner = () => {
  const mutationRegister = useRegisterSpaceOwner();
  const mutationUpload = useUploadImage();
  const navigation = useNavigation();
  const [params, setParams] = useState({
    id: '',
    phone: '',
    businessScale: '',
    imageCardIdBef: null,
    imageCardIdAft: null,
  });

  useEffect(() => {
    const setUid = async () => {
      const uid = await getData('EZUid');
      setParams({...params, ['id']: uid});
    };
    setUid();
  }, []);
  const pickImage = direction => {
    try {
      ImageCropPicker.openPicker({
        includeExif: true,
        mediaType: 'photo',
        cropping: true,
      }).then(img => {
        if (direction === 'before') {
          setParams({...params, ['imageCardIdBef']: img});
        } else {
          setParams({...params, ['imageCardIdAft']: img});
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegister = () => {
    mutationRegister.mutate(params);
  };
  const BtnUpload = ({direction}) => {
    return (
      <TouchableOpacity
        onPress={() => pickImage(direction)}
        style={styles.btnUpload}>
        <IconFeather
          name="upload"
          size={FONTSIZE.iconMedium}
          color={COLORS.primary}
        />
        <EZText>Card-Id {direction}</EZText>
      </TouchableOpacity>
    );
  };

  if (mutationRegister.isSuccess) {
    navigation.navigate('bottomTab', {
      screen: 'account',
      params: {screen: 'dashboard'},
    });
  }
  return (
    <EZContainer
      styleEZContainer={{
        paddingHorizontal: SPACING.pxComponent,
        paddingVertical: 20,
      }}>
      {mutationRegister.isLoading && <EZLoading />}
      {mutationUpload.isLoading && <EZLoading />}
      <EZButtonBack />
      <EZText bold size="quiteLarge">
        Register spaceOwner
      </EZText>
      <View style={styles.form}>
        <EZInput
          placeholder="Phone number"
          onChangeText={phone => setParams({...params, ['phone']: phone})}
          keyboardType="phone-pad"
          defaultValue={params.phone}
          label="Phone number"
          iconName="phone"
        />
        <View style={styles.optionGroup}>
          <EZText style={styles.label}>Business scale:</EZText>
          <View style={styles.options}>
            <Pressable
              style={styles.optionItem}
              onPress={() =>
                setParams({...params, ['businessScale']: 'local'})
              }>
              {params.businessScale === 'local' ? (
                <Icon name="circle" style={styles.dotFull} />
              ) : (
                <Icon name="circle-o" style={styles.dot} />
              )}
              <EZText>Local</EZText>
            </Pressable>
            <Pressable
              style={styles.optionItem}
              onPress={() =>
                setParams({...params, ['businessScale']: 'business'})
              }>
              {params.businessScale === 'business' ? (
                <Icon name="circle" style={styles.dotFull} />
              ) : (
                <Icon name="circle-o" style={styles.dot} />
              )}
              <EZText>Business</EZText>
            </Pressable>
          </View>
        </View>
        <View style={styles.imageChoice}>
          <View style={styles.imageChoiceItem}>
            {!params.imageCardIdBef ? (
              <BtnUpload direction="before" />
            ) : (
              <Image
                source={{uri: params.imageCardIdBef.path}}
                style={styles.imagePreview}
              />
            )}
          </View>
          <View style={styles.imageChoiceItem}>
            {!params.imageCardIdAft ? (
              <BtnUpload direction="after" />
            ) : (
              <Image
                source={{uri: params.imageCardIdAft.path}}
                style={styles.imagePreview}
              />
            )}
          </View>
        </View>
      </View>
      <EZButton title="Register" handlePress={handleRegister} />
    </EZContainer>
  );
};

export default RegisterSpaceOwner;

const styles = StyleSheet.create({
  optionGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    marginVertical: 10,
  },
  options: {
    gap: 10,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  dot: {
    fontSize: FONTSIZE.iconSmall,
    color: COLORS.disable,
  },
  dotFull: {
    fontSize: FONTSIZE.iconSmall,
    color: COLORS.redLight,
  },
  imageChoice: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  imageChoiceItem: {
    width: '48%',
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  btnUpload: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    resizeMode: 'cover',
    height: 100,
  },
});
