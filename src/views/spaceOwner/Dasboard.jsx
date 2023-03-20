import {
  Dimensions,
  FlatList,
  RefreshControl,
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
  const mutationParkingLot = useGetUsersParkingLot();
  const mutationPeriodRevenue = useGetPeriodManagingRevenueParkingLot();
  const [periodRevenue, setPeriodRevenue] = useState(PERIOD_REVENUE[0].value);
  const getLots = async () => {
    const uid = await getData('EZUid');
    mutationParkingLot.mutate(uid);
  };
  useEffect(() => {
    getLots();
  }, []);
  useEffect(() => {
    const getRevenue = async () => {
      const uid = await getData('EZUid');
      if (mutationParkingLot?.data?.data?.length > 0) {
        if (
          mutationParkingLot?.data?.data?.length === 1 &&
          mutationParkingLot?.data?.data[0]?.booked === 0
        ) {
          return;
        }
        mutationPeriodRevenue.mutate({userId: uid, period: periodRevenue});
      }
    };
    getRevenue();
  }, [periodRevenue, mutationParkingLot.status]);
  return (
    <EZContainer bgEZStatusBar={COLORS.tertiary}>
      {mutationParkingLot.isLoading && <EZLoading text=" " />}
      <TouchableOpacity
        style={[styles.btnBack, {backgroundColor: BG2ND, shadowColor: COLOR}]}
        onPress={() => navigation.navigate('profile')}>
        <Icon name="chevron-left" size={FONTSIZE.iconLarge} color={COLOR} />
      </TouchableOpacity>
      <ScrollView
        style={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              getLots();
            }}
          />
        }>
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
            <DashboardItem isCreate />
            {mutationParkingLot.isSuccess &&
              mutationParkingLot.data?.data?.map(item => {
                return (
                  <DashboardItem
                    item={item}
                    key={item.idParking}
                    onRefresh={getLots}
                  />
                );
              })}
          </ScrollView>
          {mutationPeriodRevenue.isSuccess && (
            <>
              <View style={styles.titleRevenue}>
                <EZText
                  transform="uppercase"
                  bold
                  color={COLORS.secondary}
                  styleEZText={{
                    marginTop: 20,
                    width: '70%',
                  }}>
                  Revenue all of your parking lots
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

              <View style={styles.chartLine}>
                <ChartLine source={mutationPeriodRevenue?.data?.data} />
              </View>
            </>
          )}
          {mutationPeriodRevenue.isLoading && <EZLoading text=" " />}
          {mutationParkingLot.data?.data?.length > 0 && (
            <>
              <EZText
                transform="uppercase"
                bold
                color={COLORS.secondary}
                styleEZText={{
                  marginTop: 20,
                  marginLeft: SPACING.pxComponent,
                }}>
                Revenue specific parking lot
              </EZText>
              <View style={styles.chartLine}>
                <ChartBar source={mutationParkingLot.data.data} />
              </View>
            </>
          )}
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
                styleEZButton={{
                  backgroundColor: BG2ND,
                  marginBottom: 15,
                  shadowColor: COLOR,
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.27,
                  shadowRadius: 4.65,

                  elevation: 8,
                }}
                title={item.label}
                handlePress={() => {
                  refRBSheetPeriod.current.close();
                  setPeriodRevenue(item.value);
                }}
                color={COLOR}
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
    paddingHorizontal: SPACING.pxComponent,
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
  chartLine: {
    maxWidth: '100%',
    marginHorizontal: SPACING.pxComponent,
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 16,
    position: 'relative',
  },
});
