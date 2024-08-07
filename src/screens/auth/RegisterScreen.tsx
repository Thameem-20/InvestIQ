import { View, Text, ActivityIndicator, Dimensions, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TextInput } from 'react-native-gesture-handler';
import Button from '@/src/components/Button';
import Breaker from '@/src/components/Breaker';
import ButtonOutline from '@/src/components/ButtonOutline';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { supabase } from '@/lib/supabase';
import { useUserStore } from '@/store/useUserStore';

const { height } = Dimensions.get('window');

  const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp<AuthNavigationType>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setSession } = useUserStore();

  const signUpWithEmail = async () => {
    setIsLoading(true);

    try {
      const { data: { session }, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Registered successfully');
        setSession(session);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className='flex-1'>
      <StatusBar style="auto" />
      {isLoading && (
        <View className='absolute w-full h-full justify-start items-center z-50'>
          <View className='bg-black w-full h-full justify-center items-center opacity-[0.45]'>
            <View className='absolute'>
              <ActivityIndicator size='large' color='white' />
            </View>
          </View>
        </View>
      )}
      <View className='justify-center items-center flex-1 relative'>
        <View className='justify-center w-full px-2 space-y-4' style={{ height: height * 0.75 }}>
          <Animated.View entering={FadeInDown.duration(100).springify()} className='justify-center items-center'>
            <Text className='text-neutral-800 text-2xl leading-[60px]' style={{ fontFamily: 'PlusJakartaSans-Bold' }}>
              Register to join us
            </Text>
            <Text className='text-neutral-500 text-sm font-medium' style={{ fontFamily: 'PlusJakartaSans-Bold' }}>
              Welcome, Please enter your details
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(100).delay(200).springify()} className='py-8 px-2 space-y-8'>
            <View className='border-2 border-gray-400 rounded-lg'>
              <TextInput
                className='p-2'
                placeholder='Email'
                onChangeText={setEmail}
                value={email}
                autoCapitalize='none'
                keyboardType='email-address'
              />
            </View>
            <View className='border-2 border-gray-400 rounded-lg'>
              <TextInput
                className='p-2'
                placeholder='Password'
                onChangeText={setPassword}
                value={password}
                autoCapitalize='none'
                secureTextEntry
              />
            </View>
          </Animated.View>
          <Animated.View entering={FadeInDown.duration(100).delay(300).springify()} className='w-full justify-start'>
            <View className='p-2 mt-[-30px]'>
              <Button title='Register' action={signUpWithEmail} />
            </View>
          </Animated.View>
          <View className='ml-4'>
            <Breaker />
          </View>
          <View className='w-full justify-start'>
            <Animated.View entering={FadeInDown.duration(100).delay(600).springify()} className='px-2 py-2'>
              <ButtonOutline title='Continue with Google'>
                <AntDesign name='google' size={30} color='grey' />
              </ButtonOutline>
            </Animated.View>
            <Animated.View entering={FadeInDown.duration(100).delay(600).springify()} className='px-2 py-2'>
              <ButtonOutline title='Continue with Apple'>
                <AntDesign name='apple1' size={30} color='grey' />
              </ButtonOutline>
            </Animated.View>
          </View>
          <Animated.View entering={FadeInDown.duration(100).delay(700).springify()} className='flex-row justify-center items-center'>
            <Text className='text-neutral-600 text-lg text-center leading-[30px] font-medium' style={{ fontFamily: 'PlusJakartaSans-Medium' }}>
              Have an account?{' '}
            </Text>
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text className='text-neutral-800 text-lg text-center leading-[30px] font-medium' style={{ fontFamily: 'PlusJakartaSans-Bold' }}>
                Login{' '}
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
