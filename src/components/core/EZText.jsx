import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {COLORS, FONTSIZE} from '../../assets/styles/styles';

const EZText = props => {
  let {size = 'medium', color = 'default', bold = false} = props;
  const isDarkMode = useColorScheme() === 'dark';
  let colorText = color;
  let sizeText = size;
  const ff = bold ? 'Poppins-Bold' : 'Poppins-Regular';
  if (color === 'primary') {
    colorText = COLORS.primary;
  } else if (color === 'secondary') {
    colorText = COLORS.secondary;
  } else if (color === 'disable') {
    colorText = COLORS.disable;
  } else if (color === 'white') {
    colorText = COLORS.white;
  } else if (color === 'black') {
    colorText = COLORS.black;
  } else if (color === 'default') {
    colorText = isDarkMode ? COLORS.white : COLORS.black;
  }

  if (size === 'small') {
    sizeText = FONTSIZE.small;
  } else if (size === 'medium') {
    sizeText = FONTSIZE.medium;
  } else if (size === 'large') {
    sizeText = FONTSIZE.large;
  }else if (size === 'huge') {
    sizeText = FONTSIZE.huge;
  }else if (size === 'quiteLarge') {
    sizeText = FONTSIZE.quiteLarge;
  }
  return (
    <Text
      style={{
        color: colorText,
        fontSize: sizeText,
        fontFamily: ff,
        textAlignVertical: 'center',
        ...props.styleEZText,
      }}
      numberOfLines={props.lines}
      ellipsizeMode='tail'>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({});

export default EZText;
