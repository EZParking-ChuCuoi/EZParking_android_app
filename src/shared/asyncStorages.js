import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.log('errStore', e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    } else {
      return '';
    }
  } catch (e) {
    console.log('error: ' + e);
  }
};
