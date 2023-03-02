import {PermissionsAndroid, Platform} from 'react-native';

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

export const hasStorePermission = async () => {
  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
};
