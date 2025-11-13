import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncStorageAdapter } from '../utils/strorage';

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
  toggleFavorite: (name: string) => void;
  clearFavorites: () => void;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (coin) => {
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

      removeFavorite: (name) => {
        set((state) => ({
          favorites: state.favorites.filter((c) => c.id !== name),
        }));
      },

      toggleFavorite: (name) => {
        set((state) => ({
          favorites: state.favorites.map((c) =>
            c.id === name ? { ...c, isLiked: !c.isLiked } : c
          ),
        }));
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorite-coins',
      storage: asyncStorageAdapter, // custom AsyncStorage adapter
    }
  )
);

