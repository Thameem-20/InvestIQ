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
    <View className="flex-1 bg-white">
      
      <View>

        {/*avatar*/}
        <View className="border justify-center items-center py-14 pb-20 bg-[#2ab07c]">
          
        </View>
        
      </View>
      <text>ProfileScreen</text>

    </View>

  )
}

export default ProfileScreen