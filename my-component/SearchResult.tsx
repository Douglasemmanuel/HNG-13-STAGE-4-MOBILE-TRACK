import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import CoinImage from '@/reuseable/CoinImage';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Separator } from '../reuseable/Seperator';
import { useRouter } from 'expo-router';
import { truncateTitle } from '@/utils/StringUtilis';
import Loader from '@/reuseable/Loader';
import { useSingleCoinStore } from '@/store/coin_store';
import { useMarketStore } from '@/store/Market_coin';
export type CoinItemType = {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  total_volume: number;
  ath_change_percentage: number;
  [key: string]: any;
};

type SearchResultProps = {
  data: CoinItemType[];
};

const SearchResult: React.FC<SearchResultProps> = ({ data }) => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];
  const router = useRouter();
  const [loading , setLoading] = useState();
    const marketcoins = useMarketStore((state)=>state.marketCoins);
   const [selectedId, setSelectedId] = useState<string>('');
    const handleItemPress = (item: CoinItemType) => {
    
      // Find the coin in marketCoins by id
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
  // Inner component for a single coin
  const Container: React.FC<{ item: CoinItemType; onPress: () => void }> = ({ item, onPress }) => {
    const changeType = useMemo(() => {
      const value = Number(item.ath_change_percentage);
      if (!isNaN(value)) {
        return value >= 0 ? 'up' : 'down';
      }
      return 'down';
    }, [item.ath_change_percentage]);

    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <View style={{ paddingTop: 15, paddingBottom: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <CoinImage
                imageSource={{ uri: item.image }}
                width={60}
                height={60}
                borderRadius={30}
                intensity={80}
              />
              <View>
                <ThemedText type="subtitle">{item.symbol.toUpperCase()}</ThemedText>
                <ThemedText type="defaultSemiBold" style={{ paddingTop: 4 }}>
                 {truncateTitle(item.name)}
                </ThemedText>
              </View>
            </View>
            <View>
              <ThemedText type="subtitle">${item.current_price.toFixed(2)}</ThemedText>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 5,
                  alignItems: 'center',
                  paddingTop: 4,
                }}
              >
                {item.price_change_percentage_24h > 0  ? (
                  <Ionicons name="arrow-up-outline" size={20} color={theme.text} />
                ) : (
                  <Ionicons name="arrow-down-outline" size={20} color={theme.text} />
                )}
                <ThemedText
                  type="defaultSemiBold"
                  style={{
                    color: theme.text,
                  }}
                >
                  {item.price_change_percentage_24h.toFixed(2)}%
                </ThemedText>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Parent render
  return (
    <View style={{ marginTop: 20, paddingRight: 10, paddingLeft: 10 }}>
      {data.length === 0 ? (
        <ThemedText type="title">No coins found</ThemedText>
      ) : (
        data.map((item) => (
          <React.Fragment key={item.id}>
            <Container item={item} onPress={() => handleItemPress(item)} />
            <Separator />
          </React.Fragment>
        ))
      )}
    </View>
  );
};

export default SearchResult;

const styles = StyleSheet.create({});
