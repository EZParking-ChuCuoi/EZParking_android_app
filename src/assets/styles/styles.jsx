import {StatusBar, StyleSheet, Text, useColorScheme} from 'react-native';

export const COLORS = {
  primary: '#0071AE',
  secondary: '#FF5286',
  tertiary: '#2085D3',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.26)',
  circleOverlay: 'rgba(91, 113, 227, 0.29)',
  greenOverlay: 'rgba(190, 244, 164, 0.41)',
  strokeColor: '#1BCAF0',
  disable: '#7D7C80',
  redLight: '#FD3232',
  yellow: '#FFFF00',
  yellowDarker: '#BEBE00',
  bgDark: '#1B1616',
  bgDarkSecondary: '#2E2B2B',
  bgLightSecondary: '#F9FAFB',
  bgLight: '#F3F2F8',
  borderInput: '#7D7C80',
  borderBrighter: '#091C3F14',
  linearBGLight: ['#F3F2F8', '#F2F2F2', '#DBDBDB'],
  linearBGDark: ['#1B1616', '#232526', '#414345'],
  linearBGPrimary: ['#2085D3', '#0071AE', '#1BCAF0'],
};

export const FONTSIZE = {
  small: 12,
  medium: 15,
  moreThanMedium: 18,
  quiteLarge: 25,
  large: 37,
  huge: 50,
  iconSmall: 17,
  iconMedium: 20,
  iconLarge: 25,
  iconHuge: 50,
};

export const SPACING = {
  pxComponent: 6,
  mbInputItem: 10,
};

export const bgDefault = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const BG = isDarkMode ? COLORS.bgDark : COLORS.bgLight;
  return {BG};
};
export const bgSecondaryDefault = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const BG2ND = isDarkMode ? COLORS.bgDarkSecondary : COLORS.bgLightSecondary;
  return {BG2ND};
};
export const colorDefault = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const COLOR = isDarkMode ? COLORS.white : COLORS.black;
  return {COLOR};
};
export const EZStatusBar = props => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      hidden={props.hidden || false}
      translucent={props.translucent ? true : false}
      backgroundColor={
        props.bg ? props.bg : isDarkMode ? COLORS.bgDark : COLORS.bgLight
      }
    />
  );
};
