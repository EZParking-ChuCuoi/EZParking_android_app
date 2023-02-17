import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, FONTSIZE} from '../../assets/styles/styles';
import EZText from './EZText';
import {useNavigation} from '@react-navigation/native';

const EZButton = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const {type = 'primary', color} = props;
  let bg = COLORS.primary;
  let colorText = color || COLORS.white;
  let bw = 0;
  if (type === 'none') {
    bg = 'transparent';
    colorText = isDarkMode ? COLORS.white : COLORS.black;
  } else if (type === 'secondary') {
    bg = 'transparent';
    colorText = COLORS.primary;
    bw = 2;
  }else if (type === 'secondaryWithColor') {
    bg = 'transparent';
    colorText = color;
    bw = 2;
  } else if (type === 'disabled') {
    bg = COLORS.disable;
    colorText = COLORS.white;
  } else if (type === 'noneWithColor') {
    bg = 'transparent';
    colorText = color;
  }
  return (
    <TouchableOpacity
      onPress={props.handlePress}
      style={[
        styles.btnContainer,
        {
          width: props.w || '100%',
          paddingHorizontal: props.px || 15,
          paddingVertical: props.py || 13,
          borderRadius: props.br || 6,
          backgroundColor: bg,
          borderColor: COLORS.primary,
          borderWidth: bw,
          ...props.styleEZButton,
        },
      ]}>
      {props.icon && (
        <Icon name={props.icon} color={colorText} size={FONTSIZE.iconMedium} />
      )}
      {props.title && (
        <EZText
          color={colorText}
          bold
          styleEZText={{
            textTransform: 'capitalize',
            paddingHorizontal: 10,
          }}
          size={props.sizeText || "medium"}>
          {props.title}
        </EZText>
      )}
    </TouchableOpacity>
  );
};

const EZButtonBack = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.backBtn, {...props.styleEZButtonBack}]}>
      <Icon
        name="chevron-left"
        color={isDarkMode ? COLORS.white : COLORS.black}
        size={FONTSIZE.iconSmall}
      />
      <EZText styleEZText={styles.backBtnText} bold>Back</EZText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 15,
    left: 10,
    zIndex: 1000,
  },
  backBtnText: {
    paddingLeft: 3,
    fontWeight: '600',
    fontSize: FONTSIZE.small,
  },
});
export {EZButton, EZButtonBack};
