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
import BlockItem from '../../components/spaceOwner/dashboard/BlockItem';

const LotDetail = ({navigation, route}) => {
  const {idParkingLot, nameParkingLot} = route.params;
  const mutationGetBlock = useGetBlock();
  const mutationCreateBlock = useCreateBlock();
  const refRBSheet = useRef();
  const [isDisplay, setIsDisplay] = useState(false);
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
  console.log(mutationGetBlock.data);
  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      {mutationCreateBlock.isLoading && <EZLoading />}
      {mutationGetBlock.isLoading && <EZLoading />}
      <EZRBSheet refRBSheet={refRBSheet}>
        <EZContainer>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: SPACING.pxComponent}}>
            <EZInput
              placeholder="Khu A"
              label="Name block"
              styleEZInput={{marginVertical: SPACING.mbInputItem}}
              defaultValue={params.nameBlock}
              onChangeText={newText =>
                setParams({...params, ['nameBlock']: newText})
              }
            />
            <EZInput
              placeholder="4-16 seats"
              label="Vehicle type"
              editable={false}
              defaultValue={params.carType}
              iconName="chevron-down"
              handlePressIcon={() => setIsDisplay(!isDisplay)}
            />
            {VEHICLE_TYPE.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.itemType,
                    {display: isDisplay ? 'flex' : 'none'},
                  ]}
                  onPress={() => {
                    setParams({...params, ['carType']: item.value});
                    setIsDisplay(!isDisplay);
                  }}>
                  <EZText color={COLORS.primary}>{item.label}</EZText>
                </Pressable>
              );
            })}
            <EZInput
              placeholder="Block for 4-16 seats vehicle, high security..."
              label="Block description"
              styleEZInput={{marginBottom: SPACING.mbInputItem}}
              lines={5}
              defaultValue={params.desc}
              onChangeText={newText =>
                setParams({...params, ['desc']: newText})
              }
            />
            <EZInput
              placeholder="10"
              label="Number of slots"
              styleEZInput={{marginBottom: SPACING.mbInputItem}}
              defaultValue={params.numberOfSlot}
              keyboardType="numeric"
              onChangeText={newText =>
                setParams({...params, ['numberOfSlot']: newText})
              }
            />
            <EZInput
              placeholder="15000"
              label="Price per slot"
              styleEZInput={{marginBottom: SPACING.mbInputItem}}
              keyboardType="numeric"
              defaultValue={params.price}
              onChangeText={newText =>
                setParams({...params, ['price']: newText})
              }
            />
            <EZButton title="Create" handlePress={handleCreate} />
          </ScrollView>
        </EZContainer>
      </EZRBSheet>
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
