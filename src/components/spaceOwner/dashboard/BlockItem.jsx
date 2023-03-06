import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import EZText from '../../core/EZText';
import Icon from 'react-native-vector-icons/Feather';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../../../assets/styles/styles';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {EZButton} from '../../core/EZButton';

const BlockItem = props => {
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  let bg = [];
  if (props.createBtn) {
    bg = COLORS.linearBGPrimary;
  } else {
    bg = isDarkMode ? COLORS.linearBGDark : COLORS.linearBGLight;
  }
  return (
    <TouchableOpacity
      style={[
        styles.managetedItem,
        {backgroundColor: BG2ND, shadowColor: COLOR},
      ]}
      onPress={() => {
        if (props.navigateTo) {
          navigation.navigate(props.navigateTo);
        } else if (props.createBtn) {
          props.handlePress();
        } else {
          return;
        }
      }}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0.3, 0.6, 0.9]}
        colors={bg}
        style={styles.linearGradient}>
        {props.iconName && (
          <Icon
            name={props.iconName}
            size={FONTSIZE.iconLarge}
            color={props.createBtn ? COLORS.secondary : COLORS.primary}
          />
        )}
        <EZText lines={2} bold>
          {props.text}
        </EZText>
        {props.children}
        {props.item && (
          <>
            <View style={styles.left}>
              {props.item.carType === '4-16SLOT' ? (
                <EZText >4 - 16 seats</EZText>
              ) : (
                <EZText >16 - 34 seats</EZText>
              )}
            </View>
            <View style={styles.btnGroup}>
              <EZButton
                type="noneWithColor"
                color={COLORS.primary}
                w={100}
                icon="edit"
                handlePress={() => {}}
              />
              <EZButton
                type="noneWithColor"
                color={COLORS.redLight}
                w={100}
                icon="delete"
                handlePress={() => {}}
              />
            </View>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default BlockItem;

const styles = StyleSheet.create({
  managetedItem: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
    width: '100%',
    height: 110,
    borderRadius: 10,
    overflow: 'hidden',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnGroup: {
    position: 'absolute',
    right: 15,
  },
  left: {
    position: 'absolute',
    left: 20,
    top: 10,
  }
});
