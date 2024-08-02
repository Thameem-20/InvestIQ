import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Pressable } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import numeral from 'numeral';
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import { Circle, useFont } from '@shopify/react-native-skia';
import Animated, { SharedValue } from 'react-native-reanimated';
import { FetchCoinDetails, FetchCoinHistory } from '@/utils/cryptoApi';

// Define the type for route parameters
type RootStackParamList = {
  CoinDetailScreen: { CoinUuid: string };
};

type CoinDetailScreenRouteProp = RouteProp<RootStackParamList, 'CoinDetailScreen'>;

const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

interface ToolTipProps {
  x: SharedValue<number>;
  y: SharedValue<number>;
}

const ToolTip: React.FC<ToolTipProps> = ({ x, y }) => {
  return <Circle cx={x} cy={y} r={8} color="red" />;
};

const CoinDetailScreen: React.FC = () => {
  const route = useRoute<CoinDetailScreenRouteProp>();
  const { CoinUuid } = route.params;

  const navigation = useNavigation();

  const [lineData, setLineData] = useState<any[]>([]);
  const [item, setItem] = useState<any>({});

  const { data: CoinsDetails, isLoading: CoinsDetailsLoading } = useQuery({
    queryKey: ['CoinsDetails', CoinUuid],
    queryFn: () => FetchCoinDetails(CoinUuid),
  });

  const { data: CoinsHistory, isLoading: CoinsHistoryLoading } = useQuery({
    queryKey: ['CoinsHistory', CoinUuid],
    queryFn: () => FetchCoinHistory(CoinUuid),
  });

  useEffect(() => {
    if (CoinsHistory?.data?.history) {
      const datasets = CoinsHistory.data.history.map((item: any) => ({
        price: parseFloat(item.price),
        timestamp: item.timestamp,
      }));
      setLineData(datasets);
    }
    if (CoinsDetails?.data?.coin) {
      setItem(CoinsDetails.data.coin);
    }
  }, [CoinsDetails, CoinsHistory]);

  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });

  const font = useFont(
    require("../../../assets/fonts/PlusJakartaSans-Regular.ttf"), 12
  );

  if (!font) {
    return <ActivityIndicator size="large" color="black" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {CoinsDetailsLoading || CoinsHistoryLoading ? (
        <View className="absolute w-full h-full z-50 justify-center items-center">
          <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]"></View>
          <View className="absolute">
            <ActivityIndicator size="large" color="white" />
          </View>
        </View>
      ) : (
        <SafeAreaView>
          <View className="flex-row items-center justify-between px-4">
            <Pressable
              className="border-2 border-neutral-500 rounded-full p-1"
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons name="keyboard-arrow-left" size={24} color="grey" />
            </Pressable>
            <View>
              <Text className="font-bold text-lg">{item.symbol}</Text>
            </View>
            <View className="border-2 rounded-full p-1 border-neutral-500">
              <Entypo name="dots-three-horizontal" size={24} color="grey" />
            </View>
          </View>

          <View className="px-4 justify-center items-center py-2">
            <Text className="font-extrabold text-2xl text-neutral-600">
              {numeral(parseFloat(item.price)).format("$0,0.00")}
            </Text>
          </View>

          {item && (
            <View className="flex-row justify-center items-center space-x-2 px-4 py-4">
              <View className="flex-row items-center py-2 w-full">
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
                  <Text className="text-lg font-bold">{item.name}</Text>
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
                      {item?.marketCap?.length > 9
                        ? item.marketCap.slice(0, 9)
                        : item.marketCap}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </SafeAreaView>
      )}
      <View style={{ height: 200, paddingHorizontal: 10 }}>
        {lineData && (
          <CartesianChart
            xAxis={{
              tickFormat: (ms) => format(new Date(ms * 1000), "MM/dd"),
              tickCount: 8,
              fontSize: 10,
              style: { labels: { fill: 'green', padding: 5 } }
            }}
            yAxis={{
              tickFormat: (price) => numeral(price).format('$0,0.00'),
              tickCount: 5,
              fontSize: 10,
              style: { labels: { fill: 'green', padding: 5 } }
            }}
            data={lineData}
            xKey="timestamp"
            yKeys={["price"]}
          >
            {({ points }) => (
              <>
                <Line points={points.price} color="green" strokeWidth={2} />
                {isActive && (
                  <ToolTip x={state.x.position} y={state.y.price.position} />
                )}
              </>
            )}
          </CartesianChart>
        )}
      </View>
        {/* ALL time HIGH  */}
      <View className='px-4 py-4'> 
        <View className='flex-row justify-between'>
        <Text className='text-base font-bold text-neutral-500'>ALL TIME HIGH</Text>
        <Text className="font-bold text-base text-neutral-500">
                      {numeral(parseFloat(item?.allTimeHigh?.price)).format("$0,0.00")}
                    </Text>
        </View>
        {/* Markets */}
        <View className='flex-row justify-between'>
        <Text className='text-base font-bold text-neutral-500'>NUMBER OF MARKETS</Text>
        <Text className="font-bold text-base text-neutral-500">
                      {numeral(parseFloat(item?.numberOfMarkets)).format("$0,0.00")}
                    </Text>
                    </View>
        {/* NUMBER EXCHANGE */}
        <View className='flex-row justify-between'>
        <Text className='text-base font-bold text-neutral-500'>NUMBER OF EXCHANGES</Text>
        <Text className="font-bold text-base text-neutral-500">
                      {numeral(parseFloat(item?.numberOfExchanges)).format("$0,0.00")}
                    </Text>
      </View>
      </View>
    </View>
  );
};

export default CoinDetailScreen;
