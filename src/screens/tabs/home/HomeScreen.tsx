import { Text, View , Image} from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Avatar from '@/src/components/Avatar'
import useSupabaseAuth from '@/hooks/useSupabaseAuth'
import { useFocusEffect } from '@react-navigation/native'
import { useUserStore } from '@/store/useUserStore'
import { Ionicons } from '@expo/vector-icons'



const HomeScreen = () => {
  const [avatarUrl,setAvatarUrl]= useState("")
  const [username , setUsername]= useState(" ")
  const [loading ,setLoading]= useState(false)
  const {getUserProfile} = useSupabaseAuth();
  const { session } = useUserStore()

  async function handleGetProfile(){
    setLoading(true)
    try {
      const { data,error,status } = await getUserProfile();
      if(error && status !== 406){
        console.log("error here "+ data);
        setLoading(false)
        throw error
      }
      if(data){
        setUsername(data.username),
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  useFocusEffect( 
    useCallback( () =>{
      if(session){
        handleGetProfile()
      }
    },[session])
  )
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className='relative mt-2'>
          {/* header  */}
          <View className=' w-full flex-row justify-between items-center px-4'>
           <View className='w-3/4 flex-row space-x-2'>
           <View className='justify-center items-center'>
            <View className=' w-12 h-12 overflow-hidden rounded-2xl '>
              <Avatar url={avatarUrl} size={50}  onUpload={() => { }} />
            </View>
           </View>
           <View>
              <Text className='text-lg font-bold'>
                Hi,{username ? username: "user"}
              </Text>
              <Text className='text-sm text-neutral-500'>Have a good day</Text>
           </View>

           </View>
           <View className='py-6'>
              <View className='p-1 bg-neutral-600 rounded-lg'>
                    <Ionicons name='menu' size={24} color='white' />
              </View>
           </View>
          </View>

          {/* BALANCE */}
      <View className='m-4 bg-neutral-800 overflow-hidden rounded-[34px]'>
        <View className='justify-center items-center py-6 bg-[#0Df69e] rounded-[34px]'>
           <Text className='text-sm font-medium text-neutral-700'>Total Balance</Text>
           <Text className='text-3xl font-extrabold '>$2,460.00</Text>
        </View>
        <View className='flex-row justify-between items-center p-4'>
          <View className='w-1/4 justify-center items-center space-y-2'>
              <View className='w-10 h-10 rounded-full bg-[#3b363f] p-2 overflow-hidden'>
                <Image
                    source={require('../../../../assets/images/money-send.png')}
                    style={{ width: '100%', height: '100%' }}
                />
              </View>
              <Text className='text-white'>Send to</Text>
          </View>
        </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

