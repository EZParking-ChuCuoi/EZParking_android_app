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
  const [styleIconFocused, setStyleIconFocused] = useState({
    color: COLORS.borderInput,
  });
  return (
    <View style={[styles.groupInput, {...props.styleEZInput}]}>
      {props.label && (
        <EZText bold styleEZText={{marginBottom: 5, fontWeight: '500'}}>
          {props.label}
        </EZText>
      )}
      <View style={[styles.inputIcon, styleTextFocused]}>
        <TextInput
          style={[
            styles.input,
            {color: isDarkMode ? COLORS.white : COLORS.black},
            {...props.styleEZInputField},
          ]}
          onChangeText={newText => props.onChangeText(newText)}
          numberOfLines={props.lines || 1}
          multiline={props.lines ? true : false}
          maxLength={props.maxLength}
          textAlignVertical={props.lines ? 'top' : 'center'}
          defaultValue={props.defaultValue || ''}
          value={props.value}
          keyboardType={props.keyboardType || 'default'}
          autoFocus={props.autoFocus || false}
          returnKeyType="next"
          secureTextEntry={props.secure || false}
          selectTextOnFocus={true}
          placeholder={props.placeholder}
          placeholderTextColor={COLORS.disable}
          onFocus={() => {
            setStyleTextFocused(
              props.styleFocus || {borderColor: COLORS.primary, borderWidth: 2},
            );
            setStyleIconFocused(props.styleFocus || {color: COLORS.primary});
          }}
          onBlur={() => {
            setStyleTextFocused({});
            setStyleIconFocused({color: COLORS.borderInput});
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
              style={styleIconFocused}
            />
          </TouchableOpacity>
        )}
      </View>
      {props.errMess && (
        <EZText
          size="small"
          color={COLORS.redLight}
          styleEZText={{marginTop: 5, fontWeight: '500'}}>
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
    overflow: 'hidden',
    borderRadius: 10,
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
    overflow: 'hidden',
  },
  input: {
    fontSize: FONTSIZE.medium,
    width: '100%',
    paddingLeft: 10,
    paddingRight: 40,
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
