import React from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
import { BlurView } from 'expo-blur';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number; // blur intensity
};

export default function Card({ children, style, intensity = 50 }: CardProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <BlurView
      intensity={intensity}
      tint={colorScheme} // 'light' | 'dark' | 'default'
      style={[styles.card, style,{backgroundColor:theme.background}]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    padding: 10,
    overflow: 'hidden', // required for blur on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, // Android shadow
    backgroundColor: 'rgba(255,255,255,0.1)', // subtle background for glass effect
  },
});
