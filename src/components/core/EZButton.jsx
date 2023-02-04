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
import { useNavigation } from '@react-navigation/native';

const EZButton = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const {type = 'primary'} = props;
  let bg = COLORS.primary;
  let colorText = COLORS.white;
  let bw = 0;
  if (type === 'none') {
    bg = 'transparent';
    colorText = isDarkMode ? COLORS.white : COLORS.black;
  } else if (type === 'secondary') {
    bg = 'transparent';
    colorText = COLORS.primary;
    bw = 2;
  } else if (type === 'disabled') {
    bg = COLORS.disable;
    colorText = COLORS.white;
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
        },
      ]}>
      {props.icon && <Icon name={props.icon} color={colorText} size={FONTSIZE.iconMedium} />}
      {props.title && (
        <Text style={[styles.btnText, {color: colorText}]}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const EZButtonBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.backBtn}>
      <Icon name="arrow-left" size={28} color={COLORS.white} />
      <EZText style={styles.btnText}> Back</EZText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnText: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    paddingHorizontal: 10,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtnText: {
    marginLeft: 6,
    fontWeight: '600',
    fontSize: FONTSIZE.medium,
  },
});
export {EZButton, EZButtonBack};
