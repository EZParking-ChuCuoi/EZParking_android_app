import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZText from '../core/EZText';
import {bgSecondaryDefault, COLORS, FONTSIZE} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';

const ParkingLotBlock = ({item, idSlotArr, setIdSlotArr}) => {
  const {BG2ND} = bgSecondaryDefault();
  const handlePressSlot = idSlot => {
    let idSlotArrTemp = idSlotArr;
    if (idSlotArrTemp.includes(idSlot)) {
      idSlotArrTemp = idSlotArrTemp.filter(item => item !== idSlot);
    } else {
      idSlotArrTemp.push(idSlot);
    }
    setIdSlotArr(idSlotArrTemp);
  };
  const SlotItem = ({slot}) => {
    const [isSelected, setIsSelected] = useState(false);
    const BG = slot?.status === 1 ? COLORS.tertiary : COLORS.disable;
    return (
      <TouchableOpacity
        onPress={() => {
          if (slot?.status === 1) {
            handlePressSlot(slot.idSlot);
            setIsSelected(!isSelected);
          }
        }}
        style={[{backgroundColor: BG}, styles.slotItem]}>
        <EZText>{slot.slotName}</EZText>
        <View style={styles.tick}>
          {idSlotArr.includes(slot?.idSlot) && (
            <Icon
              name="check-circle"
              size={FONTSIZE.iconMedium}
              color={COLORS.redLight}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[styles.container]}>
      {item.carType === '4-16SLOT' ? (
        <EZText> 4-16 seats vehicle </EZText>
      ) : (
        <EZText> 16-34 seats vehicle </EZText>
      )}
      <View style={styles.slotList}>
        {item.status.map((slot, index) => {
          return <SlotItem slot={slot} key={index} />;
        })}
      </View>
    </View>
  );
};

export default ParkingLotBlock;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 20,
    alignItems: 'center',
    paddingVertical: 15,
  },
  slotItem: {
    width: 50,
    height: 50,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  slotList: {
    width: '100%',
    gap: 6,
    flexWrap: 'wrap',
    flexDirection: 'row',
    overflow: 'scroll',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tick: {
    position: 'absolute',
    top: 3,
    right: 3,
    elevation: 8,
  },
});
