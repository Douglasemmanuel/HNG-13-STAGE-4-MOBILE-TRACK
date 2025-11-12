import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AlertBell from '@/reuseable/AlertBell'
import MyProfile from './myProfile'
const Header:React.FC = () => {
  return (
    <View style={{flexDirection:'row' , justifyContent:"space-between"}}>
        <MyProfile
           imageUrl={require('../assets/images/Douglas.jpeg')}
        name="Douglas"
        />
     <AlertBell size={28} count={3} intensity={40}/>
    </View>
  )
}


export default Header

const styles = StyleSheet.create({})