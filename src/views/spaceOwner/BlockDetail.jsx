import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useGetSlotsOfBlock} from '../../hooks/api/useSpaceOwnerAction';
import {COLORS, FONTSIZE} from '../../assets/styles/styles';
import Icon from 'react-native-vector-icons/Feather';

const BlockDetail = ({navigation, route}) => {
  const mutationGetSlot = useGetSlotsOfBlock();
  const {idBlock, nameBlock} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: nameBlock,
    });
    mutationGetSlot.mutate(idBlock);
  }, []);

  const SlotItem = ({slot}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [idSlotArr, setIdSlotArr] = useState([]);
    const BG = slot?.status === 'available' ? COLORS.tertiary : COLORS.disable;
    return (
      <TouchableOpacity
        onPress={() => {
          if (slot?.status === 'available') {
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
    <EZContainer>
      <ScrollView contentContainerStyle={styles.slotContainer}>
        {mutationGetSlot.isSuccess &&
          mutationGetSlot.data.map(slot => {
            return <SlotItem slot={slot} key={slot.id} />;
          })}
      </ScrollView>
    </EZContainer>
  );
};

export default BlockDetail;

const styles = StyleSheet.create({
  slotContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 10,
  },
  slotItem: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});
