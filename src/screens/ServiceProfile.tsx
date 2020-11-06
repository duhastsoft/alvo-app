import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { DirectoryStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Profile from '@/components/profile/Profile'
import StopImage from '@/assets/images/Android-L-Material-Design-Wallpapers-5.png';

interface ServiceProfileProps {
    navigator: StackNavigationProp<DirectoryStackParamList, 'ServiceProfile'>;
    route: RouteProp<DirectoryStackParamList, 'ServiceProfile'>;
  }

//se tendria que recibir info de perfil desde vista DirectorybyCategory
const profileData ={
    name: 'Super Repuestos',
    image: StopImage,
    description: 'Venta oportuna de repuestos automotrices de calidad en la región centroamericana.',
    hours: '7:00AM - 8:00PM',
    address: 'Carretera Panamericana, Av. Los proceres, San Salvador, local 14',
    phone: '2234 4231',
    category: 'Repuestos',
};
    

export default function ServiceProfile(){
    return(
        <View style={styles.container}>
            <Profile
             name= {profileData.name}
             image={profileData.image}
             description={profileData.description}
             hours = {profileData.hours}
             address = {profileData.address}
             phone = {profileData.phone}
             category = {profileData.category}
            />
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
     flex: 1,
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });