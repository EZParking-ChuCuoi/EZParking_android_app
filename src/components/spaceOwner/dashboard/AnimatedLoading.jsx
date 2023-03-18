import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import {COLORS} from '../../../assets/styles/styles';
import EZText from '../../core/EZText';

const AnimatedLoading = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const animate = setInterval(() => {
      setVisible(!visible);
    }, 4000);
    return () => clearInterval(animate);
  }, []);
  return (
    <AnimatedLoader
      overlayColor={COLORS.tertiary}
      animationStyle={styles.lottie}
      visible={visible}
      source={require('../../../assets/images/man-waiting-car.json')}
      speed={1}>
      <EZText color={COLORS.yellow}>Create your own parking lot</EZText>
    </AnimatedLoader>
  );
};

export default AnimatedLoading;

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
    zIndex: 9999,
  },
});
