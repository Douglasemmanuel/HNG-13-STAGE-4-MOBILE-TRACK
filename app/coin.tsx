import { StyleSheet, Text, View , Dimensions,TouchableOpacity , ScrollView } from 'react-native'
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
const { favorites, toggleFavorite } = useFavoriteStore();
console.log('Data-gg' , singlecoins)
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
                      text={
            useFavoriteStore
              .getState()
              .favorites.find((f) => f.symbol === singlecoins?.symbol)
              ?.isLiked
              ? 'Remove from Wishlist'
              : 'Add to Wishlist'
          }
          onPress={() => {
            if (!singlecoins) return;
            useFavoriteStore
              .getState()
              .toggleFavorite(singlecoins.symbol);
          }}
                      />
                  </View>
                  </View>
                 </Card>
               </View>
                <View style={{marginTop:20}}>
                  <Card intensity={80} >
                    <View style={{padding:10}}>
                     <View style={{flexDirection:'row' , gap:10 , alignItems:"center"}}>
                       <ThemedText type='title'>${singlecoins?.current_price}</ThemedText>
                                          
                          <TouchableOpacity style={styles.button} >
                           <View style={{flexDirection:"row" ,justifyContent:'space-between'}}>
                              <Ionicons name="swap-vertical" size={20} color='white' />
                            <Text style={styles.text}>{singlecoins?.ath_change_percentage}%</Text>
                           </View>
                          </TouchableOpacity>
                  
                     </View>
                    <View style={{flexDirection:'row' , gap:5  , alignItems:"center" }}>
                       <ThemedText type='default'>Today</ThemedText>
                     <Text style={{color:'green' , fontSize:16}}>+{singlecoins?.atl_change_percentage}%</Text>
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
                       <ThemedText type='default' style={{color:'green'}}>{singlecoins?.ath_change_percentage}%</ThemedText>
                    </View>
                          </View>
                          <ThemedText type='title' style={{paddingTop:5}}>${singlecoins?.current_price}</ThemedText>
                          <Graph/>
                          {/* <View style={{flexDirection:'row', justifyContent:'space-between' , marginTop:20}}>
                            {ActionButtons.map((btn, idx) => (
                                <TextButton 
                                key={idx}
                                text={btn.text} 
                                  onPress={btn.onPress}
                                />
                            ))}
                          </View> */}
                        </View>
                    </Card>
                  </View>
       </View>
     </AppDetailScrollView>
  </AppSafeAreaProvider>
  )
}
const Graph:React.FC=()=>{
  const ActionButtons = [
  { text: '1H', onPress: () => console.log('1H pressed') },
  { text: '1D', onPress: () => console.log('1D pressed') },
  { text: '1W', onPress: () => console.log('1W pressed') },
  { text: '1M', onPress: () => console.log('1M pressed') },
  { text: '1Y', onPress: () => console.log('1Y pressed') },
];
  return(
    <View>
      <View>

      </View>
       <View style={{flexDirection:'row', justifyContent:'space-between' , marginTop:20}}>
                            {ActionButtons.map((btn, idx) => (
                                <TextButton 
                                key={idx}
                                text={btn.text} 
                                  onPress={btn.onPress}
                                />
                            ))}
                          </View>
    </View>
  )
}
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