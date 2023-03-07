import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../assets/styles/styles';
import EZLoading from '../components/core/EZLoading';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <EZLoading text=' ' />
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
