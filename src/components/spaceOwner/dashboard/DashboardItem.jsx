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

const DashboardItem = props => {
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const navigation = useNavigation();
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <TouchableOpacity
      style={[
        styles.managetedItem,
        {backgroundColor: BG2ND, shadowColor: COLOR},
      ]}
      onLongPress={() => props.handleLongPress()}
      onPress={() => navigation.navigate(props.navigateTo)}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0.3, 0.6, 0.9]}
        colors={isDarkMode ? COLORS.linearBGDark : COLORS.linearBGLight}
        style={styles.linearGradient}>
        {props.iconName && (
          <Icon
            name={props.iconName}
            size={FONTSIZE.iconLarge}
            color={COLORS.primary}
          />
        )}
        <EZText lines={2}>
          {props.text}
        </EZText>
        {props.children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default DashboardItem;

const styles = StyleSheet.create({
  managetedItem: {
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 3,
    width: '30%',
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
});
