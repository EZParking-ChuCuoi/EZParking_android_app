import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';
import {navigateAuthorized, validateEmail} from '../../shared/auth';
import EZInput from '../../components/core/EZInput';
import { COLORS, SPACING} from '../../assets/styles/styles';

const Forgot = ({navigation}) => {
  const [isStep1, setIsStep1] = useState(true);
  const [editable, setEditable] = useState(true);
  const [params, setParams] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errMessage, setErrMessage] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [secure, setSecure] = useState({
    pwd: true,
    confirmPwd: true,
  });
  const handleForgot = () => {
    console.log('params=>>', params);
    validate();
    // navigateAuthorized(navigation);
  };
  const handleStep1 = () => {
    setIsStep1(false);
  };

  const validate = () => {
    let check = true;
    let errMess = {
      email: '',
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
      confirmPassword: '',
    });
  };

  return (
    <EZContainer styleEZContainer={styles.container}>
      <EZButtonBack />
      <ImageBackground
        source={require('../../assets/images/loginImage.png')}
        resizeMode="cover"
        style={styles.imageForgot}>
        <EZText
          size="large"
          bold
          styleEZText={{marginTop: 30}}
          color={COLORS.secondary}>
          Forgot
        </EZText>
      </ImageBackground>
      <View>
        <EZText color={COLORS.disable} styleEZText={{marginBottom: 10}}>
          Please enter your email address, then check your email inbox for reset
          password.
        </EZText>
        <EZInput
          iconName="mail"
          placeholder="Email"
          onChangeText={newText => setParams({...params, ['email']: newText})}
          keyboardType="email-address"
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
          errMess={errMessage.email}
          handleBlur={handleBlur}
          editable={editable}
        />
        {!isStep1 ? (
          <>
            <EZInput
              iconName={secure.pwd ? 'eye' : 'eye-off'}
              placeholder="New password"
              secure={secure.pwd}
              onChangeText={newText =>
                setParams({...params, ['password']: newText})
              }
              handlePressIcon={() =>
                setSecure({...secure, ['pwd']: !secure.pwd})
              }
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
          </>
        ) : null}
      </View>
      {isStep1 ? (
        <View style={styles.forgetControlBtn}>
          <EZButton
            title="Send"
            w="40%"
            py={15}
            br={30}
            handlePress={() => {
              setIsStep1(false);
              setEditable(false);
            }}
            styleEZButton={{marginBottom: 30}}
          />
          <EZButton
            title="Cancle"
            w="40%"
            py={15}
            br={30}
            handlePress={() => navigation.navigate('login')}
            styleEZButton={{marginBottom: 30}}
            type="secondary"
          />
        </View>
      ) : (
        <EZButton
          title="Forgot"
          w="85%"
          py={20}
          br={30}
          handlePress={handleForgot}
          styleEZButton={{marginBottom: 30}}
        />
      )}
    </EZContainer>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  ForgotAndServices: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageForgot: {
    height: 200,
    minWidth: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  forgetControlBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
