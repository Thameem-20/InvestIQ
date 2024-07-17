import { View, Text } from 'react-native'
import React from 'react'
import Animated ,{ FadeInRight } from 'react-native-reanimated'
const Breaker = () => {
  return (
    <Animated.View
    entering={FadeInRight.duration(100).delay(500).springify()}
    className='w-full flex-row'
    >
      <View className='h-10 w-[40%] justify-center items-center'>
        <View className='border-t-2 border-neutral-400 w-full'></View>
      </View>

    <View className='w-20% justify-center items-center'>
      <Text className='text-gray-500 text-base mx-4'>
        OR
      </Text>
    </View>

      <View className='h-10 w-[40%] justify-center items-center'>
        <View className='border-t-2 border-neutral-400 w-full'></View>
      </View>
    </Animated.View>
  )
}

export default Breaker