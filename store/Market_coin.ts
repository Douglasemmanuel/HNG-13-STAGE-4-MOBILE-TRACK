import { create } from 'zustand';
import {  CoinMarket } from '../types/types';

interface MarketStore {
  marketCoins: CoinMarket[];
  setMarketCoins: (coins:CoinMarket[]) => void;
  clearMarketCoins: () => void;
}

export const useMarketStore = create<MarketStore>((set) => ({
  marketCoins: [],
  setMarketCoins: (coins) => set({ marketCoins: coins }),
  clearMarketCoins: () => set({ marketCoins: [] }),
}));
