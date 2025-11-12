import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

type BackButtonProps = {
  size?: number;
  color?: string;
  backgroundColor?: string;
  intensity?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
};

export default function BackButton({
  size = 24,
  color = '#fff',
  backgroundColor = 'rgba(255,255,255,0.1)',
  intensity = 50,
  style,
  onPress,
}: BackButtonProps) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); 
    } else {
      navigation.goBack(); 
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <BlurView
        intensity={intensity}
        tint="light"
        style={[
          styles.container,
          { width: size * 2, height: size * 2, borderRadius: size, backgroundColor },
          style,
        ]}
      >
        <Ionicons name="chevron-back" size={size} color={color} />
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
})