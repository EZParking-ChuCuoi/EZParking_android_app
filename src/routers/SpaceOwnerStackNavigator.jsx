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
import {useHideTabBar} from '../hooks/useHideTabBar';
import CreateBlockAndSlot from '../views/spaceOwner/CreateBlockAndSlot';
import BlockDetail from '../views/spaceOwner/BlockDetail';

const SpaceOwnerStack = createNativeStackNavigator();
const SpaceOwnerStackNavigators = () => {
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  useHideTabBar();
  return (
    <SpaceOwnerStack.Navigator>
      <SpaceOwnerStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'flip',
        }}>
        <SpaceOwnerStack.Screen name="dashboard" component={Dasboard} />
      </SpaceOwnerStack.Group>
      <SpaceOwnerStack.Group
        screenOptions={{
          headerTintColor: COLOR,
          headerStyle: {backgroundColor: BG},
          headerTitleStyle: {fontSize: FONTSIZE.quiteLarge},
        }}>
        <SpaceOwnerStack.Screen
          name="createLot"
          component={CreateLot}
          options={{title: 'Create lot'}}
        />
        <SpaceOwnerStack.Screen
          name="createBlock"
          component={CreateBlockAndSlot}
          options={{title: 'Create blocks and slots'}}
        />
        <SpaceOwnerStack.Screen
          name="lotDetail"
          component={LotDetail}
          options={{title: 'Parking lot detail'}}
        />
        <SpaceOwnerStack.Screen
          name="blockDetail"
          component={BlockDetail}
          options={{title: 'Block detail'}}
        />
      </SpaceOwnerStack.Group>
    </SpaceOwnerStack.Navigator>
  );
};

export default SpaceOwnerStackNavigators;
