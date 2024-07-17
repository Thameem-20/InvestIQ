import { View, Text } from 'react-native'
import React from 'react'
import Animated ,{ FadeInRight } from 'react-native-reanimated'
const Breaker = () => {
  return (
    <Animated.View
    entering={FadeInRight.duration(100).delay(500).springify()}
    className='w-ful flex-row'
    >
      <View className='h-10 w-[40%] bg-gray-400'></View>
      <Text>Breaker</Text>
    </Animated.View>
  )
}

export default Breaker