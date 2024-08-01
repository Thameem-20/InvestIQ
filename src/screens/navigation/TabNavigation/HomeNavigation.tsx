import { View, Text } from 'react-native'
import React from 'react'
import { TransitionPresets,createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../../tabs/home/HomeScreen';
import CoinDetailScreen from '../../stacks/CoinDetailScreen';

const HomeNavigation = () => {
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
      <Stack.Screen name='homeS' component={HomeScreen} />
      <Stack.Screen name='coin' component={CoinDetailScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation