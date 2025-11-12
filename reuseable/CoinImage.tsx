import React from 'react';
import { View, StyleSheet, Image, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';

type BlurredImageProps = {
  imageSource: ImageSourcePropType;
  width?: number;
  height?: number;
  borderRadius?: number;
  intensity?: number;
  style?: StyleProp<ViewStyle>;
};

export default function CoinImage({
  imageSource,
  width = 150,
  height = 150,
  borderRadius = 15,
  intensity = 50,
  style,
}: BlurredImageProps) {
  return (
    <BlurView
      intensity={intensity}
      tint="light"
      style={[
        styles.container,
        { width, height, borderRadius },
        style,
      ]}
    >
      <Image
        source={imageSource}
        style={{ width: '100%', height: '100%', borderRadius }}
        resizeMode="cover"
      />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden', // required for blur on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4, // Android shadow
  },
});
