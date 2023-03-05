import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/styles/styles';

const {width} = Dimensions.get('screen');
const EZSliderPagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.5, 1, 0.5],
          extrapolate: 'clamp',
        });
        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: [COLORS.disable, COLORS.secondary, COLORS.disable],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={idx}
            style={[
              styles.dot,
              {width: dotWidth, opacity, backgroundColor},
              // idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default EZSliderPagination;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.disable,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
  },
});
