import {Image, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useEffect} from 'react';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import NightMap from '../../assets/styles/nightMap.json';
import StandardMap from '../../assets/styles/standard.json';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {API_GOOGLE_MAP} from '@env';
import {
  bgDefault,
  bgSecondaryDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../../assets/styles/styles';
import EZText from './EZText';

const EZMapView = props => {
  const {
    region,
    styleEZMapView = styles.map,
    children,
    handleSearch,
    dragMarker = false,
    handleDragMarker,
    placeholderSearch = 'Where do you want to go?',
  } = props;
  let initRegion = {
    latitude: parseFloat(region.latitude),
    longitude: parseFloat(region.longitude),
    latitudeDelta: 0.04,
    longitudeDelta: 0.025,
  };
  const isDarkMode = useColorScheme() === 'dark';
  const {BG} = bgDefault();
  const {BG2ND} = bgSecondaryDefault();
  const {COLOR} = colorDefault();
  const styleEZ = {
    backgroundColor: BG,
    color: COLOR,
  };

  useEffect(() => {
    if (props.refInput) {
      props.refInput.current?.setAddressText(props.setText);
    }
  }, []);
  return (
    <>
      <GooglePlacesAutocomplete
        placeholder={placeholderSearch}
        autoFocus={true}
        textInputProps={{
          placeholderTextColor: COLORS.disable,
        }}
        GooglePlacesDetailsQuery={{fields: 'geometry'}}
        ref={props.refInput || null}
        onPress={(data, details = null) => {
          handleSearch(details);
        }}
        fetchDetails={true}
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
            ...props.styleSearch,
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
        style={styleEZMapView}
        customMapStyle={isDarkMode ? NightMap : StandardMap}
        region={initRegion}>
        {children}
        {dragMarker ? (
          <Marker
            coordinate={initRegion}
            draggable
            onDragEnd={coor => handleDragMarker(coor)}>
            <View style={styles.marker}>
              <Image
                source={require('../../assets/images/markerIcon.png')}
                style={styles.imgMarker}
              />
            </View>
          </Marker>
        ) : (
          <>
            <Circle
              center={initRegion}
              radius={1500}
              strokeWidth={0}
              fillColor={COLORS.circleOverlay}
            />
            <Circle
              center={initRegion}
              radius={10}
              strokeColor={COLORS.primary}
              strokeWidth={0}
              fillColor={COLORS.tertiary}
            />
          </>
        )}
      </MapView>
    </>
  );
};

export default EZMapView;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgMarker: {
    width: 32,
    height: 46,
  },
});
