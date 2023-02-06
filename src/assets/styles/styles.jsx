import {StatusBar, StyleSheet, Text, useColorScheme} from 'react-native';

export const COLORS = {
  primary: '#0071AE',
  secondary: '#FF5286',
  tertiary: '#2085D3',
  white: '#FFFFFF',
  black: '#000000',
  disable: '#7D7C80',
  redLight: '#FD3232',
  bgDark: '#1B1616',
  bgLight: '#F9FAFB',
  borderInput: '#7D7C80',
};

export const FONTSIZE = {
  small: 13,
  medium: 15,
  large: 37,
  iconSmall: 17,
  iconMedium: 20,
  iconLarge: 25,
};

export const SPACING = {
  pxComponent: 15,
  mbInputItem: 10,
};

export const BGDEFAULT = () => {
  const isDarkMode = useColorScheme();
  return isDarkMode ? COLORS.bgDark : COLORS.bgLight;
}
export const EZStatusBar = props => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor={props.bg ? props.bg : isDarkMode ? COLORS.bgDark : COLORS.bgLight}
    />
  );
};
