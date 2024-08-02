import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import SearchScreen from '../../tabs/search/SearchScreen';

const SearchNavigation = () => {
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
      <Stack.Screen name='SearchS' component={SearchScreen} />
    </Stack.Navigator>
  )
}

export default SearchNavigation