
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={80} tint={colorScheme === 'dark' ? 'dark' : 'light'} style={styles.container}>
        <Ionicons name="search-outline" size={20} color={theme.icon} style={styles.icon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.text}
          value={value}
          onChangeText={onChangeText}
          style={[styles.input, { color: theme.text }]}
        />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 16,
    overflow: 'hidden', 
    margin: 10,
    backgroundColor: 'rgba(255,255,255,0.1)', 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: 'rgba(255,255,255,0.2)', 
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
