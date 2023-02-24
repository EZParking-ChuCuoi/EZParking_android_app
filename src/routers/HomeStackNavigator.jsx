import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  bgDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../assets/styles/styles';
import Home from '../views/home/Home';
import SearchSpace from '../views/home/SearchSpace';
import SpaceDetail from '../views/home/SpaceDetail';
import Reviews from '../views/home/Reviews';
import BookingParkingLot from '../views/home/BookingParkingLot';

const HomeStack = createNativeStackNavigator();
const HomeStackNavigators = () => {
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  return (
    <HomeStack.Navigator>
      <HomeStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'flip',
        }}>
        <HomeStack.Screen name="home" component={Home} />
        <HomeStack.Screen name="search" component={SearchSpace} />
      </HomeStack.Group>
      <HomeStack.Group
        screenOptions={{
          headerTintColor: COLOR,
          headerStyle: {backgroundColor: BG},
          headerTitleStyle: {fontSize: FONTSIZE.quiteLarge},
        }}>
        <HomeStack.Screen name="spaceDetail" component={SpaceDetail} />
        <HomeStack.Screen name="reviews" component={Reviews} options={{title: 'Reviews'}} />
        <HomeStack.Screen name="booking" component={BookingParkingLot} options={{title: 'Booking'}} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigators;
