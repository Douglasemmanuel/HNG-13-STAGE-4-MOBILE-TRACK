import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistStorage } from 'zustand/middleware';

export const asyncStorageAdapter: PersistStorage<any> = {
  getItem: async (name) => {
    try {
      const value = await AsyncStorage.getItem(name);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Error getting item from AsyncStorage', e);
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await AsyncStorage.setItem(name, JSON.stringify(value));
    } catch (e) {
      console.error('Error setting item in AsyncStorage', e);
    }
  },
  removeItem: async (name) => {
    try {
      await AsyncStorage.removeItem(name);
    } catch (e) {
      console.error('Error removing item from AsyncStorage', e);
    }
  },
};
