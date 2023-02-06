import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {EZButton} from '../../components/core/EZButton';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';
import {navigateAuthorized} from '../../shared/auth';
import EZInput from '../../components/core/EZInput';
import {BGDEFAULT, COLORS, SPACING} from '../../assets/styles/styles';
import EZRBSheet from '../../components/core/EZRBSheet';
import ListCountryCode from '../../components/auth/ListCountryCode';

const Register = ({navigation}) => {
  const [params, setParams] = useState({
    prefix: '84',
    phone: '',
  });
  const [secure, setSecure] = useState(true);
  const refRBSheet = useRef();
  const bg = BGDEFAULT();
  const handleRegister = () => {
    console.log('handleRegister', params);
  };

  return (
    <EZContainer styleEZContainer={styles.container}>
      <EZRBSheet refRBSheet={refRBSheet}>
        <ListCountryCode
          handlePressItem={countryCode =>
            setParams({...params, ['prefix']: countryCode})
          }
        />
      </EZRBSheet>
      <EZText size="large" bold styleEZText={{marginTop: 30}}>
        Register
      </EZText>
      <View>
        <EZText styleEZText={{marginBottom: 20}}>
          Enter you phone number to signup
        </EZText>
        <View style={styles.inputGroup}>
          <EZInput
            iconName="chevron-down"
            handlePressIcon={() => {
              refRBSheet.current.open();
            }}
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
      </View>
      <View style={styles.registerAndServices}>
        <EZButton
          title="Register"
          w="85%"
          py={20}
          br={30}
          handlePress={handleRegister}
        />
        <EZText color={COLORS.disable} styleEZText={{marginTop: 20}}>
          By proceeding you agree with our
        </EZText>
        <EZText color={COLORS.primary}>
          Terms of Services & Privacy Policy
        </EZText>
      </View>
    </EZContainer>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 50,
  },
  inputGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.mbInputItem,
  },
  registerAndServices: {
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
