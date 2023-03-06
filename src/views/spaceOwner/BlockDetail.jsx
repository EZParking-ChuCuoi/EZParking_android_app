import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useGetSlotsOfBlock} from '../../hooks/api/useSpaceOwnerAction';

const BlockDetail = ({navigation, route}) => {
  const mutationGetSlot = useGetSlotsOfBlock();
  const {idBlock, nameBlock} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: nameBlock,
    });
    mutationGetSlot.mutate(idBlock);
    setParams({...params, ['parkingLotId']: idParkingLot});
  }, []);
  return (
    <EZContainer>
      <EZText>BlockDetail</EZText>
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
  },
});
