import { Image } from 'expo-image';
import { Platform, StyleSheet , Dimensions , View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import AppDetailScrollView from '@/reuseable/AppDetailScrollview';
const { width, height } = Dimensions.get('window');
export default function TabTwoScreen() {
     const scrollHeight = height * 0.85; 
  return (
  <AppSafeAreaProvider>
     <AppDetailScrollView  height={scrollHeight}>
       <View style={{paddingLeft:10 , paddingRight:10}} >
     <ThemedText>Hii</ThemedText>
       </View>
     </AppDetailScrollView>
   
  </AppSafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
