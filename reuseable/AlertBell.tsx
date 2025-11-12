import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

type GlassBellIconProps = {
  size?: number;
  color?: string;
  count?: number;
  intensity?: number; // how strong the blur is
};

export default function AlertBell({
  size = 28,
  color = 'white',
  count = 0,
  intensity = 40,
}: GlassBellIconProps) {
  return (
    <BlurView intensity={intensity} tint="dark" style={styles.container}>
      <Ionicons name="notifications-outline" size={size} color={color} />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // fallback translucent layer
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'red',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
