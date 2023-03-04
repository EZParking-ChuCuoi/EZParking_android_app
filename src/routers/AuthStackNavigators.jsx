import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/auth/Login';
import {bgDefault, colorDefault, COLORS, FONTSIZE} from '../assets/styles/styles';
import Register from '../views/auth/Register';
import Forgot from '../views/auth/Forgot';
import RegisterSpaceOwner from '../views/auth/RegisterSpaceOwner';

const AuthStackNavigators = () => {
  const AuthStack = createNativeStackNavigator();
  const {COLOR} = colorDefault();
  const {BG} = bgDefault();
  return (
    <AuthStack.Navigator>
      <AuthStack.Group
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_left',
        }}>
        <AuthStack.Screen name="login" component={Login} />
        <AuthStack.Screen name="register" component={Register} />
        <AuthStack.Screen name="forgot" component={Forgot} />
        <AuthStack.Screen
          name="registerSpaceOwner"
          component={RegisterSpaceOwner}
          options={{
            headerShown: true,
            headerTintColor: COLOR,
            headerStyle: {backgroundColor: BG},
            headerTitleStyle: {fontSize: FONTSIZE.quiteLarge,},
            title: 'Register space owner'
          }}
        />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigators;
