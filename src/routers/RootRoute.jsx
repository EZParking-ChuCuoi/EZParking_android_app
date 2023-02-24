import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigators from './AuthStackNavigators';
import SplashScreen from 'react-native-splash-screen';
import {COLORS} from '../assets/styles/styles';
import BottomTab from './BottomTabs';
import {useNavigation} from '@react-navigation/native';
import { getData } from '../shared/asyncStorages';
import { navigateAuthorized } from '../shared/auth';

const RootRoute = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const getToken = async () => {
      const token = await getData('EZToken');
      if (token.length !== 0) {
        navigateAuthorized(navigation);
      }
    };
    getToken();
  }, []);
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="auth" component={AuthStackNavigators} />
        <Stack.Screen name="bottomTab" component={BottomTab} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootRoute;
