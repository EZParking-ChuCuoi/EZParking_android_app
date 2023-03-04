import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  bgDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../assets/styles/styles';
import CreateLot from '../views/spaceOwner/CreateLot';
import Dasboard from '../views/spaceOwner/Dasboard';
import LotDetail from '../views/spaceOwner/LotDetail';

const SpaceOwnerStack = createNativeStackNavigator();
const SpaceOwnerStackNavigators = () => {
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  return (
    <SpaceOwnerStack.Navigator>
      <SpaceOwnerStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'flip',
        }}>
        <SpaceOwnerStack.Screen name="dashboard" component={Dasboard} />
        <SpaceOwnerStack.Screen name="createLot" component={CreateLot} />
        <SpaceOwnerStack.Screen name="lotDetail" component={LotDetail} />
      </SpaceOwnerStack.Group>
      <SpaceOwnerStack.Group
        screenOptions={{
          headerTintColor: COLOR,
          headerStyle: {backgroundColor: BG},
          headerTitleStyle: {fontSize: FONTSIZE.quiteLarge},
        }}></SpaceOwnerStack.Group>
    </SpaceOwnerStack.Navigator>
  );
};

export default SpaceOwnerStackNavigators;
