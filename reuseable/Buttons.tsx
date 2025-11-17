import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

type BlurredButtonProps = {
  text: string;
  onPress: () => void;
  paddingVertical?: number;
  paddingHorizontal?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

export default function BlurredButton({
  text,
  onPress,
  paddingVertical = 10,
  paddingHorizontal = 12,
  borderRadius = 30,
  style,
}: BlurredButtonProps) {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return (
    <TouchableOpacity onPress={onPress}>
      <BlurView
        intensity={80}
        tint={colorScheme === 'dark' ? 'dark' : 'light'}
        style={[
          styles.container,
          {
            borderRadius,
            paddingVertical,
            paddingHorizontal,
            backgroundColor: theme.card,
          },
          style,
        ]}
      >
        <Text style={[styles.text, { color: theme.text }]}>{text}</Text>
      </BlurView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
