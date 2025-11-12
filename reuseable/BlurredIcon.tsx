import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

type BlurredIconProps = {
  name: string; 
  size?: number;
  color?: string;
  backgroundColor?: string;
  intensity?: number;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
  label?: string; // optional name/text under the icon
  labelColor?: string;
  labelSize?: number;
};

export default function BlurredIcon({
  name,
  size = 24,
  color = '#fff',
  backgroundColor = 'rgba(255,255,255,0.1)',
  intensity = 50,
  style,
  borderRadius,
  label,
  labelColor = '#fff',
  labelSize = 12,
}: BlurredIconProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      <BlurView
        intensity={intensity}
        tint="light"
        style={[
          styles.container,
          { width: size * 2, height: size * 2, borderRadius: borderRadius || size, backgroundColor },
          style,
        ]}
      >
        <Ionicons name={name as React.ComponentProps<typeof Ionicons>['name']} size={size} color={color} />
      </BlurView>
      {label && <Text style={{ color: labelColor, fontSize: labelSize, marginTop: 6 }}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // required for blur on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, // Android shadow
  },
});
