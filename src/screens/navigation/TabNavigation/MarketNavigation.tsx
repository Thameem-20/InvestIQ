import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import MarketScreen from '../../tabs/market/MarketScreen';

const MarketNavigation = () => {
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
      <Stack.Screen name='MarketS' component={MarketScreen} />
    </Stack.Navigator>
  )
}

export default MarketNavigation