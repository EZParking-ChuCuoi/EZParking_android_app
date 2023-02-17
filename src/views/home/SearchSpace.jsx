import {
  StyleSheet,
  Text,
  View,
  Linking,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useNavigation} from '@react-navigation/native';
import {EZButtonBack} from '../../components/core/EZButton';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import EZInput from '../../components/core/EZInput';
import {bgDefault, COLORS, FONTSIZE} from '../../assets/styles/styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import { useHideTabBar } from '../../hooks/useHideTabBar';

const INITIAL_REGION = {
  latitude: 16.073403,
  longitude: 108.231151,
  latitudeDelta: 0.04,
  longitudeDelta: 0.025,
};

const MARKER_DATA = [
  {
    title: 'Store 1',
    description: 'PNJ store',
    coordinate: {latitude: 16.067757, longitude: 108.230098},
  },
  {
    title: 'Store 2',
    description: 'FPT store',
    coordinate: {latitude: 16.074139, longitude: 108.231343},
  },
];

const SearchSpace = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {BG} = bgDefault();
  const navigation = useNavigation();

  const [search, setSearch] = useState('');

  useHideTabBar();

  const openGoogleMapsApp = () => {
    // This function will open ggMap and gui redirecing

    // current region
    const currentRegion = {latitude: 16.073796, longitude: 108.233898};

    // expected region wanna go
    const coordinates = {latitude: 16.069231, longitude: 108.233103};

    const address = {
      saddr: `${currentRegion?.latitude},${currentRegion?.longitude}`,
      daddr: `${coordinates?.latitude},${coordinates?.longitude}`,
    };

    Linking.openURL(
      `http://maps.google.com/?saddr=${address.saddr}&daddr=${address.daddr}`,
    );
  };

  return (
    <EZContainer bgEZStatusBar="transparent" translucent>
      <EZButtonBack styleEZButtonBack={{top: 55}} />
      <EZInput
        placeholder="Where do you want to go?"
        iconName="send"
        autoFocus
        styleEZInput={{
          position: 'absolute',
          top: 40,
          zIndex: 10,
          right: 15,
          width: '80%',
        }}
        styleEZInputField={{backgroundColor: BG}}
        onChangeText={newText => setSearch(newText)}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        userInterfaceStyle={isDarkMode ? 'dark' : 'light'}
        region={INITIAL_REGION}>
        {MARKER_DATA.map(item => {
          return (
            <Marker
              key={item.title}
              title={item.title}
              description={item.description}
              coordinate={item.coordinate}
              onPress={() => {
                console.log('pressed marker');
              }}>
              <View style={styles.marker}>
                <EZText
                  color={COLORS.secondary}
                  bold
                  size="quiteLarge"
                  styleEZText={styles.markerP}>
                  P
                </EZText>
                <EZText styleEZText={styles.label} color={COLORS.primary}>{item.title}</EZText>
              </View>
            </Marker>
          );
        })}
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
  markerP:  {
    paddingHorizontal: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    marginBottom: 10,
  }
});
