import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {EZButton} from '../../components/core/EZButton';
import EZContainer from '../../components/core/EZContainer';
import {navigateAuthorized, validateEmail} from '../../shared/auth';
import EZInput from '../../components/core/EZInput';
import {COLORS, SPACING} from '../../assets/styles/styles';
import EZRBSheet from '../../components/core/EZRBSheet';
import ListCountryCode from '../../components/auth/ListCountryCode';
import {useLogin} from '../../hooks/api/auth';
import {androidNotification} from '../../shared/androidNotification';
import EZLoading from '../../components/core/EZLoading';
import {useNavigation} from '@react-navigation/native';
import {storeData} from '../../shared/asyncStorages';
import EZText from '../../components/core/EZText';
const Login = () => {
  const navigation = useNavigation();
  const [params, setParams] = useState({
    email: '',
    password: '',
  });
  const [errMessage, setErrMessage] = useState({
    email: '',
    password: '',
  });

  const mutation = useLogin();
  const [secure, setSecure] = useState(true);
  const refRBSheet = useRef();

  useEffect(() => {
    if (mutation.isSuccess) {
      storeData('EZToken', mutation.data.data.accessToken);
      storeData('EZUid', mutation.data.data.uid + '');
      navigateAuthorized(navigation);
    }
  }, [mutation, secure]);

  useEffect(() => {
    if (mutation.isError && mutation.error.response.status === 401) {
      setErrMessage({
        email: 'Email or password wrong!',
        password: 'Email or password wrong!',
      });
    }
  }, [mutation.isError]);

  const handleLogin = async () => {
    if (!validate()) {
      return;
    }
    mutation.mutate(params);
  };

  const validate = () => {
    let check = true;
    let errMess = {
      email: '',
      password: '',
    };
    if (!validateEmail(params.email)) {
      check = false;
      errMess.email = 'Invalid email format!';
    }
    if (params.email === '') {
      check = false;
      errMess.email = 'Required input!';
    }
    if (params.password === '') {
      check = false;
      errMess.password = 'Required input!';
    }
    setErrMessage(errMess);
    return check;
  };

  const handleBlur = () => {
    setErrMessage({
      email: '',
      password: '',
    });
  };

  return (
    <EZContainer styleEZContainer={styles.container}>
      {mutation.isLoading && <EZLoading />}
      <EZRBSheet refRBSheet={refRBSheet}>
        <ListCountryCode
          handlePressItem={countryCode =>
            setParams({...params, ['prefix']: countryCode})
          }
        />
      </EZRBSheet>
      <ImageBackground
        source={require('../../assets/images/loginImage.png')}
        resizeMode="cover"
        style={styles.imageLogin}>
        <EZText
          size="large"
          bold
          styleEZText={{marginTop: 30}}
          color={COLORS.primary}>
          Login
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
          iconName={secure ? 'eye' : 'eye-off'}
          placeholder="Password"
          secure={secure}
          onChangeText={newText =>
            setParams({...params, ['password']: newText})
          }
          handlePressIcon={() => setSecure(!secure)}
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          errMess={errMessage.password}
          handleBlur={handleBlur}
        />

        <TouchableOpacity onPress={() => navigation.navigate('forgot')}>
          <EZText color={COLORS.disable} bold>
            Forgot password?
          </EZText>
        </TouchableOpacity>
      </View>
      <View style={styles.loginAndServices}>
        <EZButton
          title="Login"
          w="85%"
          py={20}
          br={30}
          handlePress={handleLogin}
        />
      </View>
      <View style={styles.createNew}>
        <EZText
          color={COLORS.disable}
          styleEZText={{marginBottom: SPACING.mbInputItem}}>
          Didn't have account?
        </EZText>
        <EZButton
          title="Create new account"
          w="85%"
          py={20}
          br={30}
          type="secondary"
          handlePress={() => navigation.navigate('register')}
        />
      </View>
    </EZContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingTop: 0,
  },
  loginAndServices: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageLogin: {
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
