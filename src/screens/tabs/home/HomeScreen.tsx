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

const HomeScreen: React.FC = () => {
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

  const renderItem: React.FC<{ item: Coin; index: number }> = ({
    item,
    index,
  }) => {
    return (
      <Pressable className="flex-row items-center py-4  px-4 w-full ">
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
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="relative mt-2">
        {/* header */}
        <View className="w-full flex-row justify-between items-center px-4">
          <View className="w-3/4 flex-row space-x-2">
            <View className="justify-center items-center">
              <View className="w-12 h-12 overflow-hidden rounded-2xl">
                <Avatar url={avatarUrl} size={50} onUpload={() => {}} />
              </View>
            </View>
            <View>
              <Text className="text-lg font-bold">
                Hi,{username ? username : "user"}
              </Text>
              <Text className="text-sm text-neutral-500">Have a good day</Text>
            </View>
          </View>
          <View className="py-6">
            <View className="p-1 bg-neutral-600 rounded-lg">
              <Ionicons name="menu" size={24} color="white" />
            </View>
          </View>
        </View>

        {/* BALANCE */}
        <View className="m-4 bg-neutral-800 overflow-hidden rounded-[34px]">
          <View className="justify-center items-center py-6 bg-[#0Df69e] rounded-[34px]">
            <Text className="text-sm font-medium text-neutral-700">
              Total Balance
            </Text>
            <Text className="text-3xl font-extrabold ">$2,460.00</Text>
          </View>
          <View className="flex-row justify-between items-center p-4">
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 rounded-full bg-[#3b363f] p-2 overflow-hidden">
                <Image
                  source={require("../../../../assets/images/money-send.png")}
                  style={{ width: "100%", height: "100%" }}
                />
              </View>
              <Text className="text-white">Send to</Text>
            </View>
            {/* REQUEST  */}
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 rounded-full bg-[#3b363f] p-2 overflow-hidden">
                <Image
                  source={require("../../../../assets/images/money-receive.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">Request</Text>
            </View>
            {/* TOP UP  */}
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 rounded-full bg-[#3b363f] p-2 overflow-hidden">
                <Image
                  source={require("../../../../assets/images/card-add.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">Top Up</Text>
            </View>
            {/* more */}
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 rounded-full bg-[#3b363f] p-2 overflow-hidden">
                <Image
                  source={require("../../../../assets/images/more.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">More</Text>
            </View>
            <View className="w-1/4 justify-center items-center space-y-2">
              <View className="w-10 h-10 rounded-full bg-[#3b363f] p-2 overflow-hidden">
                <Image
                  source={require("../../../../assets/images/money-send.png")}
                  placeholder={blurhash}
                  contentFit="cover"
                  transition={1000}
                  className="w-full h-full flex-1"
                />
              </View>
              <Text className="text-white">Send to</Text>
            </View>
          </View>
        </View>
        {/* COINS  */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
