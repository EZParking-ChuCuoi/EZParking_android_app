import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import {COLORS} from '../../assets/styles/styles';
import EZText from '../core/EZText';

const PopupDataEmpty = props => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const animate = setInterval(() => {
      setVisible(!visible);
    }, 3000);
    return () => clearInterval(animate);
  }, []);
  return (
    <AnimatedLoader
      overlayColor={COLORS.circleOverlay}
      animationStyle={styles.lottie}
      visible={visible}
      source={require('../../assets/images/empty-search.json')}
      speed={1}>
      <EZText color={COLORS.primary} bold>{props.text || 'Loading...'}</EZText>
    </AnimatedLoader>
  );
};

export default PopupDataEmpty;

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
});
