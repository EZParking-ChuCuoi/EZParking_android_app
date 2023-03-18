import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {
  useCreateBlock,
  useGetBlock,
  useGetPeriodManagingRevenueParkingLot,
} from '../../hooks/api/useSpaceOwnerAction';
import {EZButton, EZButtonText} from '../../components/core/EZButton';
import {
  bgSecondaryDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import EZRBSheet from '../../components/core/EZRBSheet';
import EZLoading from '../../components/core/EZLoading';
import {PERIOD_REVENUE, VEHICLE_TYPE} from '../../utils/defaultDataSelection';
import FormBlock from '../../components/spaceOwner/block/FormBlock';
import BlockItem from '../../components/spaceOwner/block/BlockItem';
import Icon from 'react-native-vector-icons/Feather';

const LotDetail = ({navigation, route}) => {
  const {idParkingLot, nameParkingLot} = route.params;
  const mutationGetBlock = useGetBlock();
  const mutationCreateBlock = useCreateBlock();
  const refRBSheet = useRef();
  const refRBSheetPeriod = useRef();
  const {BG2ND} = bgSecondaryDefault();
  const [periodRevenue, setPeriodRevenue] = useState(PERIOD_REVENUE[0].value);
  const [params, setParams] = useState({
    parkingLotId: '',
    nameBlock: '',
    carType: '',
    desc: '',
    price: '',
    numberOfSlot: '',
  });
  const [errMess, setErrMess] = useState({
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
    if (mutationCreateBlock.isSuccess) {
      refRBSheet.current.close();
      handleResetForm();
      mutationGetBlock.mutate(idParkingLot);
    }
  }, [mutationCreateBlock.status]);
  console.log(mutationCreateBlock.error?.response?.data)

  const handleResetForm = () => {
    setParams({
      parkingLotId: '',
      nameBlock: '',
      carType: '',
      desc: '',
      price: '',
      numberOfSlot: '',
    });
  };
  const validate = () => {
    let check = true;
    let errMessages = {
      nameBlock: '',
      carType: '',
      desc: '',
      price: '',
      numberOfSlot: '',
    };
    if (params.nameBlock === '') {
      check = false;
      errMessages.nameBlock = 'Required input!';
    }
    if (params.carType === '') {
      check = false;
      errMessages.carType = 'Required input!';
    }
    if (params.desc === '') {
      check = false;
      errMessages.desc = 'Required input!';
    } else if (params.desc.split(' ').filter(i => i).length < 8) {
      check = false;
      errMessages.desc = 'Description must be more than 8 words!';
    }
    if (params.price === '') {
      check = false;
      errMessages.price = 'Required input!';
    } else if (25000 < parseInt(params.price) || parseInt(params.price) < 15000) {
      check = false;
      errMessages.price = 'Price per hour must from 15.000VND to 25.000VND!';
    }
    if (params.numberOfSlot === '') {
      check = false;
      errMessages.numberOfSlot = 'Required input!';
    } else if (params.numberOfSlot < 1) {
      check = false;
      errMessages.numberOfSlot = 'Invalid number!';
    } else if (params.numberOfSlot < 1) {
      check = false;
      errMessages.numberOfSlot = 'Invalid number!';
    }
    setErrMess(errMessages);
    return check;
  };
  const handleCreate = () => {
    if (!validate()) {
      return;
    }
    mutationCreateBlock.mutate(params);
  };
  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      {mutationCreateBlock.isLoading && <EZLoading />}
      {mutationGetBlock.isLoading && <EZLoading />}
      <ScrollView showsVerticalScrollIndicator={false}>
        <FormBlock
          refRBSheet={refRBSheet}
          params={params}
          errMess={errMess}
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
            mutationGetBlock.data?.blocks?.map(item => {
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
                  handleRefresh={() => mutationGetBlock.mutate(idParkingLot)}
                />
              );
            })}
        </View>
        {/* <View style={styles.titleRevenue}>
          <EZText
            transform="uppercase"
            bold
            color={COLORS.secondary}
            styleEZText={{
              marginTop: 20,
              width: '50%',
            }}>
            Manage revenue
          </EZText>
          <TouchableOpacity
            style={[styles.btnPeriod, {backgroundColor: BG2ND}]}
            onPress={() => refRBSheetPeriod.current.open()}>
            <EZText bold color={COLORS.primary}>
              {periodRevenue}{' '}
            </EZText>
            <Icon
              name="chevron-down"
              size={FONTSIZE.iconLarge}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
        <ChartLine />
        <EZRBSheet refRBSheet={refRBSheetPeriod} height={300}>
          <EZContainer
            styleEZContainer={{
              paddingHorizontal: SPACING.pxComponent,
              paddingVertical: SPACING.pxComponent + 10,
            }}>
            {PERIOD_REVENUE.map(item => {
              return (
                <EZButton
                  styleEZButton={{backgroundColor: BG2ND, marginBottom: 15}}
                  title={item.label}
                  handlePress={() => {
                    refRBSheetPeriod.current.close();
                    setPeriodRevenue(item.value);
                  }}
                  key={item.value}
                />
              );
            })}
          </EZContainer>
        </EZRBSheet> */}
      </ScrollView>
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
  btnPeriod: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 10,
    borderRadius: 6,
  },
  titleRevenue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  periodItem: {
    marginBottom: 15,
  },
});
