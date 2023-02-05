import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {EZButton} from '../../components/core/EZButton';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';
import {navigateAuthorized} from '../../shared/auth';
import EZInput from '../../components/core/EZInput';
import {COLORS, SPACING} from '../../assets/styles/styles';

const Login = ({navigation}) => {
  const [params, setParams] = useState({
    prefix: '84',
    phone: '',
    password: '',
  });
  console.log('params=>>', params);
  const [secure, setSecure] = useState(true);

  const handleLogin = () => {
    navigateAuthorized(navigation);
  };
  return (
    <EZContainer styleEZContainer={styles.container}>
      <EZText size="large" bold styleEZText={{marginTop: 30}}>
        Login
      </EZText>
      <View>
        <View style={styles.inputGroup}>
          <EZInput
            iconName="chevron-down"
            placeholder="country-code"
            styleEZInput={{width: '30%', marginRight: 10}}
            editable={false}
            defaultValue={'+' + params.prefix}
            onChangeText={newText =>
              setParams({...params, ['prefix']: newText})
            }
          />
          <EZInput
            placeholder="Phone number"
            styleEZInput={{width: '65%'}}
            onChangeText={newText => setParams({...params, ['phone']: newText})}
            keyboardType="phone-pad"
          />
        </View>
        <EZInput
          iconName={secure ? 'eye' : 'eye-off'}
          placeholder="Password"
          secure={secure}
          onChangeText={newText =>
            setParams({...params, ['password']: newText})
          }
          handlePressIcon={() => setSecure(!secure)}
          styleEZInput={{marginBottom: SPACING.mbInputItem}}
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
        <EZText color={COLORS.disable} styleEZText={{marginVertical: 15}}>
          Or Continue with
        </EZText>
        <View style={styles.btnServices}>
          <TouchableOpacity
            onPress={() => {
              console.log('login with google');
            }}>
            <Image
              source={require('../../assets/images/googleLogo.png')}
              style={styles.btnService}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('login with facebook');
            }}>
            <Image
              source={require('../../assets/images/facebookLogo.png')}
              style={styles.btnService}
            />
          </TouchableOpacity>
        </View>
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
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.mbInputItem,
  },
  loginAndServices: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  btnServices: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnService: {
    maxWidth: 60,
    maxHeight: 60,
    marginHorizontal: 10,
  },
  createNew: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
