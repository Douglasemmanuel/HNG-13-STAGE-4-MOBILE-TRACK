// src/store/coinStore.ts

import { create } from 'zustand';
import { CoinDetail , CoinMarket } from '@/types/types';

interface CoinState {
  coinData: CoinDetail | null;
  setCoinData: (data: CoinDetail) => void;
  updateCoinData: (partialData: Partial<CoinDetail>) => void; 
  clearCoinData: () => void; 
}


interface SelectedCoinStore {
  selectedCoin: CoinMarket | null;
  setSelectedCoin: (coin: CoinMarket) => void;
  clearSelectedCoin: () => void;
}

export const  useSingleCoinStore = create<SelectedCoinStore>((set) => ({
  selectedCoin: null,
  setSelectedCoin: (coin) => set({ selectedCoin: coin }),
  clearSelectedCoin: () => set({ selectedCoin: null }),
}));
