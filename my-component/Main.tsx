import { StyleSheet, Text, View , FlatList , TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/themed-text'
import CoinImage from '@/reuseable/CoinImage'
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { useFetchMarketcoin } from '@/service/api';
import { useMarketStore } from '@/store/Market_coin';
import { useEffect , useMemo } from 'react';
import { truncateTitle } from '@/utils/StringUtilis';
import { MarketFormatNumber } from '@/utils/NumberUtils';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSingleCoinStore } from '@/store/coin_store';


const Main:React.FC = () => {
  const { isLoading, error , data} = useFetchMarketcoin('usd');
  const router = useRouter()
//   useEffect(() => {
//   if (data) {
//     console.log('DATA fetched:', data);
//   }
// }, [data]);
  const marketcoins = useMarketStore((state)=>state.marketCoins);
  console.log('DATA', data)
      const colorScheme = useColorScheme() || 'light';
      const theme = Colors[colorScheme];
      const [selectedId, setSelectedId] = useState<string>('');
           const handleItemPress = (item: CoinItemType) => {
      
        const selectedCoin = marketcoins.find((coin) => coin.id === item.id);
      
        if (selectedCoin) {
          console.log('Pressed coin:', selectedCoin.name);
          setSelectedId(selectedCoin.id); 
           useSingleCoinStore.getState().setSelectedCoin(selectedCoin);
          router.push('/coin'); 
        } else {
          console.log('Coin not found in marketCoins');
        }
      };
  return (
    <View style={{marginTop:20 , paddingRight:10 , paddingLeft:10}}>
        <FlatList
               data={marketcoins?.slice(0, 10) || []}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.5}
        ListHeaderComponent={  <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
            <ThemedText type='subtitle'>Assets</ThemedText>
            <View style={{ flexDirection:'row' , gap:5 , alignItems:'center'}}>
      <ThemedText type='default'>All Claims</ThemedText>
      <Ionicons name="chevron-down-outline" size={20} color={theme.icon} />
    </View>

        </View>}
        ListEmptyComponent={<ThemedText type='title'>No Coin Available</ThemedText>}
        ItemSeparatorComponent={()=><View style={{height:StyleSheet.hairlineWidth , backgroundColor:theme.background}}/>}
        renderItem={({ item }) => (
          <Container item={item}  onPress={() => handleItemPress(item)}/>
        
        )}
        />
        
    
    </View>
  )
}
export interface CoinItemType {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage: number;
  total_volume:number;
  ath_change_percentage:number;
  [key: string]: any; // allow extra API fields
}


type CoinItemProps = {
  item: CoinItemType;
   onPress: () => void;
};
const  Container:React.FC<CoinItemProps> =({item , onPress})=>{
     const colorScheme = useColorScheme() || 'light';
      const theme = Colors[colorScheme];
       const changeType = useMemo(() => {
  // Convert to number
  const value = Number(item.ath_change_percentage);

  // Check if it's a valid number
  if (!isNaN(value)) {
    return value >= 0 ? 'up' : 'down';
  }

  // Default to 'down' if invalid
  return 'down';
}, [item.ath_change_percentage]);
    return(
       <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{paddingTop:15 , paddingBottom:10 }}>
          <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center'}}>
       <View style={{flexDirection:'row' , gap:10}}>
             <CoinImage
                imageSource={{uri:item.image}}
  width={60}
  height={60}
  borderRadius={30}
  intensity={80}
            />
            <View>
                   <ThemedText type='subtitle'>{item.symbol.toUpperCase()}</ThemedText>
                 <ThemedText type='defaultSemiBold' style={{paddingTop:4}}>{MarketFormatNumber(item.total_volume)}</ThemedText>
            </View>
       </View>
            <View >
                <ThemedText type='subtitle'>${item.current_price}</ThemedText>
               <View style={{flexDirection:'row', gap:5 , alignItems:'center' ,paddingTop:4}}>
                  {item.price_change_percentage_24h > 0 ? (
                                          <Ionicons name="arrow-up-outline" size={20} color='green' />
                                        ) : (
                                          <Ionicons name="arrow-down-outline" size={20} color='red' />
                                        )}
                  <ThemedText type='defaultSemiBold' style={{color: item.price_change_percentage_24h > 0 ? 'green' :'red'}}>{item.price_change_percentage_24h}</ThemedText>
               </View>
            </View>
        </View>
      </View>
      </TouchableOpacity>
    )
}
export default Main

const styles = StyleSheet.create({})