
import { Platform, StyleSheet  , View , Dimensions} from 'react-native';
import AppSafeAreaProvider from '@/reuseable/SafeAreaProvider';
import Header from '@/my-component/Header';
import Hero from '@/my-component/Hero';
import Main from '@/my-component/Main';
import AppDetailScrollView from '@/reuseable/AppDetailScrollview';
const { width, height } = Dimensions.get('window');
import * as Network from 'expo-network';
export default function HomeScreen() {
    const scrollHeight = height * 0.85; 
  return (
   <AppSafeAreaProvider>
    <AppDetailScrollView  height={scrollHeight}>
    <View style={{paddingLeft:10 , paddingRight:10}} >
      <Header/>
      <Hero/>
      <Main/>
    </View>
    </AppDetailScrollView>
   </AppSafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
