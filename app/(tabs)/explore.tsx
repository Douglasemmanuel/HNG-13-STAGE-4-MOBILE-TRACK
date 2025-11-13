import { Image } from 'expo-image';
import { Platform, StyleSheet , Dimensions , View  , FlatList} from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import AppDetailScrollView from '@/reuseable/AppDetailScrollview';
import BlurredButton from '@/reuseable/Buttons';
const { width, height } = Dimensions.get('window');
import Card from '../../reuseable/Card';
import CoinImage from '../../reuseable/CoinImage'
import { Separator } from '@/reuseable/Seperator';
import { useRouter } from 'expo-router';
import { useFavoriteStore } from '@/store/favourites_store';


// export const coins = [
//   {
//     id: '1',
//     name: 'Bitcoin',
//     symbol: 'BTC',
//     amount: '$6399M',
//     price: '$63,700',
//     change: '0.80%',
//     changeType: 'up',
//     image: require('../../assets/images/Douglas.jpeg'),
//   },
//   {
//     id: '2',
//     name: 'Ethereum',
//     symbol: 'ETH',
//     amount: '$4800M',
//     price: '$4,800',
//     change: '1.25%',
//     changeType: 'down',
//     image: require('../../assets/images/Douglas.jpeg'),
//   },
//   {
//     id: '3',
//     name: 'Ripple',
//     symbol: 'XRP',
//     amount: '$1200M',
//     price: '$1.20',
//     change: '0.50%',
//     changeType: 'up',
//     image: require('../../assets/images/Douglas.jpeg'),
//   },
// ];

export default function TabTwoScreen() {
     const scrollHeight = height * 0.85; 
     const router = useRouter();
     const { removeFavorite , favorites } = useFavoriteStore();
    console.log('Favourites',favorites)
  return (
  <AppSafeAreaProvider>
     <AppDetailScrollView  height={scrollHeight}>
       <View style={{paddingLeft:10 , paddingRight:10}} >
     <ThemedText type='title' style={{textAlign:"center"}}>Favourites</ThemedText>
      <FlatList
                        data={favorites}
                 scrollEnabled={false}
                 keyExtractor={(item) => item.id}
                 onEndReachedThreshold={0.5}
                 ListEmptyComponent={<ThemedText type='subtitle'  style={{textAlign:"center"}}>No Coin in WishList Available</ThemedText>}
                 ItemSeparatorComponent={Separator}
                 renderItem={({ item }) => (
                  <View style={{paddingTop:15, paddingBottom:15}}>
                     <Card intensity={80} >
                       <View style={{padding:10}}>
                           <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                         <View style={{flexDirection:'row' , gap:10}}>
                            <CoinImage
                                          imageSource={{uri:item.image}}
                            width={64}
                            height={64}
                            borderRadius={30}
                            intensity={80}
                                      />
                                      <View style={{paddingTop:3}}>
                                       <ThemedText type='defaultSemiBold'>{item.name}</ThemedText>
                                       <ThemedText type='defaultSemiBold'>{item.symbol}</ThemedText>
                                      </View>
                         </View>
                          <BlurredButton 
                           text='Remove' 
                            onPress={() => removeFavorite(item.id)}
                            />
                       </View>
                       </View>
                      </Card>

                  </View>
                 )}
                 />
        
       </View>
     </AppDetailScrollView>
   
  </AppSafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
