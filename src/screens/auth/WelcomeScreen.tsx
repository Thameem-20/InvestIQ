import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown } from 'react-native-reanimated';
import Button from '@/src/components/Button';
import ButtonOutline from '@/src/components/ButtonOutline';
import Breaker from '@/src/components/Breaker';


const WelcomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 justify-between  items-center bg-[#FCF8F3]'>
      <StatusBar style="auto"/>
    <View className='w-full h-full px-4 items-center justify-center space-y-6'>
      <View className='justify-center items-center'>
          <Animated.Text
          entering={FadeInDown.duration(100).delay(200).springify()}
          className='text-neutral-800 text-3xl font-medium leading-[60px]' style={{
            fontFamily:"PlusJakartaSans-Bold"
          }}>
            Welcome To,INVEST IQ
          </Animated.Text>
     </View>
     <View className='justify-start w-full'>
      <Animated.View 
      entering={FadeInDown.duration(100).delay(300).springify()}
      className='pb-6'
      >
        <Button title={"Login"} />
      </Animated.View>
      <Animated.View 
      entering={FadeInDown.duration(100).delay(300).springify()}
      className='pb-6'
      >
        <ButtonOutline title="Sign Up" />
      </Animated.View>
     </View>
     <View>
        <Breaker />
     </View>
    </View>
  </SafeAreaView>
  )
}

export default WelcomeScreen