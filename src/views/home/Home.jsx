import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {EZButton} from '../../components/core/EZButton';
import {
  bgDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import EZLoading from '../../components/core/EZLoading';
import EZBgTopRounded from '../../components/core/EZBgTopRounded';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import ParkingLotItem from '../../components/home/ParkingLotItem';
import EZRBSheet from '../../components/core/EZRBSheet';
import {requestLocationPermission} from '../../shared/androidPermission';
import Geolocation from '@react-native-community/geolocation';
import {useGetNearlyParkingLot} from '../../hooks/api/getParkingLots';
import {getData, storeDataObj} from '../../shared/asyncStorages';
import {useGetUserInfo} from '../../hooks/api/auth';
import {AVATAR} from '../../utils/defaultImage';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import RemotePushController from '../../shared/RemotePushController';
import SplashScreen from 'react-native-splash-screen';

const Home = () => {
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  const refRBSheet = useRef();
  const navigation = useNavigation();
  const mutationNearlyPark = useGetNearlyParkingLot();
  const mutationUserInfo = useGetUserInfo();
  const [currentRegion, setCurrentRegion] = useState(undefined);

  useEffect(() => {
    const askPermissionLocation = async () => {
      SplashScreen.hide();
      const permission = await requestLocationPermission(null);
      const EZUid = await getData('EZUid');
      mutationUserInfo.mutate(EZUid);
      if (permission) {
        getCurrentLocation();
      }
    };
    askPermissionLocation();
  }, []);
  useEffect(() => {
    const storeCurrent = () => {
      if (currentRegion !== undefined) {
        storeDataObj('EZCurrentRegion', currentRegion);
      }
      if (currentRegion !== undefined) {
        mutationNearlyPark.mutate(currentRegion);
      }
    };
    return storeCurrent();
  }, [currentRegion]);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const longitude = JSON.stringify(position.coords.longitude);
        const latitude = JSON.stringify(position.coords.latitude);
        setCurrentRegion({latitude, longitude});
      },
      error => {
        if (error.PERMISSION_DENIED === 1) {
          RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
            interval: 10000,
            fastInterval: 5000,
          })
            .then(data => {
              if (data === 'enabled') {
                getCurrentLocation();
              }
            })
            .catch(err => {
              throw err;
            });
        }
      },
    );
  };

  return (
    <EZContainer bgEZStatusBar={COLORS.tertiary}>
      <RemotePushController />
      <EZRBSheet refRBSheet={refRBSheet}>
        <EZContainer>
          <EZText>Hi man</EZText>
        </EZContainer>
      </EZRBSheet>
      <EZBgTopRounded styleEZBgTopRounded={{marginBottom: 30}}>
        <View style={styles.userInfo}>
          <EZText color={COLORS.white} bold size="large">
            Hi{' '}
            {mutationUserInfo.isSuccess &&
              mutationUserInfo.data?.data[0]?.fullName}
          </EZText>
          <Image
            source={{
              uri: mutationUserInfo.isSuccess
                ? mutationUserInfo.data?.data[0]?.avatar
                : AVATAR,
            }}
            style={styles.image}
          />
        </View>
        <Pressable
          style={[styles.searchBar, {shadowColor: COLOR, backgroundColor: BG}]}
          onPress={() => navigation.navigate('homeStack', {screen: 'search'})}>
          <EZText color={COLORS.disable}>Where do you want to go?</EZText>
          <Icon name="send" size={FONTSIZE.iconMedium} color={COLORS.disable} />
        </Pressable>
      </EZBgTopRounded>
      <View style={styles.titleWithBtn}>
        <EZText bold size="quiteLarge">
          Parking lots near you
        </EZText>
        <TouchableOpacity
          style={styles.filter}
          onPress={() => refRBSheet.current.open()}>
          <Icon name="filter" size={FONTSIZE.iconMedium} color={COLOR} />
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={mutationNearlyPark.data}
        renderItem={({item}) => <ParkingLotItem data={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={{justifyContent: 'center'}}>
            {<EZText>Turn on location to see your nearly parking lots</EZText>}
            {mutationNearlyPark.isLoading && <EZLoading />}
          </View>
        }
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: SPACING.pxComponent,
          paddingVertical: 10,
          paddingBottom: 50,
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              getCurrentLocation();
            }}
          />
        }
      />
    </EZContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  searchBar: {
    width: '80%',
    borderRadius: 18,
    borderColor: COLORS.borderInput,
    borderWidth: 1,
    position: 'absolute',
    bottom: -25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 12,
  },
  filter: {
    padding: 5,
  },
  titleWithBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.pxComponent,
  },
  listParkingLot: {
    paddingHorizontal: SPACING.pxComponent,
  },
});
