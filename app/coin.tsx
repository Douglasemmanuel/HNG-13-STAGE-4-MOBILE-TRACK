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
import { LineChart } from 'react-native-wagmi-charts';
import { useMemo , useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCandleChartData , DaysOrHours  } from '@/service/api';
import { truncateTitle } from '@/utils/StringUtilis';
const { width, height } = Dimensions.get('window');
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
               <View style={{marginTop:25}}>
                  <Card intensity={80} >
                  <View style={{padding:10}}>
                      <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row' , gap:10}}>
                       <CoinImage
                                     imageSource={{uri:singlecoins?.image}}
                       width={64}
                       height={64}
                       borderRadius={30}
                       intensity={80}
                                 />
                                 <View style={{paddingTop:5}}>
                                  <ThemedText type='defaultSemiBold'>{truncateTitle(singlecoins?.name)}</ThemedText>
                                  <ThemedText type='defaultSemiBold'>{singlecoins?.symbol}</ThemedText>
                                 </View>
                    </View>
                     <BlurredButton
                    text={isLiked ? 'Remove' : 'Add to Wishlist'}
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
                    <View style={{flexDirection:'row' , gap:5  , alignItems:"center" , marginTop:10 }}>
                       <ThemedText type='default'>Today</ThemedText>
                     <Text style={{color:'green' , fontSize:16}}>+{singlecoins?.atl_change_percentage?.toFixed(2)}%</Text>
                    </View>

                    <View style={{flexDirection:'row' , justifyContent:'space-between', marginTop:10}}>
                      <View>
                             <ThemedText type='default'>Change</ThemedText>
                               <ThemedText type='default' style={{color:'green'}}>{singlecoins?.price_change_24h.toFixed(2)}</ThemedText>
                      </View>
                        <View>
                             <ThemedText type='default'>High Price</ThemedText>
                               <ThemedText type='default' style={{color:'green'}}>{singlecoins?.high_24h.toFixed(2)}</ThemedText>
                      </View>
                       <View>
                             <ThemedText type='default'>Low Price</ThemedText>
                               <ThemedText type='default' style={{color:'green'}}>{singlecoins?.low_24h.toFixed(2)}</ThemedText>
                      </View>
                    </View>
                     <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
                      <View style={{ flexDirection:'row' , gap:15 , marginTop:15}}>
                              
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
                          <Graph coinId={singlecoins?.id ?? ''} vs_currency='usd'/>
                          
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
   vs_currency:string
};

type DaysType = 1 | 7 | 30 | 365;


const Graph: React.FC<CoinDataProps> = ({ coinId, vs_currency = 'usd' }) => {
  const [activeRange, setActiveRange] = useState<DaysOrHours>(1);
const normalizedId = coinId.toLowerCase().replace(/\s+/g, '-');
console.log('id' , coinId)
console.log('Normalize' , normalizedId)
  
  const { data, isLoading, isError, fetchForDays } = useCandleChartData(normalizedId, vs_currency);
  useEffect(() => {
  fetchForDays(1);
  setActiveRange(1);
}, []);

  const ActionButtons: { text: string; days: DaysOrHours }[] = [
    // { text: '1H', days: 0.0416667 },
    { text: '1D', days: 1 },
    { text: '1W', days: 7 },
    { text: '1M', days: 30 },
    { text: '1Y', days: 365 },
  ];

  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Format OHLC data for the chart
  const formattedData = data?.map(([timestamp, open, high, low, close]: number[]) => ({
    timestamp,
    open,
    high,
    low,
    value: close,
  })) || [];

  return (
<GestureHandlerRootView style={{ flex: 1 }}>
  <View style={{ flex: 1, padding: 1 }}>
    
    {/* Loading and Error States */}
    {isLoading && <ActivityIndicator size="large" color="#4CAF50" />}
   
 
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!isLoading && formattedData.length > 0 && (
        <View
          style={{
            height: '80%', 
            width: '100%',
            maxWidth: 350,
            paddingVertical: 16,
          }}
        >
          <LineChart.Provider data={formattedData}>
            <LineChart.PriceText
              style={{ color: theme.text, fontSize: 14, marginBottom: 8 }}
            />
            <LineChart>
              <LineChart.Path color="#4CAF50" width={2} />
              <LineChart.CursorCrosshair />
            </LineChart>
          </LineChart.Provider>
        </View>
      )}
    </View>

  
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
      }}
    >
      {ActionButtons.map((btn) => (
        <TextButton
          key={btn.days}
          text={btn.text}
          active={activeRange === btn.days}
          onPress={() => {
              const days = btn.days;
              setActiveRange(days);
              fetchForDays(days);
            }}

        />
      ))}
    </View>
  </View>
</GestureHandlerRootView>


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