import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import EZText from '../core/EZText';
import {COLORS, FONTSIZE} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';

const ParkingLotBlock = ({item}) => {
  let selectedSlot = [];
  const handlePressSlot = idSlot => {
    if(selectedSlot.includes(idSlot)){
       selectedSlot =  selectedSlot.filter(item=> item!== idSlot)
    }else{
      selectedSlot.push(idSlot);
    }
  };
  const SlotItem = ({slot}) => {
    const [isSelected, setIsSelected] = useState(false);
    const BG = slot?.status === 'available' ? COLORS.tertiary : COLORS.disable;
    return (
      <TouchableOpacity
        onPress={() => {
          handlePressSlot(slot.idSlot);
          setIsSelected(!isSelected);
        }}
        style={[{backgroundColor: BG}, styles.slotItem]}>
        <View style={styles.tick}>
          {selectedSlot.includes(slot?.idSlot) && (
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
    <View style={styles.container}>
      <EZText>{item.carType}</EZText>
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
