import {PermissionsAndroid} from 'react-native';

export const requestLocationPermission = async () => {
  let result;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'EZParking',
        message: 'EZParking access to your location',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      result = true;
    } else {
      result = false;
    }
  } catch (err) {
    console.warn(err);
  }
  return result;
};
