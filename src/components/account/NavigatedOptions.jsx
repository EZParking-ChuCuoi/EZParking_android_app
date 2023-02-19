import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {colorDefault, COLORS, FONTSIZE} from '../../assets/styles/styles';
import EZText from '../core/EZText';
const NavigatedOptions = ({data}) => {
  const {COLOR} = colorDefault();
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(data.screenName)}>
      {data?.iconLibrary === 'Ionicon' ? (
        <IonIcon name={data.nameIcon} color={COLOR} size={FONTSIZE.iconLarge} />
      ) : (
        <Icon name={data.nameIcon} color={COLOR} size={FONTSIZE.iconLarge} />
      )}
      <View style={styles.content}>
        <EZText>{data.text}</EZText>
        <Icon
          name="chevron-right"
          color={COLORS.borderInput}
          size={FONTSIZE.iconMedium}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NavigatedOptions;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '85%',
    borderBottomColor: COLORS.borderBrighter,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
  },
});
