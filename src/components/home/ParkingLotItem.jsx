import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import EZContainer from '../core/EZContainer';
import EZText from '../core/EZText';
import {
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const ParkingLotItem = props => {
  const navigation = useNavigation();
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const {data} = props;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('spaceDetail', {
          parkingId: data.id,
        })
      }
      style={[styles.container, {backgroundColor: BG2ND, shadowColor: COLOR}]}>
      <Icon
        name="map-pin"
        size={FONTSIZE.iconMedium}
        color={COLORS.primary}
        style={styles.flexLeft}
      />
      <View style={styles.flexRight}>
        <EZText bold>{data.nameParkingLot}</EZText>
        <EZText>{data.address}</EZText>
        <View style={styles.exceptDes}>
          <EZText color={COLORS.primary}>
            {data.openTime.toString().slice(0, 5) +
              ' - ' +
              data.endTime.toString().slice(0, 5)}
          </EZText>
          <EZText bold color={COLORS.secondary}>
            {Math.round(data.distance * 100) / 100} Km
          </EZText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ParkingLotItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 15,

    elevation: 6,
  },
  flexLeft: {},
  flexRight: {
    width: '95%',
    paddingLeft: 7,
    alignItems: 'flex-start',
  },
  exceptDes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
