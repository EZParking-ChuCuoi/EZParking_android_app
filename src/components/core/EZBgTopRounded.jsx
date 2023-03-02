import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, EZStatusBar} from '../../assets/styles/styles';

const EZBgTopRounded = props => {
  return (
    <View
      style={[
        styles.container,
        {height: props.height || '25%'},
        {...props.styleEZBgTopRounded},
      ]}>
      {props.children}
    </View>
  );
};

export default EZBgTopRounded;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.tertiary,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
  },
});
