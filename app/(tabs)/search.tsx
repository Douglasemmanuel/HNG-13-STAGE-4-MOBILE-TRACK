import { StyleSheet, Text, View , Dimensions , ScrollView  , TouchableOpacity , TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider'
import { ThemedText } from '@/components/themed-text' 
import { ThemedView } from '@/components/themed-view'
import AppDetailScrollView from '@/reuseable/AppDetailScrollview';
import SearchBar from '@/my-component/SearchBar'
import AlertBell from '@/reuseable/AlertBell'
import BackButton from '@/reuseable/BackButton'
import { useState } from 'react'
import { useRouter } from 'expo-router'
import BlurredButton from '../../reuseable/Buttons';
import SearchResult from '@/my-component/SearchResult' ;
import DeaultSearch from '../../my-component/DeaultSearch' ;
import { useCallback ,useRef, useEffect } from 'react'
import { useMarketStore } from '@/store/Market_coin'
import { debounce } from 'lodash';
import { CoinMarket } from '@/types/types'

const { width, height } = Dimensions.get('window');
const buttons = [
  { text: 'All', onPress: () => console.log('All pressed') },
  { text: 'Favorites', onPress: () => console.log('Favorites pressed') },
  { text: 'Top', onPress: () => console.log('Top pressed') },
  { text: 'Layer 1', onPress: () => console.log('Layer 1 pressed') },
  { text: 'Layer 2', onPress: () => console.log('Layer 2 pressed') },
];
const Search = () => {
  const router = useRouter();
     const marketcoins = useMarketStore((state)=>state.marketCoins);
     const scrollHeight = height * 0.85; 
     const [searchText, setSearchText] = useState('');
  const [filteredText, setFilteredText] = useState<CoinMarket[]>([]);

  // Debounced search function
  const debouncedSearch = debounce((text: string) => {
    if (!text) {
      setFilteredText([]);
      return;
    }

    const result = marketcoins.filter((coin) =>
      coin.id.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredText(result);
  }, 500); // wait 500ms after user stops typing

  // Update search
  const handleSearchChange = (text: string) => {
    setSearchText(text);
    debouncedSearch(text);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);
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
            <ThemedText type='title'>Coins</ThemedText>
           </View>
           <AlertBell/>

        </View>
      <View style={{marginTop:10, marginBottom:10}}>
          <SearchBar value={searchText} onChangeText={handleSearchChange}/>
      </View>
      <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection:'row' , gap:20}}>
        
  {buttons.map((btn, idx) => (
    <BlurredButton key={idx} text={btn.text} onPress={btn.onPress} />
  ))}
</View>
</ScrollView>
 {searchText.trim() !== '' ? (
   <SearchResult
    data={filteredText}
   />
 ):(
 <DeaultSearch/>
 )}
       
     
       </View>
     </AppDetailScrollView>
  </AppSafeAreaProvider>
  )
}

export default Search;

const styles = StyleSheet.create({})