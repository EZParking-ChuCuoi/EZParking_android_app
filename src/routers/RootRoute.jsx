import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStackNavigators from './AuthStackNavigators';
import SplashScreen from 'react-native-splash-screen';
import {COLORS} from '../assets/styles/styles';
import BottomTab from './BottomTabs';

const RootRoute = () => {
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
        <Stack.Screen name="bottomTab" component={BottomTab}/>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default RootRoute;
