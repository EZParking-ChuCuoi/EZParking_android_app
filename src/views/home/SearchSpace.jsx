import {StyleSheet, useColorScheme} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {EZButtonBack} from '../../components/core/EZButton';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  bgDefault,
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../../assets/styles/styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import MarkerItem from '../../components/home/MarkerItem';
import {getDataObj} from '../../shared/asyncStorages';
import {API_GOOGLE_MAP} from '@env';
import {useGetNearlyParkingLot} from '../../hooks/api/getParkingLots';
import PopupDataEmpty from '../../components/home/PopupDataEmpty';
import NightMap from '../../assets/styles/nightMap.json';
import StandardMap from '../../assets/styles/standard.json';

const SearchSpace = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {BG} = bgDefault();
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const mutationNearlyPark = useGetNearlyParkingLot();
  const [currenRegion, setCurrenRegion] = useState(undefined);
  const styleEZ = {
    backgroundColor: BG,
    color: COLOR,
  };
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
      <GooglePlacesAutocomplete
        placeholder="Where do you want to go?"
        autoFocus={true}
        textInputProps={{
          placeholderTextColor: COLORS.disable,
        }}
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        onPress={(data, details = null) => {
          handleSearch(details);
        }}
        fetchDetails={true}
        minLength={6}
        query={{
          key: API_GOOGLE_MAP,
          language: 'en',
        }}
        styles={{
          container: {
            position: 'absolute',
            top: 50,
            zIndex: 10,
            right: 15,
            width: '85%',
            backgroundColor: BG,
            borderRadius: 10,
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.39,
            shadowRadius: 8.3,

            elevation: 12,
          },
          textInputContainer: {
            backgroundColor: BG,
            borderRadius: 10,
          },
          textInput: {
            color: COLOR,
            fontSize: FONTSIZE.medium,
            fontFamily: 'Poppins-Regular',
            backgroundColor: BG,
            borderRadius: 10,
          },
          row: styleEZ,
          poweredContainer: {
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
            backgroundColor: BG2ND,
          },
          separator: {
            backgroundColor: COLORS.borderInput,
          },
        }}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={isDarkMode ? NightMap : StandardMap}
        region={currenRegion}>
        {mutationNearlyPark.isSuccess &&
          mutationNearlyPark.data.map(item => {
            return <MarkerItem key={item.id} item={item} />;
          })}
        {currenRegion !== undefined && (
          <>
            <Circle
              center={currenRegion}
              radius={1500}
              // strokeColor={COLORS.secondary}
              strokeWidth={0}
              fillColor={COLORS.circleOverlay}
            />
            <Circle
              center={currenRegion}
              radius={10}
              strokeColor={COLORS.primary}
              strokeWidth={0}
              fillColor={COLORS.tertiary}
            />
          </>
        )}
      </MapView>
    </EZContainer>
  );
};

export default SearchSpace;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerP: {
    paddingHorizontal: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  },
});
