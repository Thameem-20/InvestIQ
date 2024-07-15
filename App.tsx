import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'

const App = () => {
  const [session,setSession] = useState();
  return (
    <View className="bg-orange-500 flex-1 justify-center items-center ">
      <Text className='color-white text-3xl font-semibold'>Muskan </Text>
    </View>
  )
}

export default App