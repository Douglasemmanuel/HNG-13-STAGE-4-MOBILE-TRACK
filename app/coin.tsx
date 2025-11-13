import { StyleSheet, Text, View , Dimensions,TouchableOpacity , ScrollView , ActivityIndicator } from 'react-native'
import React from 'react'
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider'
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import AppDetailScrollView from '@/reuseable/AppDetailScrollview';
import AlertBell from '@/reuseable/AlertBell'
import BackButton from '@/reuseable/BackButton'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import BlurredButton from '../reuseable/Buttons';
import CoinImage from '@/reuseable/CoinImage';
import Card from '@/reuseable/Card';
import TextButton from '@/reuseable/TextButton';
import { useSingleCoinStore } from '@/store/coin_store';
import { useFavoriteStore } from '@/store/favourites_store';
const { width, height } = Dimensions.get('window');
import { LineChart } from 'react-native-wagmi-charts';
import { useCoinOhlcQuery } from '@/service/api';
import { useMemo } from 'react';

const Coin:React.FC = () => {
    const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
     const scrollHeight = height * 0.85; 
      const router = useRouter();
      const buttons = [
  { text: 'All', onPress: () => console.log('All pressed') },
  { text: '1D', onPress: () => console.log('1D pressed') },
  { text: '6D', onPress: () => console.log('6D pressed') },
  { text: '2M', onPress: () => console.log('2M pressed') },
  { text: '6M', onPress: () => console.log('6M pressed') },
  { text: '1Y', onPress: () => console.log('1Y pressed') },
];
const ActionButtons = [
  { text: '1H', onPress: () => console.log('1H pressed') },
  { text: '1D', onPress: () => console.log('1D pressed') },
  { text: '1W', onPress: () => console.log('1W pressed') },
  { text: '1M', onPress: () => console.log('1M pressed') },
  { text: '1Y', onPress: () => console.log('1Y pressed') },
];
 const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
const singlecoins = useSingleCoinStore((state)=>state.selectedCoin);
const {addFavorite , toggleFavorite , favorites}  = useFavoriteStore()
  const isLiked = singlecoins
    ? favorites.some((f) => f.symbol === singlecoins.symbol && f.isLiked)
    : false;
// console.log('Data-gg' , singlecoins)
  const handlePress = (text: string) => {
    if (!selectedButtons.includes(text)) {
      setSelectedButtons([...selectedButtons, text]);
    }
  };
  return (
  <AppSafeAreaProvider>
       <AppDetailScrollView  height={scrollHeight}>
       <View style={{paddingLeft:5 , paddingRight:5}} >
           <View style={{flexDirection:"row" , justifyContent:'space-between' , alignItems:'center'}}>
                   <View style={{flexDirection:"row" , gap:10 , alignItems:'center'}}>
                    <BackButton
                    onPress={()=>router.back()}
                    size={20}
                    />
                    <ThemedText type='title'>Buy {singlecoins?.name}</ThemedText>
                   </View>
                   {/* <AlertBell/> */}
        
                </View>
               <View style={{marginTop:10}}>
                  <Card intensity={80} >
                  <View style={{padding:10}}>
                      <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row' , gap:5}}>
                       <CoinImage
                                     imageSource={{uri:singlecoins?.image}}
                       width={64}
                       height={64}
                       borderRadius={30}
                       intensity={80}
                                 />
                                 <View>
                                  <ThemedText type='defaultSemiBold'>{singlecoins?.name}</ThemedText>
                                  <ThemedText type='defaultSemiBold'>{singlecoins?.symbol}</ThemedText>
                                 </View>
                    </View>
                     <BlurredButton
                    text={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    onPress={() => {
                      if (isLiked) {
                        toggleFavorite(singlecoins?.symbol ?? '' );
                      } else {
                        addFavorite({
                          name: singlecoins?.name ?? '',
                          symbol: singlecoins?.symbol ?? '',
                          image: singlecoins?.image ?? '',
                        });
                      }
                    }}
                  />
                  </View>
                  </View>
                 </Card>
               </View>
                <View style={{marginTop:20}}>
                  <Card intensity={80} >
                    <View style={{padding:10}}>
                     <View style={{flexDirection:'row' , gap:10 , alignItems:"center" , justifyContent:"space-between"}}>
                       <ThemedText type='title'>${singlecoins?.current_price}</ThemedText>
                                          
                          <TouchableOpacity style={styles.button} >
                           <View style={{flexDirection:"row" ,justifyContent:'space-between'}}>
                              <Ionicons name="swap-vertical" size={20} color='white' />
                            <Text style={styles.text}>{singlecoins?.ath_change_percentage?.toFixed(2)}%</Text>
                           </View>
                          </TouchableOpacity>
                  
                     </View>
                    <View style={{flexDirection:'row' , gap:5  , alignItems:"center" }}>
                       <ThemedText type='default'>Today</ThemedText>
                     <Text style={{color:'green' , fontSize:16}}>+{singlecoins?.atl_change_percentage?.toFixed(2)}%</Text>
                    </View>

                    <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                      <View>
                             <ThemedText type='default'>Change</ThemedText>
                               <ThemedText type='default' style={{color:'green'}}>{singlecoins?.price_change_24h}</ThemedText>
                      </View>
                        <View>
                             <ThemedText type='default'>High Price</ThemedText>
                               <ThemedText type='default' style={{color:'green'}}>{singlecoins?.high_24h}</ThemedText>
                      </View>
                       <View>
                             <ThemedText type='default'>Low Price</ThemedText>
                               <ThemedText type='default' style={{color:'green'}}>{singlecoins?.low_24h}</ThemedText>
                      </View>
                    </View>
                     <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
                      <View style={{ flexDirection:'row' , gap:15}}>
                              
                        {buttons.map((btn, idx) => (
                          <BlurredButton key={idx} text={btn.text} onPress={btn.onPress} />
                        ))}
                      </View>
                        </ScrollView>
                    </View>
                  </Card>
                  </View>
                  <View style={{marginTop:20}}>
                    <Card  intensity={80} >
                        <View style={{padding:10}}>
                          <View style={{flexDirection:"row" , justifyContent:'space-between'}}>
                            <ThemedText type='defaultSemiBold'>
                              {singlecoins?.name}
                            </ThemedText>
                             <View style={{flexDirection:'row' , gap:5  , alignItems:"center" }}>
                            <Ionicons name="swap-vertical" size={20} color='green' />
                       <ThemedText type='default' style={{color:'green'}}>{singlecoins?.ath_change_percentage?.toFixed(2)}%</ThemedText>
                    </View>
                          </View>
                          <ThemedText type='title' style={{paddingTop:5}}>${singlecoins?.current_price}</ThemedText>
                          <Graph coinId={singlecoins?.name ?? ''}/>
                          
                        </View>
                    </Card>
                  </View>
       </View>
     </AppDetailScrollView>
  </AppSafeAreaProvider>
  )
}
type CoinDataProps = {
  coinId: string;
};

// const Graph:React.FC<CoinDataProps> = ({coinId})=>{
//    const { data, isLoading, error } = useCoinOhlcQuery(coinId, {
//     vs_currency: 'usd',
//     days: 7,
//   });
//   const ActionButtons = [
//   { text: '1H', onPress: () => console.log('1H pressed')  },
//   { text: '1D', onPress: () => console.log('1D pressed') },
//   { text: '1W', onPress: () => console.log('1W pressed') },
//   { text: '1M', onPress: () => console.log('1M pressed') },
//   { text: '1Y', onPress: () => console.log('1Y pressed') },
// ];
//   return(
//     <View>
//       {/* <LineChart.Provider data={[]}>
//       <LineChart>
//         <LineChart.Path />
//       </LineChart>
//     </LineChart.Provider> */}


   
//        <View style={{flexDirection:'row', justifyContent:'space-between' , marginTop:20}}>
//                             {ActionButtons.map((btn, idx) => (
//                                 <TextButton 
//                                 key={idx}
//                                 text={btn.text} 
//                                   onPress={btn.onPress}
//                                 />
//                             ))}
//                           </View>
//     </View>
//   )
// }
const Graph: React.FC<CoinDataProps> = ({ coinId }) => {
  const [selectedRange, setSelectedRange] = useState<"1H" | "1D" | "1W" | "1M" | "1Y">("1W");

  // Map button text to CoinGecko 'days' parameter
  const rangeMap: Record<string, number | string> = {
    "1H": 1 / 24, // 1 hour
    "1D": 1,
    "1W": 7,
    "1M": 30,
    "1Y": 365,
  };

  // Dynamically fetch OHLC data based on selectedRange
  const { data, isLoading, error } = useCoinOhlcQuery(coinId, {
    vs_currency: "usd",
    days: rangeMap[selectedRange],
  });

  // Prepare data for LineChart
  const chartData = useMemo(() => {
    if (!data) return [];
    return data.map(([timestamp, open, high, low, close]) => ({
      timestamp,
      value: close,
    }));
  }, [data]);

  const screenWidth = Dimensions.get("window").width;

  // Define buttons with dynamic onPress
  const ActionButtons = [
    { text: '1H', onPress: () => setSelectedRange("1H") },
    { text: '1D', onPress: () => setSelectedRange("1D") },
    { text: '1W', onPress: () => setSelectedRange("1W") },
    { text: '1M', onPress: () => setSelectedRange("1M") },
    { text: '1Y', onPress: () => setSelectedRange("1Y") },
  ];

  if (isLoading) return <ActivityIndicator size="large" />;
  if (error) return <Text style={{ color: "red" }}>Error loading chart</Text>;

  return (
    <View style={{ paddingHorizontal: 10 }}>
      {/* Line Chart */}
      <LineChart.Provider data={chartData}>
        <LineChart height={screenWidth / 2} width={screenWidth}>
          <LineChart.Path color="#16c784" />
          <LineChart.CursorCrosshair color="#16c784" />
        </LineChart>
      </LineChart.Provider>

      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {ActionButtons.map((btn, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={btn.onPress}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              backgroundColor: selectedRange === btn.text ? "#16c784" : "#333",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{btn.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default Coin

const styles = StyleSheet.create({
    button: {
    backgroundColor: 'green',  
    borderColor: 'white',      
    borderWidth: 0.5,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  text: {
    color: 'white', 
    fontSize: 16,
    fontWeight: '600',
  },

})