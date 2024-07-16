import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../auth/SplashScreen.tsx';
import WelcomeScreen from '../auth/WelcomeScreen.tsx'; // Corrected file extension
import LoginScreen from '../auth/LoginScreen.tsx';
import RegisterScreen from '../auth/RegisterScreen.tsx';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
