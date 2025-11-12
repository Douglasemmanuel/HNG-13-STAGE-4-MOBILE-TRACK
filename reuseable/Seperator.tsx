import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export const Separator:React.FC = () => {
  const colorScheme = useColorScheme() || 'light';
  const theme = Colors[colorScheme];

  return <View style={[styles.separator, { backgroundColor: theme.tint }]} />;
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    width: '100%',
    borderStyle: 'dashed',
  },
});
