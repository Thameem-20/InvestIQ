import { View, Text, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSupabaseAuth from "@/hooks/useSupabaseAuth";
import { useFocusEffect } from '@react-navigation/native';
import { useUserStore } from '@/store/useUserStore';
import { MaterialIcons } from '@expo/vector-icons';



  

const ProfileScreen = () => {
    const [loading, setLoading] = useState(false);
const { getUserProfile,signOut } = useSupabaseAuth();
const [avatarUrl, setAvatarUrl] = useState("");
const [username, setUsername] = useState(" ");
const { session } = useUserStore();

async function handleGetProfile() {  
    setLoading(true);
    try {
      const { data, error, status } = await getUserProfile();
      if (error && status !== 406) {
        console.log("error here " + data);
        setLoading(false);
        throw error;
      }
      if (data) {
        setUsername(data.username), setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


useFocusEffect(
    useCallback(() => {
      if (session) {
        handleGetProfile();
      }
    }, [session])
  );

  async function handelSignOut() {
    await signOut()
}

  return (
    <SafeAreaView>
        <View className=' p-2 py-3 bg-gray-300 rounded-xl border-2 border-neutral-500 my-5'>
            <Pressable className='flex-row justify-between items-center'
            onPress={() => handelSignOut()}
            >
                <View className='flex-row justify-center items-center space-x-2'>
                <View className='p-1 rounded-lg bg-[#2ab07c]'>
                        <MaterialIcons name='logout' size={24} color={'white'} />
                </View>
                <Text className='text-lg '>
                    Log Out
                </Text>
            </View>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

export default ProfileScreen