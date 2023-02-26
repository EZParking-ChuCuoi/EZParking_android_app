import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {COLORS} from '../../assets/styles/styles';
import AnimatedLoader from 'react-native-animated-loader';

const EZLoading = (props) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 2000);
  }, []);
  return (
    <AnimatedLoader
      overlayColor={COLORS.overlay}
      animationStyle={styles.lottie}
      visible={visible}
      source={require('../../assets/images/loader.json')}
      speed={1}>
      <Text>{props.text || 'Loading...'}</Text>
    </AnimatedLoader>
  );
};

export default EZLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.overlay,
    zIndex: 99999,
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
