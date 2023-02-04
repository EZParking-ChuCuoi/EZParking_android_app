import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {EZButton} from '../../components/core/EZButton';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';

const Login = ({navigation}) => {
  return (
    <EZContainer>
      <EZText>Login</EZText>
      <EZButton
        title="Login sucess"
        handlePress={() => {
          navigation.navigate('bottomTab');
        }}
      />
    </EZContainer>
  );
};

export default Login;

const styles = StyleSheet.create({});
