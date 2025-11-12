import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CoinImage from '@/reuseable/CoinImage';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import {Separator} from '../reuseable/Seperator' ;
import { useRouter } from 'expo-router';
const SearchResult:React.FC = () => {
  return (
    <View>
      <Text>SearchResult</Text>
    </View>
  )
}

export default SearchResult

const styles = StyleSheet.create({})