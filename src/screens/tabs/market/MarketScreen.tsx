import {
    Text,
    View,
    Pressable,
    ScrollView,
    ActivityIndicator,
    FlatList,
  } from "react-native";
  import React, { useCallback, useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import numeral from "numeral";
  import Avatar from "@/src/components/Avatar";
  import useSupabaseAuth from "@/hooks/useSupabaseAuth";
  import { useFocusEffect } from "@react-navigation/native";
  import { useUserStore } from "@/store/useUserStore";
  import { Ionicons } from "@expo/vector-icons";
  import { useQuery } from "@tanstack/react-query";
  import { FetchAllCoin } from "../../../../utils/cryptoApi";
  import Animated, { FadeInDown } from "react-native-reanimated";
  import { Image } from "expo-image";
  import { useNavigation, NavigationProp } from '@react-navigation/native';
  import { HomeStackParamList } from "../../../../types/navigation";
  
  
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  
  interface Coin {
    uuid: string;
    name: string;
    symbol: string;
    iconUrl: string;
    price: string;
    change: number;
    marketCap: string;
  }
  const MarketScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<HomeStackParamList>>()
    const [avatarUrl, setAvatarUrl] = useState("");
    const [username, setUsername] = useState(" ");
    const [loading, setLoading] = useState(false);
    const { getUserProfile } = useSupabaseAuth();
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
  
    const { data: CoinsData, isLoading: isAllCoinsLoading } = useQuery({
      queryKey: ["allcoins"],
      queryFn: FetchAllCoin,
    });
  
    // Define renderItem function
    const renderItem = ({
      item,
      index,
    }: {
      item: Coin;
      index: number;
    }) => (
      <Pressable className="flex-row items-center py-4 w-full"
      // onPress={() => navigation.navigate('coinDetail', { CoinUuid: item.uuid })}
      >
        <Animated.View
          entering={FadeInDown.duration(100).delay(index * 200).springify()}
          className="w-full flex-row items-center"
        >
          <View className="w-[16%]">
            <View className="w-10 h-10">
              <Image
                source={{ uri: item.iconUrl }}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                className="w-full h-full flex-1"
              />
            </View>
          </View>
          <View className="w-[55%] justify-start items-start">
            <Text className="font-bold text-lg">{item.name}</Text>
            <View className="flex-row justify-center items-center space-x-2">
              <Text className="font-medium text-sm text-neutral-500">
                {numeral(parseFloat(item.price)).format("$0,0.00")}
              </Text>
              <Text
                className={`text-sm font-medium ${
                  item.change < 0
                    ? "text-rose-600"
                    : item.change > 0
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {item.change}%
              </Text>
            </View>
          </View>
          <View className="w-[29%] justify-start items-end">
            <Text className="font-bold text-base">{item.symbol}</Text>
            <View className="flex-row justify-center items-center space-x-2">
              <Text className="font-medium text-sm text-neutral-500">
                {item.marketCap.length > 9
                  ? item.marketCap.slice(0, 9)
                  : item.marketCap}
              </Text>
            </View>
          </View>
        </Animated.View>
      </Pressable>
    );
  
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="relative mt-2">
          {/* header */}
         <View className="flex-row justify-between items-center p-4">
            <View className="flex-row justify-start items-center space-x-2">
                <Text className="font-bold text-2xl">Market</Text>
            </View>
         </View>
          {/* COINS  */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            <View  className="px-4 py-4 items-center">
            {isAllCoinsLoading ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <FlatList
                nestedScrollEnabled={true}
                scrollEnabled={false}
                data={CoinsData.data.coins}
                keyExtractor={(item) => item.uuid}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
              />
            )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
  
  export default MarketScreen
  