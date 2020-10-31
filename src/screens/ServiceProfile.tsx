import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { DirectoryStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Profile from '@/components/profile/Profile'
import TireImage from '@/assets/images/tire-1.png';

interface ServiceProfileProps {
    navigator: StackNavigationProp<DirectoryStackParamList, 'ServiceProfile'>;
    route: RouteProp<DirectoryStackParamList, 'ServiceProfile'>;
  }

//se tendria que recibir info de perfil desde vista DirectorybyCategory
const profileData ={
    name: 'Super Repuestos',
    image: TireImage,
};
    

export default function ServiceProfile(){
    return(
        <View style={styles.container}>
            <Profile
             name= {profileData.name}
             image={TireImage}
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