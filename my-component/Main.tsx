import { StyleSheet, Text, View , FlatList } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/themed-text'
import CoinImage from '@/reuseable/CoinImage'
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
export const coins: CoinItemType[] = [
  {
    id: '1',
    symbol: 'BTC',
    amount: '$6399M',
    price: '$63,700',
    change: '0.80%',
    changeType: 'up',
    image: require('../assets/images/Douglas.jpeg'),
  },
  {
    id: '2',
    symbol: 'ETH',
    amount: '$4800M',
    price: '$4,800',
    change: '1.25%',
    changeType: 'down',
    image: require('../assets/images/Douglas.jpeg'),
  },
  {
    id: '3',
    symbol: 'XRP',
    amount: '$1200M',
    price: '$1.20',
    change: '0.50%',
    changeType: 'up',
    image: require('../assets/images/Douglas.jpeg'),
  },
];
const Main:React.FC = () => {
      const colorScheme = useColorScheme() || 'light';
      const theme = Colors[colorScheme];
  return (
    <View style={{marginTop:20 , paddingRight:10 , paddingLeft:10}}>
        <FlatList
               data={coins}
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
          <Container item={item}/>
        )}
        />
        {/* <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
            <ThemedText type='subtitle'>Assets</ThemedText>
            <View style={{ flexDirection:'row' , gap:5 , alignItems:'center'}}>
      <ThemedText type='default'>All Claims</ThemedText>
      <Ionicons name="chevron-down-outline" size={20} color={theme.icon} />
    </View>

        </View> */}
        {/* <View style={{marginTop:20}}>
             <Container/>
        </View> */}
    
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
};

type CoinItemProps = {
  item: CoinItemType;
};
const  Container:React.FC<CoinItemProps> =({item})=>{
     const colorScheme = useColorScheme() || 'light';
      const theme = Colors[colorScheme];
    return(
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
                 <ThemedText type='defaultSemiBold' style={{paddingTop:4}}>{item.amount}</ThemedText>
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
    )
}
export default Main

const styles = StyleSheet.create({})