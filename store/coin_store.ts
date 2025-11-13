// src/store/coinStore.ts
import { create } from 'zustand';
import { CoinDetail , CoinMarket } from '@/types/types';

interface CoinState {
  coinData: CoinDetail | null;
  setCoinData: (data: CoinDetail) => void;
  updateCoinData: (partialData: Partial<CoinDetail>) => void; 
  clearCoinData: () => void; // optional reset
}

// export const useSingleCoinStore = create<CoinState>((set) => ({
//   coinData: null,

//   // Set the whole coin object
//   setCoinData: (data: CoinDetail) => set({ coinData: data }),

//   // Update only certain fields (partial update)
//   updateCoinData: (partialData: Partial<CoinDetail>) =>
//     set((state) => ({
//       coinData: state.coinData ? { ...state.coinData, ...partialData } : null,
//     })),

//   // Clear the coin data
//   clearCoinData: () => set({ coinData: null }),
// }));




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
