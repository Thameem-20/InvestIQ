import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';
import MarketNavigation from './MarketNavigation';
import SearchNavigation from './SearchNavigation';
import NewsNavigation from './NewsNavigation';
import ProfileNavigation from './ProfileNavigation';
import { TransitionPresets }from "@react-navigation/stack"
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown:false,
      tabBarIcon : ({ focused }) => {
        let iconName: keyof typeof Ionicons.glyphMap | undefined;
        if(route.name === 'Home'){
          iconName ="home"
        }else if(route.name === 'Market'){
          iconName = 'stats-chart-outline'
        }else if(route.name === 'Search'){
          iconName = 'search-outline'
        }
        else if(route.name === 'News'){
          iconName = 'newspaper-outline'
        }
        else if(route.name === 'Profile'){
          iconName = 'person-outline'
        }

        const customizeSize =25;
        return (
          <Ionicons 
          name={ iconName }
          size = {customizeSize}
          color={(focused ? '#2ab07c' :"gray" )}
          />
        )
      },
      tabBarActiveTintColor:'#2ab07c',
      tabBarInactiveTintColor:'gray',
      tabBarLabelStyle:{
        fontSize:12,
        fontWeight:"bold",
      },
      ...TransitionPresets.SlideFromRightIOS, // Applying the slide transition preset
      animationEnabled: true, // Enabling animations
      gestureEnabled: true, // Enabling gestures
      gestureDirection: 'horizontal', // Setting the gesture direction
    })}
    >
      <Tab.Screen name='Home' component={HomeNavigation}/>
      <Tab.Screen name='Market' component={MarketNavigation}/>
      <Tab.Screen name='Search' component={SearchNavigation}/>
      <Tab.Screen name='News' component={NewsNavigation}/>
      <Tab.Screen name='Profile' component={ProfileNavigation}/>
    </Tab.Navigator>
  );
}



export default TabNavigation;

