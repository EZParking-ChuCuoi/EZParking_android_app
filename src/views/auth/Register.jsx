import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';
import {navigateAuthorized, validateEmail} from '../../shared/auth';
import EZInput from '../../components/core/EZInput';
import { COLORS, SPACING} from '../../assets/styles/styles';
import EZRBSheet from '../../components/core/EZRBSheet';
import ListCountryCode from '../../components/auth/ListCountryCode';
import {useRegister} from '../../hooks/api/auth';
import {androidNotification} from '../../shared/androidNotification';
import OTPScreen from '../../components/auth/OTPScreen';
import EZLoading from '../../components/core/EZLoading';

const Register = ({navigation}) => {
  const [params, setParams] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [errMessage, setErrMessage] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [secure, setSecure] = useState({
    pwd: true,
    confirmPwd: true,
  });

  const mutation = useRegister();
  const refRBSheet = useRef();

  useEffect(() => {
    if (mutation.isSuccess) {
      refRBSheet.current.open();
    }
  }, [mutation]);
  useEffect(() => {
    if (mutation.isError && mutation.error.response.status === 422) {
      setErrMessage({...errMessage, ['email']: 'Email is duplicated'});
    }
  }, [mutation.isError]);

  const handleRegister = () => {
    if (!validate()) {
      return;
    }
    mutation.mutate({
      fullName: params.username,
      email: params.email,
      password: params.password,
      password_confirmation: params.confirmPassword,
    });
  };

  const validate = () => {
    let check = true;
    let errMess = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    };
    if (!validateEmail(params.email)) {
      check = false;
      errMess.email = 'Invalid email format!';
    }
    if (params.email === '') {
      check = false;
      errMess.email = 'Required input!';
    }
    if (params.username === '') {
      check = false;
      errMess.username = 'Required input!';
    } else if (params.username.length < 3) {
      check = false;
      errMess.username = 'Username must be more than 3 characters!';
    }
    if (params.password === '') {
      check = false;
      errMess.password = 'Required input!';
    } else if (params.password.length < 8) {
      check = false;
      errMess.password = 'Password must be more than 8 characters!';
    }
    if (params.confirmPassword === '') {
      check = false;
      errMess.confirmPassword = 'Required input!';
    }
    if (params.confirmPassword !== params.password) {
      check = false;
      errMess.confirmPassword = 'Confirm password not match!';
    }
    setErrMessage(errMess);
    return check;
  };

  const handleBlur = () => {
    setErrMessage({
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    });
  };

  return (
    <EZContainer styleEZContainer={styles.container}>
      <EZButtonBack />
      {mutation.isLoading && <EZLoading />}
      <EZRBSheet
        refRBSheet={refRBSheet}
        closeBtn={false}
        height={Dimensions.get('window').height}
        styleEZRBSheet={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}>
        <OTPScreen
          params={params}
          closeRBSheet={() => refRBSheet.current.close()}
        />
      </EZRBSheet>
      <ImageBackground
        source={require('../../assets/images/loginImage.png')}
        resizeMode="cover"
        style={styles.imageRegister}>
        <EZText
          size="large"
          bold
          styleEZText={{marginTop: 30}}
          color={COLORS.primary}>
          Register
        </EZText>
      </ImageBackground>
      <View>
        <EZInput
          iconName="mail"
          placeholder="Email"
          onChangeText={newText => setParams({...params, ['email']: newText})}
          keyboardType="email-address"
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          errMess={errMessage.email}
          handleBlur={handleBlur}
        />
        <EZInput
          iconName="user"
          placeholder="Username"
          onChangeText={newText =>
            setParams({...params, ['username']: newText})
          }
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          errMess={errMessage.username}
          handleBlur={handleBlur}
        />
        <EZInput
          iconName={secure.pwd ? 'eye' : 'eye-off'}
          placeholder="Password"
          secure={secure.pwd}
          onChangeText={newText =>
            setParams({...params, ['password']: newText})
          }
          handlePressIcon={() => setSecure({...secure, ['pwd']: !secure.pwd})}
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          errMess={errMessage.password}
          handleBlur={handleBlur}
        />
        <EZInput
          iconName={secure.confirmPwd ? 'eye' : 'eye-off'}
          placeholder="Confirm password"
          secure={secure.confirmPwd}
          onChangeText={newText =>
            setParams({...params, ['confirmPassword']: newText})
          }
          handlePressIcon={() =>
            setSecure({...secure, ['confirmPwd']: !secure.confirmPwd})
          }
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          errMess={errMessage.confirmPassword}
          handleBlur={handleBlur}
        />
      </View>
      <EZButton
        title="Register"
        w="85%"
        py={20}
        br={30}
        handlePress={handleRegister}
        styleEZButton={{marginBottom: 30}}
      />
    </EZContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  RegisterAndServices: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageRegister: {
    height: 200,
    minWidth: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  createNew: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
