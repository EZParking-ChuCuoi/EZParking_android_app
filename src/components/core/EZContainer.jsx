import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/styles/styles';

const EZContainer = props => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
        flex: 1,
        ...props.styleEZContainer,
      }}>
      {props.children}
    </View>
  );
};

export default EZContainer;
