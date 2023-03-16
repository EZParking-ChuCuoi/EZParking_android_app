import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import EZText from './EZText';
import { SPACING } from '../../assets/styles/styles';

const EZSliderItem = ({item, heightImage = 250, local = false}) => {
  const translateYImage = new Animated.Value(-8);
  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();
  return (
    <View style={styles.container}>
      <Animated.Image
        source={{uri: local ? item?.path : item}}
        style={[
          styles.image,
          {
            height: heightImage,
            transform: [
              {
                translateY: translateYImage,
              },
            ],
          },
        ]}
      />
    </View>
  );
};

export default EZSliderItem;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width - SPACING.pxComponent*2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
});
