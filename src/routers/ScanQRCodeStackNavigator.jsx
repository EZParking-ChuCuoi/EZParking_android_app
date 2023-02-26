import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScanQRCode from '../views/scanQRcode/ScanQRCode';
import ScanHistory from '../views/scanQRcode/ScanHistory';
import { bgDefault, colorDefault, FONTSIZE } from '../assets/styles/styles';

const ScanQRCodetackNavigators = () => {
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  const ScanQRCodeStack = createNativeStackNavigator();
  return (
    <ScanQRCodeStack.Navigator>
      <ScanQRCodeStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_left',
        }}>
        <ScanQRCodeStack.Screen name="scanner" component={ScanQRCode} />
      </ScanQRCodeStack.Group>
      <ScanQRCodeStack.Group
        screenOptions={{
          headerTintColor: COLOR,
          headerStyle: {backgroundColor: BG},
          headerTitleStyle: {fontSize: FONTSIZE.quiteLarge},
        }}>
        <ScanQRCodeStack.Screen name="qrcodeHistory" component={ScanHistory} options={{title: 'Scan history'}} />
      </ScanQRCodeStack.Group>
    </ScanQRCodeStack.Navigator>
  );
};

export default ScanQRCodetackNavigators;
