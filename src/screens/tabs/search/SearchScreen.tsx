import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {  SearchNavigationType } from '@/types/navigation';
import { SearchCoin } from '@/utils/cryptoApi';

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
      const [results , setResults ] = useState([])

  const navigation = useNavigation<NavigationProp<SearchNavigationType>>()


  const handelSearch = async (search:string) => {
    if(search && search.length>3){
        setLoading(true)

        try {
            const results = await SearchCoin(search);
            if(results){
                setResults(results)
            }
        } catch (error) {
            console.log();
            setResults([])
        }finally{
            setLoading(false)
        }
    }
}
  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}

export default SearchScreen