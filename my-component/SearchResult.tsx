import { StyleSheet, Text, View  , FlatList , TouchableOpacity} from 'react-native'
import React from 'react'
import CoinImage from '@/reuseable/CoinImage';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import {Separator} from '../reuseable/Seperator' ;
import { useRouter } from 'expo-router';
export const coins: CoinItemType[] = [
  {
    id: '1',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: '$6399M',
    price: '$63,700',
    change: '0.80%',
    changeType: 'up',
    image: require('../assets/images/Douglas.jpeg'),
  },
  {
    id: '2',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: '$4800M',
    price: '$4,800',
    change: '1.25%',
    changeType: 'down',
    image: require('../assets/images/Douglas.jpeg'),
  },
  {
    id: '3',
    name: 'Ripple',
    symbol: 'XRP',
    amount: '$1200M',
    price: '$1.20',
    change: '0.50%',
    changeType: 'up',
    image: require('../assets/images/Douglas.jpeg'),
  },
];
const SearchResult:React.FC = () => {
   const colorScheme = useColorScheme() || 'light';
            const theme = Colors[colorScheme];
          const router = useRouter();
          const handleItemPress = (item: CoinItemType) => {
          console.log('Pressed coin:', item.name);
            router.push('/coin');
    };
  return (
   <View style={{marginTop:20 , paddingRight:10 , paddingLeft:10}}>
              <FlatList
                     data={coins}
              scrollEnabled={false}
              keyExtractor={(item) => item.id}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={<ThemedText type='title'>No Coin in WishList Available</ThemedText>}
              ItemSeparatorComponent={Separator}
              renderItem={({ item }) => (
                <Container item={item}  onPress={() => handleItemPress(item)}/>
              )}
              />
             
          
          </View>
  )
}
export type CoinItemType = {
  id: string;
  symbol: string;
  amount: string;
  price: string;
  change: string;
  changeType: 'up' | 'down';
  image: any; 
  name:string;
};

type CoinItemProps = {
  item: CoinItemType;
    onPress: () => void;
};
const  Container:React.FC<CoinItemProps> =({item, onPress})=>{
     const colorScheme = useColorScheme() || 'light';
      const theme = Colors[colorScheme];
    return(
       <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={{paddingTop:15 , paddingBottom:10 }}>
          <View style={{flexDirection:'row' , justifyContent:'space-between' , alignItems:'center'}}>
       <View style={{flexDirection:'row' , gap:10}}>
             <CoinImage
                imageSource={require('../assets/images/Douglas.jpeg')}
  width={60}
  height={60}
  borderRadius={30}
  intensity={80}
            />
            <View>
                   <ThemedText type='subtitle'>{item.symbol}</ThemedText>
                 <ThemedText type='defaultSemiBold' style={{paddingTop:4}}>{item.name}</ThemedText>
            </View>
       </View>
             <View >
                            <ThemedText type='subtitle'>{item.price}</ThemedText>
                           <View style={{flexDirection:'row', gap:5 , alignItems:'center' ,paddingTop:4}}>
                            {item.changeType ==='up' ? 
                             <Ionicons name="arrow-up-outline" size={20} color={theme.text} />
                            :
                              <Ionicons name="arrow-down-outline" size={20} color={theme.text} />
                            }
                              <ThemedText type='defaultSemiBold'>{item.change}</ThemedText>
                           </View>
                        </View>
        </View>
      </View>
      </TouchableOpacity>
    )
}
export default SearchResult

const styles = StyleSheet.create({})