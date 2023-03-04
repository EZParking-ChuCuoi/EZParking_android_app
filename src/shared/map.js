import {Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {getDataObj} from './asyncStorages';

export const openGoogleMapsApp = async (latitudeGo, longitudeGo) => {
  const coordinate = await getDataObj('EZCurrentRegion');
  const latitude = coordinate.latitude;
  const longitude = coordinate.longitude;
  const coordinates = {latitude: latitudeGo, longitude: longitudeGo};
  const address = {
    saddr: `${latitude},${longitude}`,
    daddr: `${coordinates?.latitude},${coordinates?.longitude}`,
  };
  Linking.openURL(
    `http://maps.google.com/?saddr=${address.saddr}&daddr=${address.daddr}`,
  );
};
