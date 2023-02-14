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
  return (
    <View style={[styles.groupInput, {...props.styleEZInput}]}>
      {props.label && (
        <EZText styleEZText={{marginBottom: 5, fontWeight: '500'}}>
          {props.label}
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
            setStyleTextFocused(props.styleFocus || {borderColor: COLORS.primary, borderWidth: 2,});
          }}
          onBlur={() => {
            setStyleTextFocused({});
            props.handleBlur;
          }}
          editable={props.editable}
          ref={props.refEZInput}
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
      {props.errMess && (
        <EZText size="small" color={COLORS.redLight} styleEZText={{marginTop: 5, fontWeight: '500'}}>
          {props.errMess}
        </EZText>
      )}
    </View>
  );
};

export default EZInput;

const styles = StyleSheet.create({
  groupInput: {
    width: '100%',
    position: 'relative',
  },
  inputIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderInput,
    width: '100%',
    borderRadius: 10,
    position: 'relative',
  },
  input: {
    fontSize: FONTSIZE.medium,
    width: '100%',
    paddingHorizontal: 10,
    fontFamily: 'Poppins-Regular',
  },
  icon: {
    position: 'absolute',
    right: 8,
    padding: 5,
  },
  // Error text
  textErr: {
    color: COLORS.redLight,
    fontWeight: '500',
    fontSize: FONTSIZE.small,
  },
});
