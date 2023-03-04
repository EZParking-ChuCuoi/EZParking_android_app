import {StyleSheet, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import {EZButtonBack} from '../../components/core/EZButton';
import {Circle} from 'react-native-maps';
import {COLORS} from '../../assets/styles/styles';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import MarkerItem from '../../components/home/MarkerItem';
import {getDataObj} from '../../shared/asyncStorages';
import {useGetNearlyParkingLot} from '../../hooks/api/getParkingLots';
import PopupDataEmpty from '../../components/home/PopupDataEmpty';
import EZMapView from '../../components/core/EZMapView';

const SearchSpace = () => {
  const mutationNearlyPark = useGetNearlyParkingLot();
  const [currenRegion, setCurrenRegion] = useState(undefined);
  useEffect(() => {
    const initRegion = async () => {
      const coordinate = await getDataObj('EZCurrentRegion');
      mutationNearlyPark.mutate({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
      setCurrenRegion({
        latitude: parseFloat(coordinate.latitude),
        longitude: parseFloat(coordinate.longitude),
        latitudeDelta: 0.04,
        longitudeDelta: 0.025,
      });
    };
    initRegion();
  }, []);
  useEffect(() => {
    mutationNearlyPark.mutate({
      latitude: JSON.stringify(currenRegion?.latitude),
      longitude: JSON.stringify(currenRegion?.longitude),
    });
  }, [currenRegion]);
  useHideTabBar();

  const handleSearch = details => {
    setCurrenRegion({
      ...currenRegion,
      ['latitude']: details?.geometry?.location.lat,
      ['longitude']: details?.geometry?.location.lng,
    });
  };
  return (
    <EZContainer bgEZStatusBar="transparent" translucent>
      <EZButtonBack
        noText
        styleEZButtonBack={{top: 60}}
        colorText={COLORS.black}
      />

      {mutationNearlyPark.data?.length === 0 && (
        <PopupDataEmpty text="Couldn't find any parking near this location" />
      )}
      {currenRegion && (
        <EZMapView
          region={currenRegion}
          handleSearch={details => handleSearch(details)}>
          {mutationNearlyPark.isSuccess &&
            mutationNearlyPark.data.map(item => {
              return <MarkerItem key={item.id} item={item} />;
            })}
        </EZMapView>
      )}
    </EZContainer>
  );
};

export default SearchSpace;
