import {Linking} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

export const getCurrentLocation = () => {
  let longitude;
  let latitude;
  Geolocation.getCurrentPosition(
    position => {
      longitude = JSON.stringify(position.coords.longitude);
      latitude = JSON.stringify(position.coords.latitude);
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
  return {latitude, longitude};
};

export const openGoogleMapsApp = (latitudeGo, longitudeGo) => {
  const {latitude, longitude} = getCurrentLocation();
  const coordinates = {latitude: latitudeGo, longitude: longitudeGo};
  const address = {
    saddr: `${latitude},${longitude}`,
    daddr: `${coordinates?.latitude},${coordinates?.longitude}`,
  };
  Linking.openURL(
    `http://maps.google.com/?saddr=${address.saddr}&daddr=${address.daddr}`,
  );
};
