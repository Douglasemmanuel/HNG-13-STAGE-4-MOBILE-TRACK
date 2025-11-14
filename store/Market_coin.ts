

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CoinMarket } from '../types/types';

interface MarketStore {
  marketCoins: CoinMarket[];
  setMarketCoins: (coins: CoinMarket[]) => void;
  clearMarketCoins: () => void;
}

export const useMarketStore = create<MarketStore>()(
  persist(
    (set) => ({
      marketCoins: [],
      setMarketCoins: (coins) => set({ marketCoins: coins }),
      clearMarketCoins: () => set({ marketCoins: [] }),
    }),
    {
      name: 'market-storage', // key for AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
