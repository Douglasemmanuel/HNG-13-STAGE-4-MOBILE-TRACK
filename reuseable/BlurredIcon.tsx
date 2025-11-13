import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Text, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Colors } from '@/constants/theme';

type BlurredIconProps = {
  name: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
  intensity?: number;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  label?: string;
  labelColor?: string;
  labelSize?: number;
};

export default function BlurredIcon({
  name,
  size = 24,
  color,
  intensity = 50,
  style,
  borderRadius,
  label,
  labelColor,
  labelSize = 12,
}: BlurredIconProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  // Dynamic colors for clarity on both modes
  const iconColor = color || (colorScheme === 'dark' ? '#fff' : '#000');
  const cardColor =
    colorScheme === 'dark'
      ? 'rgba(255,255,255,0.15)' // soft white for dark mode
      : 'rgba(0,0,0,0.08)'; // subtle dark for light mode (✅ visible but elegant)

  const textColor = labelColor || (colorScheme === 'dark' ? '#fff' : '#000');

  return (
    <View style={{ alignItems: 'center' }}>
      <BlurView
        intensity={intensity}
        tint={colorScheme === 'dark' ? 'dark' : 'light'}
        experimentalBlurMethod="dimezisBlurView"
        style={[
          styles.container,
          {
            width: size * 2,
            height: size * 2,
            borderRadius: borderRadius || size,
            backgroundColor: cardColor,
          },
          style,
        ]}
      >
        <Ionicons
          name={name as React.ComponentProps<typeof Ionicons>['name']}
          size={size}
          color={iconColor}
        />
      </BlurView>

      {label && (
        <Text style={{ color: textColor, fontSize: labelSize, marginTop: 6 }}>
          {label}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    // 🚫 Removed all shadows for a clean look
  },
});
