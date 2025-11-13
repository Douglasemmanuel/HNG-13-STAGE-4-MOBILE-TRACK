// store/coinListStore.ts
import { create } from 'zustand';
import { CoinListItem } from '../types/types';

interface CoinListStore {
  coins: CoinListItem[];
  setCoins: (coins: CoinListItem[]) => void;
}

export const useCoinListStore = create<CoinListStore>((set) => ({
  coins: [],
  setCoins: (coins) => set({ coins }),
}));
