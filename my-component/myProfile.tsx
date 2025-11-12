import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { formatCurrentDate } from '../utils/formatDate'; 
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

type MyProfileProps = {
  imageUrl: ImageSourcePropType | string; 
  name: string;
};

export default function MyProfile({ imageUrl, name }: MyProfileProps) {
  const formattedDate = formatCurrentDate();

 
  const source =
    typeof imageUrl === 'string'
      ? { uri: imageUrl } 
      : imageUrl; 

  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} />
      <View style={[styles.textContainer,{flexDirection:'column' , alignItems:'flex-start'}]}>
        <ThemedText style={styles.name} type='subtitle'>Hello {name}</ThemedText>
        <ThemedText style={styles.time} type='default'>{formattedDate}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    flexDirection:"row",
    gap:5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 35,
    marginBottom: 8,
  },
  textContainer: {
    alignItems: 'center',
  },
  name: {
    // fontSize: 16,
    // fontWeight: '600',
    // color: '#fff',
  },
  time: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 0.5,
  },
});
