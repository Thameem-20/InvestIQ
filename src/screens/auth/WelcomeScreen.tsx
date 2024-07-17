import { View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Animated, { FadeInDown } from 'react-native-reanimated';
import Button from '@/src/components/Button';
import ButtonOutline from '@/src/components/ButtonOutline';
import Breaker from '@/src/components/Breaker';
import { AntDesign } from '@expo/vector-icons';
import { Image } from 'expo-image';


const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const WelcomeScreen = () => {
  return (
    <SafeAreaView className='flex-1 justify-between  items-center bg-[#FCF8F3]'>
      <StatusBar style="auto"/>

    <View className='w-full px-4 items-center'>
      <Animated.View 
      entering={FadeInDown.duration(100).springify()}
      className='w-full justify-center items-center '
      >
        <View>
          <View className='h-40 w-40 overflow-hidden '>
               <Image
                source={require('../../../assets/images/logo.png')}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                className="w-40 h-40 flex-1 "
              />
          </View>
        </View>
      </Animated.View>
    </View>

    <View className='w-full h-full px-4 items-center justify-center space-y-6 mt-[-150px]'>
      <View className='justify-center items-center '>
          <Animated.Text
          entering={FadeInDown.duration(100).delay(200).springify()}
          className='text-neutral-800 text-3xl font-medium ' style={{
            fontFamily:"PlusJakartaSans-Bold"
          }}>
            Welcome
          </Animated.Text>
     </View>
     <View className='justify-start w-full '>
      <Animated.View 
      entering={FadeInDown.duration(100).delay(300).springify()}
      className='pb-6'
      >
        <Button title={"Login"} />
      </Animated.View>
      <Animated.View 
      entering={FadeInDown.duration(100).delay(300).springify()}
      >
        <ButtonOutline title="Sign Up" />
      </Animated.View>
     </View>

     <View>
        <Breaker />
     </View>


     <View className='w-full justify-start'>
          <Animated.View 
          entering={FadeInDown.duration(100).delay(600).springify()}
          className='border border-white pb-4 '
          >
                <ButtonOutline title="Continue with Google">
                  <AntDesign name='google' size={30} color="grey" />
                </ButtonOutline>
          </Animated.View>

          <Animated.View 
          entering={FadeInDown.duration(100).delay(600).springify()}
          className='border border-white pb-4'
          >
                <ButtonOutline title="Continue with Apple">
                <AntDesign name='apple1' size={30} color="grey" />
                </ButtonOutline>
          </Animated.View>

     </View>
    </View>
  </SafeAreaView>
  )
}

export default WelcomeScreen