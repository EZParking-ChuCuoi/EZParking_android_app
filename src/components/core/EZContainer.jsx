import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../assets/styles/styles';

const EZContainer = props => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ScrollView
      style={{
        backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
        flex: 1,
        ...props.styleEZContainer,
      }}>
      {props.children}
    </ScrollView>
  );
};

export default EZContainer;
