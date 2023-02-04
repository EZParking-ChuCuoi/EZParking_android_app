import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {COLORS, FONTSIZE} from '../../assets/styles/styles';
import EZText from './EZText';

const EZInput = props => {
  const isDarkMode = useColorScheme() === 'dark';
  const [styleTextFocused, setStyleTextFocused] = useState({});
  console.log('styleFocus', styleTextFocused);
  return (
    <View style={styles.groupInput}>
      {props.label && (
        <EZText styleEZText={{marginBottom: 5, fontWeight: '500'}}>
          {props.label}
        </EZText>
      )}
      {props.errMess && (
        <EZText size="small" color={COLORS.redLight} styleEZText={{marginBottom: 5, fontWeight: '500'}}>
          {props.errMess}
        </EZText>
      )}
      <View style={[styles.inputIcon, styleTextFocused]}>
        <TextInput
          style={[styles.input, {color: isDarkMode ? COLORS.white : COLORS.black}]}
          onChangeText={newText => props.onChangeText(newText)}
          defaultValue={props.defaultValue || ''}
          keyboardType={props.keyboardType || 'default'}
          returnKeyType="next"
          secureTextEntry={props.secure || false}
          selectTextOnFocus={true}
          placeholder={props.placeholder}
          placeholderTextColor={COLORS.disable}
          onFocus={() => {
            setStyleTextFocused(props.styleFocus);
          }}
          onBlur={() => {
            setStyleTextFocused({});
          }}
        />
        {props.iconName && (
          <TouchableOpacity onPress={props.handlePressIcon} style={styles.icon}>
            <Icon
              name={props.iconName}
              size={FONTSIZE.iconMedium}
              color={COLORS.borderInput}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EZInput;

const styles = StyleSheet.create({
  groupInput: {
    width: '100%',
  },
  inputIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    width: '100%',
    borderRadius: 10,
    marginBottom: 15,
  },
  input: {
    fontSize: FONTSIZE.medium,
    width: '90%',
    paddingLeft: 10,
  },
  icon: {
    paddingRight: 15,
  },
  // Error text
  textErr: {
    color: COLORS.redLight,
    fontWeight: '500',
    fontSize: FONTSIZE.small,
  },
});
