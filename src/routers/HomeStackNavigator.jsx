import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../assets/styles/styles';
import Home from '../views/home/Home';
import SearchSpace from '../views/home/SearchSpace';import SpaceDetail from '../views/home/SpaceDetail';

const HomeStack = createNativeStackNavigator();
const HomeStackNavigators = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'flip',
        }}>
        <HomeStack.Screen name="home" component={Home} />
        <HomeStack.Screen name="search" component={SearchSpace} />
        <HomeStack.Screen name="spaceDetail" component={SpaceDetail} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigators;
