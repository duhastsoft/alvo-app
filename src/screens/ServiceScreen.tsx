import React, { useState, useEffect} from 'react';
import { ActivityIndicator, ImagePropTypes, SectionList, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { RootStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Profile from '@/components/profile/Profile'
import LoadingComponent from '@/components/LoadingComponent';

interface ServiceScreenProps {
    navigator: StackNavigationProp<RootStackParamList, 'Service'>;
    route: RouteProp<RootStackParamList, 'Service'>;
    category: string;
}

interface ProfileData{
    name: string;
    description: string;
    serviceHours: string;
    contactNumber: string;
    address: string;
    contactName: string;
    image: string;
    latitud: string;
    longitude: string;
    priceRange: string;
} 

const defaultData: ProfileData ={
    name : '',
    description : '',
    serviceHours: '',
    contactNumber: '',
    address: '',
    contactName: '',
    image: 'https://reactnative.dev/img/tiny_logo.png',
    latitud: '',
    longitude: '',
    priceRange: '',
}

export default function ServiceScreen(props: ServiceScreenProps){
    const { id } = props.route.params;
    const [profile, setProfile] = useState(defaultData);
    const [didMount, setDidMount] = useState(false); 

    const fetchData = async () => {
        const result = await axios.get(`/service/${id}`);
        const data: ProfileData = result.data.data;
        setProfile(data);
    };
    useEffect(() => {
        setDidMount(true);
        fetchData();
    }, []);
    if (!didMount) {
        return(
            <LoadingComponent  text={'Loading service'}/>
        )
    }
    return(
        <View style={styles.container}>
            <Profile
             key={id}
             name= {profile.name}
             image={profile.image}
             description={profile.description}
             address={profile.address}
             category={props.category}
             hours={profile.serviceHours}
             phone={profile.contactNumber}
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
    }
  });