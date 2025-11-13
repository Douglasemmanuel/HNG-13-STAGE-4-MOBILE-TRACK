import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface FavoriteCoin {
  id: string; // use name as id
  name: string;
  symbol: string;
  isLiked: boolean;
  image: string;
}

interface FavoriteStore {
  favorites: FavoriteCoin[];
  addFavorite: (coin: Omit<FavoriteCoin, 'id' | 'isLiked'>) => void;
  removeFavorite: (name: string) => void;
  toggleFavorite: (symbol: string) => void;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist<FavoriteStore>(
    (set, get) => ({
      favorites: [],

      addFavorite: (coin) => {
        if (!coin.name || !coin.symbol) return; // extra safety check
        const existing = get().favorites.find((c) => c.id === coin.name);
        if (!existing) {
          set((state) => ({
            favorites: [
              ...state.favorites,
              { ...coin, id: coin.name, isLiked: true },
            ],
          }));
        }
      },

      removeFavorite: (name) =>
        set((state) => ({
          favorites: state.favorites.filter((c) => c.id !== name),
        })),

      toggleFavorite: (symbol) =>
        set((state) => ({
          favorites: state.favorites.map((c) =>
            c.symbol === symbol ? { ...c, isLiked: !c.isLiked } : c
          ),
        })),

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorites-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
