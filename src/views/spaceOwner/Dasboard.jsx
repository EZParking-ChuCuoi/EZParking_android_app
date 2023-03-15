import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import EZBgTopRounded from '../../components/core/EZBgTopRounded';
import {
  bgDefault,
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import AnimatedLoader from 'react-native-animated-loader';
import {EZButton, EZButtonBack} from '../../components/core/EZButton';
import AnimatedLoading from '../../components/spaceOwner/dashboard/AnimatedLoading';
import Icon from 'react-native-vector-icons/Feather';
import EZInput from '../../components/core/EZInput';
import {Link} from '@react-navigation/native';
import DashboardItem from '../../components/spaceOwner/dashboard/DashboardItem';
import {
  useDeleteParkingLot,
  useGetManagingRevenueParkingLot,
  useGetPeriodManagingRevenueParkingLot,
  useGetUsersParkingLot,
} from '../../hooks/api/useSpaceOwnerAction';
import {getData} from '../../shared/asyncStorages';
import ChartLine from '../../components/spaceOwner/dashboard/ChartLine';
import EZLoading from '../../components/core/EZLoading';
import ChartBar from '../../components/spaceOwner/dashboard/ChartBar';
import EZRBSheet from '../../components/core/EZRBSheet';
import {PERIOD_REVENUE} from '../../utils/defaultDataSelection';

const Dasboard = ({navigation}) => {
  const {COLOR} = colorDefault();
  const {BG2ND} = bgSecondaryDefault();
  const {BG} = bgDefault();
  const refRBSheetPeriod = useRef();
  const refDelete = useRef();
  const mutationParkingLot = useGetUsersParkingLot();
  const mutationPeriodRevenue = useGetPeriodManagingRevenueParkingLot();
  const mutationDelete = useDeleteParkingLot();
  const [periodRevenue, setPeriodRevenue] = useState(PERIOD_REVENUE[0].value);
  useEffect(() => {
    const getLots = async () => {
      const uid = await getData('EZUid');
      mutationParkingLot.mutate(uid);
    };
    getLots();
  }, []);
  useEffect(() => {
    const getRevenue = async () => {
      const uid = await getData('EZUid');
      if (mutationParkingLot?.data?.data?.length > 0) {
        mutationPeriodRevenue.mutate({userId: uid, period: periodRevenue});
      }
    };
    getRevenue();
  }, [periodRevenue, mutationParkingLot.status]);

  const handleDelete = idParking => {
    mutationDelete.mutate(idParking);
    refDelete.current.close();
  };

  return (
    <EZContainer bgEZStatusBar={COLORS.tertiary}>
      {mutationDelete.isLoading && <EZLoading text=" " />}
      {mutationParkingLot.isLoading && <EZLoading text=" " />}
      <TouchableOpacity
        style={[styles.btnBack, {backgroundColor: BG2ND, shadowColor: COLOR}]}
        onPress={() => navigation.navigate('profile')}>
        <Icon name="chevron-left" size={FONTSIZE.iconLarge} color={COLOR} />
      </TouchableOpacity>
      <ScrollView style={{paddingBottom: 50}}>
        <AnimatedLoading />
        <EZBgTopRounded height={150}>
          <EZText size="large" bold color={COLORS.white}>
            Dashoard
          </EZText>
        </EZBgTopRounded>
        <View style={styles.mainContent}>
          <EZText
            transform="uppercase"
            bold
            color={COLORS.secondary}
            styleEZText={{paddingLeft: SPACING.pxComponent}}>
            Your parking lots
          </EZText>
          <ScrollView
            contentContainerStyle={styles.yourLots}
            showsVerticalScrollIndicator={false}>
            <DashboardItem
              navigateTo="createLot"
              text="Create new"
              iconName="plus"
            />
            {mutationParkingLot.isSuccess &&
              mutationParkingLot.data?.data?.map(item => {
                return (
                  <DashboardItem
                    navigateTo={{
                      name: 'lotDetail',
                      params: {
                        idParkingLot: item.idParking,
                        nameParkingLot: item.nameParkingLot,
                      },
                    }}
                    key={item.idParking}
                    handleLongPress={() => {
                      refDelete.current.open();
                    }}
                    text={item.nameParkingLot}>
                    <EZRBSheet refRBSheet={refDelete} height={200}>
                      <EZContainer
                        styleEZContainer={{
                          paddingHorizontal: SPACING.pxComponent,
                          paddingVertical: SPACING.pxComponent + 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <EZText styleEZText={{marginBottom: 20}}>
                          Delete <EZText bold>{item.nameParkingLot}</EZText>?
                        </EZText>
                        <EZButton
                          title="Delete"
                          iconName="trash-2"
                          type="secondary"
                          handlePress={() => handleDelete(item.idParking)}
                        />
                      </EZContainer>
                    </EZRBSheet>
                  </DashboardItem>
                );
              })}
          </ScrollView>
          <View style={styles.titleRevenue}>
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
          {mutationPeriodRevenue.isSuccess && (
            <ChartLine source={mutationPeriodRevenue?.data?.data} />
          )}
          {mutationPeriodRevenue.isLoading && <EZLoading text=" " />}
          {/* {mutationParkingLot.isSuccess && (
            <ChartBar source={mutationParkingLot.data.data} label={'booked'} />
          )} */}
        </View>
      </ScrollView>
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
      </EZRBSheet>
    </EZContainer>
  );
};

export default Dasboard;

const styles = StyleSheet.create({
  btnBack: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    position: 'absolute',
    top: 0,
    left: 10,
    zIndex: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 8,
  },
  yourLots: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
    padding: 10,
  },
  mainContent: {
    marginTop: 30,
    width: '100%',
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
  btnPeriod: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingVertical: 10,
    borderRadius: 6,
  },
});
