import {StatusBar, useColorScheme} from 'react-native';

export const COLORS = {
  primary: '#0071AE',
  secondary: '#FF5286',
  tertiary: '#2085D3',
  white: '#FFFFFF',
  black: '#000000',
  disable: '#C5C4D2',
};

export const FONTSIZE = {
  small: 13,
  medium: 15,
  large: 37,
};

export const EZStatusBar = ({backgroundStyle}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <StatusBar
      barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      backgroundColor={backgroundStyle}
    />
  );
};
