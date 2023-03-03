import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {colorDefault, COLORS, FONTSIZE} from '../../assets/styles/styles';
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
  } else if (type === 'secondaryWithColor') {
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
          size={props.sizeText || 'medium'}>
          {props.title}
        </EZText>
      )}
    </TouchableOpacity>
  );
};

const EZButtonBack = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  const {COLOR} = colorDefault();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={[styles.backBtn, {...props.styleEZButtonBack}, {shadowColor: COLOR}]}>
      <Icon
        name="chevron-left"
        color={isDarkMode ? COLORS.white : COLORS.black}
        size={FONTSIZE.iconSmall}
        style={styles.iconLeft}
      />
      {!props.noText && <EZText styleEZText={styles.backBtnText} bold color={props.colorText}>
        Back
      </EZText>}
    </TouchableOpacity>
  );
};

const EZButtonText = props => {
  const {COLOR} = colorDefault();
  return (
    <TouchableOpacity
      onPress={() => props.handlePress()}
      style={[{...props.styleEZButtonText}, {shadowColor: COLOR}]}>
      <EZText color={props.color} bold>
        {props.text}
      </EZText>
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  backBtnText: {
    paddingLeft: 3,
    fontWeight: '600',
    fontSize: FONTSIZE.small,
  },
  iconLeft: {
    backgroundColor: COLORS.primary,
    padding: 5,
    borderRadius: 20,
  }
});
export {EZButton, EZButtonBack, EZButtonText};
