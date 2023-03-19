import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../assets/styles/styles';
import EZLoading from '../components/core/EZLoading';
import { getData } from '../shared/asyncStorages';

const WelcomeScreen = ({navigation}) => {
  useEffect(() => {
    const navigateApp = setInterval(() => {
      navigation.navigate('');
    }, 4000);
    return () => clearInterval(navigateApp);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
