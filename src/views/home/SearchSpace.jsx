import {
  StyleSheet,
  Text,
  View,
  Linking,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  useColorScheme,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import EZContainer from '../../components/core/EZContainer';
import EZText from '../../components/core/EZText';
import {useNavigation} from '@react-navigation/native';
import {EZButtonBack} from '../../components/core/EZButton';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import EZInput from '../../components/core/EZInput';
import {bgDefault, COLORS, FONTSIZE} from '../../assets/styles/styles';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {useHideTabBar} from '../../hooks/useHideTabBar';
import MarkerItem from '../../components/home/MarkerItem';
import {getDataObj} from '../../shared/asyncStorages';
import {
  UseGetAllParkingLot,
  useGetNearlyParkingLot,
} from '../../hooks/api/getParkingLots';

const SearchSpace = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const {BG} = bgDefault();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const mutationNearlyPark = useGetNearlyParkingLot();
  const {data, isLoading, isSuccess} = UseGetAllParkingLot();
  const refRBSheet = useRef();
  const [currenRegion, setCurrenRegion] = useState(undefined);
  console.log('LOADINGGGGGGGGGGGGGGGGGGGGGGGGG');
  const MARKER_DATA = [
    {
      nameParkingLot: 'Store 1',
      desc: 'PNJ store',
      address_latitude: 16.067757,
      address_longitude: 108.230098,
      image:
        'https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg',
      id: 1,
    },
    {
      nameParkingLot: 'Store 2',
      desc: 'FPT store',
      address_latitude: 16.074139,
      address_longitude: 108.231343,
      image:
        'https://thumbs.dreamstime.com/b/tree-field-orange-sky-14335903.jpg',
      id: 2,
    },
  ];

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
  useHideTabBar();
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
        region={currenRegion}>
        {mutationNearlyPark.isSuccess &&
          mutationNearlyPark.data.map(item => {
            return <MarkerItem key={item.id} item={item} />;
          })}
        {currenRegion !== undefined && (
          <Circle
            center={currenRegion}
            radius={1500}
            strokeColor={COLORS.secondary}
            strokeWidth={2}
            fillColor={COLORS.circleOverlay}
          />
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
