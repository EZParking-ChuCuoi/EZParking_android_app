import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../core/EZContainer';
import EZText from '../core/EZText';
import {COLORS} from '../../assets/styles/styles';
import {EZButton} from '../core/EZButton';
import EZLoading from '../core/EZLoading';
import {useSendOTP} from '../../hooks/auth';
import {useNavigation} from '@react-navigation/native';
import {navigateAuthorized} from '../../shared/auth';

const OTPScreen = props => {
  const [otp, setOtp] = useState('');
  const refInput = useRef(null);
  const [isFocus, setIsFocus] = useState(false);
  const [errMess, setErrMessage] = useState('');
  const mutation = useSendOTP();
  const navigation = useNavigation();

  useEffect(() => {
    if(mutation.error){
      console.log(mutation.error.message)
    }
    if (mutation.isSuccess) {
      console.log('CLMMMMMMMMMM', mutation.data);
      props.closeRBSheet();
      navigateAuthorized(navigation);
    }
  }, [mutation]);

  const handleConfirm = () => {
    if (otp === '' || otp.length != 6) {
      setErrMessage('Please enter OTP code');
      return;
    }
    mutation.mutate({otp: otp, email: props.params.email});
  };

  const handleResend = () => {
    console.log('handle resend otp');
  };
  return (
    <EZContainer
      styleEZContainer={{
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center',
      }}>
      <EZText size="large" bold>
        OTP verification
      </EZText>
      <EZText color="disable">
        Please enter OTP code that we have sent to your email
      </EZText>
      <TextInput
        onChangeText={newText => {
          setOtp(newText);
        }}
        style={{width: 0, height: 0}}
        ref={refInput}
        defaultValue={otp}
        keyboardType="numeric"
        maxLength={6}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          setErrMessage('');
        }}
      />
      <View style={styles.groupOtpInput}>
        {[...Array(6)].map((item, index) => (
          <Text
            key={index}
            onPress={() => refInput.current.focus()}
            style={[
              styles.otpInput,
              {borderColor: isFocus ? COLORS.primary : COLORS.borderInput},
            ]}>
            {otp[index] || ''}
          </Text>
        ))}
      </View>
      <EZText color={COLORS.redLight}>{errMess}</EZText>
      <EZButton
        title="Confirm"
        w="50%"
        styleEZButton={{marginTop: 20}}
        handlePress={handleConfirm}
      />
      <View style={styles.resendOtp}>
        <EZText>Didn't receive an OTP?</EZText>
        <EZButton
          type="none"
          title="Resend OTP"
          handlePress={handleResend}
          w="25%"
          styleEZButton={{paddingHorizontal: 0, paddingVertical: 0}}
        />
      </View>
    </EZContainer>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  groupOtpInput: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  otpInput: {
    width: '14%',
    paddingVertical: 12,
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    color: COLORS.primary,
  },
  resendOtp: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
