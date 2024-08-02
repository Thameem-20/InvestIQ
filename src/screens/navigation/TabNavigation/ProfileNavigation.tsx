import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import ProfileScreen from '../../tabs/profile/ProfileScreen';

const ProfileNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
      animationEnabled:true,
      gestureEnabled:true,
      gestureDirection:'horizontal'
      }}
    >
      <Stack.Screen name='MarketS' component={ProfileScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigation