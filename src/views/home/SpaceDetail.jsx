import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import {useRoute} from '@react-navigation/native';
import {
  useGetParkingLotInfo,
  useHandleSavedParkingLot,
} from '../../hooks/api/getParkingLots';
import Icon from 'react-native-vector-icons/Feather';
import {
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import {EZButton} from '../../components/core/EZButton';
import ParkingLotComment from '../../components/home/ParkingLotComment';
import EZSlider from '../../components/core/EZSlider';
import {handleCurrenCy} from '../../shared/handleCurrenCy';
import {getData} from '../../shared/asyncStorages';
import EZLoading from '../../components/core/EZLoading';

const SpaceDetail = ({navigation, route}) => {
  useHideTabBar();
  const {COLOR} = colorDefault();
  const mutationParkingLotInfo = useGetParkingLotInfo();
  const mutationHandleSaved = useHandleSavedParkingLot();
  const {parkingId} = route.params;
  const WIDTH = Dimensions.get('screen').width;
  const [parkingLotInfo, setParkingLotInfo] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const getInfo = async () => {
    const uid = await getData('EZUid');
    mutationParkingLotInfo.mutate({parkingId, uid});
  };
  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    if (mutationParkingLotInfo.isSuccess) {
      navigation.setOptions({
        title: mutationParkingLotInfo.data[0].nameParkingLot,
      });
      setParkingLotInfo(mutationParkingLotInfo.data[0]);
      setIsSaved(mutationParkingLotInfo.data[0]?.statusWishlist == 1);
    }
  }, [mutationParkingLotInfo.status]);
  useEffect(() => {
    if (mutationHandleSaved.isSuccess) {
      setIsSaved(!isSaved);
      getInfo();
    }
  }, [mutationHandleSaved.status]);
  const handleSave = async () => {
    const uid = await getData('EZUid');
    mutationHandleSaved.mutate({userId: uid, parkingLotId: parkingId});
  };
  return (
    <EZContainer>
      {mutationHandleSaved.isLoading && <EZLoading />}
      {parkingLotInfo && (
        <>
          <View
            style={{
              width:
                parkingLotInfo.images.length == 1
                  ? WIDTH - SPACING.pxComponent * 2
                  : '100%',
              overflow: 'visible',
              marginHorizontal: SPACING.pxComponent,
            }}>
            <EZSlider data={parkingLotInfo.images} />
          </View>
          <View style={styles.lotContent}>
            <EZText bold size="quiteLarge">
              {parkingLotInfo.nameParkingLot}
            </EZText>
            <View style={styles.flexRow}>
              <Icon name="map-pin" size={FONTSIZE.iconMedium} color={COLOR} />
              <EZText>{parkingLotInfo.address}</EZText>
            </View>
            <View style={styles.flexRow}>
              <Icon name="shield" size={FONTSIZE.iconMedium} color={COLOR} />
              <EZText>Security system</EZText>
            </View>
            <View style={styles.flexRow}>
              <Icon
                name="credit-card"
                size={FONTSIZE.iconMedium}
                color={COLOR}
              />
              <EZText>~{handleCurrenCy(parkingLotInfo.avgPrice)}</EZText>
            </View>
            <EZText bold styleEZText={{marginTop: 10}}>
              Description
            </EZText>
            <EZText>{parkingLotInfo.desc}</EZText>
            <View style={styles.btns}>
              <EZButton
                title="Booking"
                type="primary"
                w="40%"
                handlePress={() =>
                  navigation.navigate('booking', {
                    info: mutationParkingLotInfo.data[0],
                  })
                }
              />
              <EZButton
                title={isSaved ? 'Saved' : 'Save'}
                type="secondary"
                w="40%"
                handlePress={handleSave}
                iconFontAwesome={isSaved ? 'bookmark' : 'bookmark-o'}
              />
            </View>
            <ParkingLotComment idParkingLot={parkingId} />
          </View>
        </>
      )}
    </EZContainer>
  );
};

export default SpaceDetail;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  lotContent: {
    paddingHorizontal: SPACING.pxComponent,
    gap: 6,
    width: '100%',
    marginTop: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    width: '100%',
  },
  btns: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: COLORS.borderInput,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});
