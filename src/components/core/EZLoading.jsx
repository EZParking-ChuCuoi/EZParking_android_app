import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../assets/styles/styles';
import AnimatedLoader from 'react-native-animated-loader';
import EZText from './EZText';

const EZLoading = props => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const animate = setInterval(() => {
      setVisible(!visible);
    }, 2000);
    return () => clearInterval(animate);
  }, []);
  return (
    <AnimatedLoader
      overlayColor={COLORS.overlay}
      animationStyle={styles.lottie}
      visible={visible}
      source={require('../../assets/images/loader.json')}
      speed={1}>
      <EZText color={COLORS.secondary}>{props.text || 'Loading...'}</EZText>
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
