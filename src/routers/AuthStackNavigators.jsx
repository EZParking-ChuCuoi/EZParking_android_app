import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../views/auth/Login';
import {COLORS} from '../assets/styles/styles';
import Register from '../views/auth/Register';
import Forgot from '../views/auth/Forgot';

const AuthStackNavigators = () => {
  const AuthStack = createNativeStackNavigator();
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
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigators;
