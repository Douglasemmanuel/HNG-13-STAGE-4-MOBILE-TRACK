import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Card from '@/reuseable/Card'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import BlurredIcon from '@/reuseable/BlurredIcon'
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';
const Hero:React.FC = () => {
 const icons = [
  { name: 'send-outline', label: 'Send' },
  { name: 'arrow-down-circle-outline', label: 'Receive' },
  { name: 'time-outline', label: 'History' },
  { name: 'cash-outline', label: 'Cash' },
];
  const colorScheme = useColorScheme() || 'light';
      const theme = Colors[colorScheme];

  return (
  <View style={{marginTop:10}}>
      <Card intensity={80} >
       <View style={{padding:10}}>
        <View style={{flexDirection:'row' , justifyContent:"space-between"}}>
            <ThemedText type='subtitle'>Current Balance</ThemedText>
            <BlurredIcon 
            name="settings-outline" 
            size={18} 
              backgroundColor="rgba(0,0,0,0.2)"
                intensity={80}
                  borderRadius={15}
            />

        </View>
        <ThemedText type='title' style={{marginTop:8}}>$425,000.00</ThemedText>
        <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:25}}>
      {icons.map((icon, index) => (
        <BlurredIcon
          key={index}
         name={icon.name}
          label={icon.label}
          size={26}
          color={theme.icon}
          backgroundColor="rgba(0,0,0,0.2)"
          intensity={80}
          style={{ marginHorizontal: 10 }}
          borderRadius={15}
        />
      ))}
    </View>
       </View>
    </Card>
  </View>
    
  )
}

export default Hero

const styles = StyleSheet.create({})