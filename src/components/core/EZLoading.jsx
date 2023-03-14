import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../assets/styles/styles';
import AnimatedLoader from 'react-native-animated-loader';
import EZText from './EZText';

const EZLoading = props => {
  return (
    <AnimatedLoader
      overlayColor={COLORS.overlay}
      animationStyle={styles.lottie}
      visible={true}
      source={require('../../assets/images/loader.json')}
      speed={1}>
      <EZText color={COLORS.secondary}>{props.text || ''}</EZText>
    </AnimatedLoader>
  );
};

export default EZLoading;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
