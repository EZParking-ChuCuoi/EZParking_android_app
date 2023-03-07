import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  bgDefault,
  colorDefault,
  COLORS,
  FONTSIZE,
} from '../assets/styles/styles';
import Account from '../views/account/Account';
import EditAccount from '../views/account/EditAccount';
import ChatSetting from '../views/account/ChatSetting';
import PaymentSetting from '../views/account/PaymentSetting';
import Subcriptions from '../views/account/Subcriptions';
import FAQ from '../views/account/FAQ';
import QrcodeSetting from '../views/account/QrcodeSetting';
import SpaceOwnerStackNavigators from './SpaceOwnerStackNavigator';
import BookingHistory from '../views/account/BookingHistory';

const AccountStack = createNativeStackNavigator();
const AccountStackNavigators = () => {
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  return (
    <AccountStack.Navigator>
      <AccountStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'flip',
        }}>
        <AccountStack.Screen name="profile" component={Account} />
        <AccountStack.Screen name="spaceOwner" component={SpaceOwnerStackNavigators} />
      </AccountStack.Group>
      <AccountStack.Group
        screenOptions={{
          headerTintColor: COLOR,
          headerStyle: {backgroundColor: BG},
          headerTitleStyle: {fontSize: FONTSIZE.quiteLarge},
        }}>
        <AccountStack.Screen
          name="editAccount"
          component={EditAccount}
          options={{title: 'Edit account'}}
        />
        <AccountStack.Screen
          name="bookingHistory"
          component={BookingHistory}
          options={{title: 'Booking history'}}
        />
        <AccountStack.Screen
          name="chatSetting"
          component={ChatSetting}
          options={{title: 'Chat setting setting'}}
        />
        <AccountStack.Screen
          name="paymentSetting"
          component={PaymentSetting}
          options={{title: 'Payment setting'}}
        />
        <AccountStack.Screen
          name="subcriptions"
          component={Subcriptions}
          options={{title: 'Subcriptions'}}
        />
        <AccountStack.Screen
          name="FAQ"
          component={FAQ}
          options={{title: 'FAQ'}}
        />
        <AccountStack.Screen
          name="qrcodeSetting"
          component={QrcodeSetting}
          options={{title: 'QR code setting'}}
        />
      </AccountStack.Group>
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigators;
