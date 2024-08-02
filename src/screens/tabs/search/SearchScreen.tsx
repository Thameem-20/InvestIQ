import { View, Text, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {  HomeStackParamList, SearchNavigationType } from '@/types/navigation';
import { SearchCoin } from '@/utils/cryptoApi';
import { debounce } from "lodash"
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import { XMarkIcon } from 'react-native-heroicons/outline'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Image } from 'expo-image';
import numeral from 'numeral';
const SearchScreen = () => {
    interface Coin {
        uuid: string;
        name: string;
        symbol: string;
        iconUrl: string;
        price: string;
        change: number;
        marketCap: string;
      }

      const blurhash =
      "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

      
      const [loading ,setLoading] = useState(false)
      const [results , setResults ] = useState<any>([])
      console.log('====================================');
      console.log(results);
      console.log('====================================');
  const {navigate} = useNavigation<NavigationProp<SearchNavigationType>>()
  const {navigate:navigateHome} = useNavigation<NavigationProp<HomeStackParamList>>()


  const handelSearch = async (search:string) => {
    if(search && search.length>3){
        setLoading(true)

        try {
            const results = await SearchCoin(search);
            console.log("result   ===" +results);
            
            if(results){
                setResults(results)
            }
        } catch (error) {
            console.log(error);
            setResults([])
        }finally{
            setLoading(false)
        }
    }
}

 // Define renderItem function
 const renderItem = ({
    item,
    index,
  }: {
    item: Coin;
    index: number;
  }) => (
    <Pressable className="flex-row items-center py-4 w-full"
    onPress={() => navigateHome('coinDetail', { CoinUuid: item.uuid })}
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

const handelTextDebounce = useCallback(debounce(handelSearch,400),[])
  return (
    <SafeAreaView className='bg-white flex-1 '>
        {/* Header  */}
        <View className='w-full flex-row justify-between items-center px-4 py-4'>
        <View className="flex-row justify-start items-center space-x-2">
                <Text className="font-bold text-3xl">Search</Text>
            </View>
        </View>
        {/* search field  */}

        <View className='mx-4 mb-4 flex-row p-2 border-2 justify-between items-center bg-white rounded-lg shadow-sm '>
            <TextInput
            placeholder='Search for your coins'
            className='pl-2 flex-1 font-medium text-black tracking-wider'   
            onChangeText={handelTextDebounce}        
            />
            <Pressable onPress={()=> navigateHome("homeS")}>
                <XMarkIcon size='25' color='black' />
            </Pressable>
        </View>
        <View className='m-4'>
            {
                loading ? (
                    <ActivityIndicator size='large' color='black'/>
                ):(
                    <FlatList 
                    data= {results?.data?.coin}
                    keyExtractor={(item) =>item.uuid}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator
                    />
                )
            }
        </View>
    </SafeAreaView>
  )
}

export default SearchScreen