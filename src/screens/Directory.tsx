import ServiceCategory from '@/components/card/ServiceCategory';
import React from 'react';
import {ActivityIndicator, View, StyleSheet, ImageSourcePropType, SafeAreaView, ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import BookMarkImage from '@/assets/images/bookmark-1.png';

const bookmark = BookMarkImage;

export interface Category {
    image: ImageSourcePropType;
    title: string;
    id: number;
}
declare const category: Category;


export default class Directory extends React.Component{
    state = { 
        isLoading: true, 
        search: '', 
        categories: [{
            image: BookMarkImage,
            title: 'All categories',
            id: 0
        }] as Category[]
    };
    componentDidMount(){
        this.setState({isLoading:false});
    }
    render(){
        
        if(this.state.isLoading){
            return(
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
       return(
        <SafeAreaView style={styles.container} >
            <SearchBar style={styles.searchBar}/>
            <ScrollView style={styles.row}>
            {
                this.state.categories.map((option)=>(<ServiceCategory key={option.id} image={option.image} title={option.title}></ServiceCategory>))
            }
            </ScrollView>
        <StatusBar style="auto" />
        </SafeAreaView>
       ) 
    }
}

const styles = StyleSheet.create({
    searchBar:{
        width: '100%'
    },
    row: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 16,
      },
    container: {
      flex: 1,
      padding: 16,
    },
    cardTitle: {
        color: '#FFFFF',
        textAlign: 'center',
        fontSize: 24
    }
})