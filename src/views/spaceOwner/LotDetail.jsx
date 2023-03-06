import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useCreateBlock, useGetBlock} from '../../hooks/api/useSpaceOwnerAction';
import {EZButton, EZButtonText} from '../../components/core/EZButton';
import {COLORS, SPACING} from '../../assets/styles/styles';
import EZRBSheet from '../../components/core/EZRBSheet';
import EZInput from '../../components/core/EZInput';
import EZLoading from '../../components/core/EZLoading';
import {VEHICLE_TYPE} from '../../utils/defaultDataSelection';
import DashboardItem from '../../components/spaceOwner/dashboard/DashboardItem';
import FormBlock from '../../components/spaceOwner/block/FormBlock';
import BlockItem from '../../components/spaceOwner/block/BlockItem';

const LotDetail = ({navigation, route}) => {
  const {idParkingLot, nameParkingLot} = route.params;
  const mutationGetBlock = useGetBlock();
  const mutationCreateBlock = useCreateBlock();
  const refRBSheet = useRef();
  const [params, setParams] = useState({
    parkingLotId: '',
    nameBlock: '',
    carType: '',
    desc: '',
    price: '',
    numberOfSlot: '',
  });
  useEffect(() => {
    navigation.setOptions({
      title: nameParkingLot,
    });
    mutationGetBlock.mutate(idParkingLot);
    setParams({...params, ['parkingLotId']: idParkingLot});
  }, []);
  useEffect(() => {
    mutationGetBlock.mutate(idParkingLot);
    if (mutationCreateBlock.isSuccess) {
      refRBSheet.current.close();
    }
  }, [mutationCreateBlock.status]);

  const handleCreate = () => {
    mutationCreateBlock.mutate(params);
  };
  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      {mutationCreateBlock.isLoading && <EZLoading />}
      {mutationGetBlock.isLoading && <EZLoading />}
      <FormBlock
        refRBSheet={refRBSheet}
        params={params}
        setParams={setParams}
        handleSubmit={handleCreate}
      />
      <View style={styles.blocks}>
        <BlockItem
          handlePress={() => refRBSheet.current.open()}
          createBtn
          text="Create new block"
          iconName="plus"
        />
        {mutationGetBlock.isSuccess &&
          mutationGetBlock.data?.block?.map(item => {
            return (
              <BlockItem
                navigateTo={{
                  name: 'blockDetail',
                  params: {
                    idBlock: item.id,
                    nameBlock: item.nameBlock,
                  },
                }}
                key={item.id}
                text={item.nameBlock}
                item={item}
              />
            );
          })}
      </View>
    </EZContainer>
  );
};

export default LotDetail;

const styles = StyleSheet.create({
  itemType: {
    paddingVertical: 8,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  blocks: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
});
