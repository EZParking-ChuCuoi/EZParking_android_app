import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZText from '../../components/core/EZText';
import EZContainer from '../../components/core/EZContainer';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import {useRoute} from '@react-navigation/native';
import {useGetParkingLotInfo} from '../../hooks/api/getParkingLots';
import Icon from 'react-native-vector-icons/Feather';
import {
  colorDefault,
  COLORS,
  FONTSIZE,
  SPACING,
} from '../../assets/styles/styles';
import {EZButton} from '../../components/core/EZButton';
import ParkingLotComment from '../../components/home/ParkingLotComment';

const SpaceDetail = ({navigation, route}) => {
  useHideTabBar();
  const {COLOR} = colorDefault();
  const mutationParkingLotInfo = useGetParkingLotInfo();
  const {parkingId} = route.params;
  const [parkingLotInfo, setParkingLotInfo] = useState(null);

  useEffect(() => {
    const getStated = async () => {
      mutationParkingLotInfo.mutate(parkingId);
    };
    getStated();
  }, []);
  useEffect(() => {
    if (mutationParkingLotInfo.isSuccess) {
      navigation.setOptions({
        title: mutationParkingLotInfo.data[0].nameParkingLot,
      });
      setParkingLotInfo(mutationParkingLotInfo.data[0]);
    }
  }, [mutationParkingLotInfo.status]);

  return (
    <EZContainer styleEZContainer={{paddingHorizontal: SPACING.pxComponent}}>
      {parkingLotInfo && (
        <>
          <View style={styles.images}>
            <Image source={{uri: parkingLotInfo.image}} style={styles.image} />
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
                title="Chat"
                type="secondary"
                w="40%"
                handlePress={() => {}}
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
    // paddingHorizontal: SPACING.pxComponent,
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
