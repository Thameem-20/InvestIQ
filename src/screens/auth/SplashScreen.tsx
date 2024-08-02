import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from 'nativewind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthNavigationType } from '@/types/navigation';

const SplashScreen = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  
  const { navigate }: NavigationProp<AuthNavigationType> = useNavigation();

  const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  useEffect(() => {
    setTimeout(() => {
      navigate('Welcome');
    }, 3000);
  }, [navigate]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-[#FCF8F3]">
      <StatusBar style="auto" />
      <View className="w-full px-4 items-center">
        <Animated.View
          className="flex-row justify-center items-center"
          entering={FadeInRight.duration(100).springify()}
        >
          <View className="pr-2">
            <View className="w-20 h-20 overflow-hidden">
              <Image
                source={require('../../../assets/images/logo.png')}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                className="w-20 h-20 flex-1"
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          className="flex-row justify-center items-center"
          entering={FadeInRight.duration(100).delay(200).springify()}
        >
          <Text
            className="text-neutral-600 text-xl leading-[40px] pl-1"
            style={{
              fontFamily: 'PlusJakartaSans-ExtraBold',
            }}
          >
            INVEST
          </Text>
          <Text className="text-[#00aa48] text-xl leading-[40px] pl-1" style={{
              fontFamily: 'PlusJakartaSans-ExtraBold',
            }}>
            IQ
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

