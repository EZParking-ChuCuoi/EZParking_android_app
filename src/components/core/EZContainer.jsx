import {ScrollView, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React from 'react';
import {COLORS, EZStatusBar} from '../../assets/styles/styles';

const EZContainer = props => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={{
        backgroundColor: isDarkMode ? COLORS.bgDark : COLORS.bgLight,
        position: 'relative',
        flex: 1,
        width: '100%',
        ...props.styleEZContainer,
      }}>
      {props.children}
      <EZStatusBar bg={props.bgEZStatusBar}/>
    </View>
  );
};

export default EZContainer;
