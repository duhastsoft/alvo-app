import ServiceCategory from '@/components/card/ServiceCategory';
import React from 'react';
import {ActivityIndicator, View, StyleSheet, ImageSourcePropType, SafeAreaView, ScrollView} from 'react-native';
import {SearchBar} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import BookMarkImage from '@/assets/images/bookmark-1.png';

const bookmark = BookMarkImage;

export interface Category {
    image: ImageSourcePropType;
    name: string;
    id: number;
}
declare const category: Category;


export default class Directory extends React.Component{
    state = { 
        isLoading: true, 
        search: '', 
        categories: [{
            image: BookMarkImage,
            name: 'Todas las categorias',
            id: 0
        }] as Category[],
        dataSoruce: [] as Category[]
    };

    SearchFilterFunction(text: string) {
        const newData = this.state.dataSoruce.filter(function(item) {
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
            categories: newData,
            search: text
        });
      }

    componentDidMount(){
        fetch('http://192.168.56.1:8080/api/v1/service-category/all')
        .then(response => {
            return response.json();
          })
          .then(myJson => {
            const newCategories = myJson.data.map((e: Category)=>{
                const formal = e.name.charAt(0).toUpperCase() + e.name.slice(1);
                return  {
                    image: BookMarkImage,
                    name: formal,
                    id: e.id
                } as Category
            });
            const categories = [...this.state.categories].concat(newCategories);
            this.state.dataSoruce = categories;
            this.setState({
                categories});
            
            
        }).catch(err=>{
            console.log(err);
        }).finally(()=>{
            this.setState({isLoading:false})
        });
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
            <SearchBar style={styles.searchBar}
            round
            searchIcon={{ size: 24 }}
            onChangeText={text => this.SearchFilterFunction(text)}
            placeholder="Busca aqui..."
            value={this.state.search}
            />
            <ScrollView style={styles.row}>
            {
                this.state.categories.map((option)=>(<ServiceCategory key={option.id} image={option.image} name={option.name}></ServiceCategory>))
            }
            </ScrollView>
        <StatusBar style="auto" />
        </SafeAreaView>
       ) 
    }
}

const styles = StyleSheet.create({
    searchBar:{
        width: '100%',
    },
    row: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 16,
      },
    container: {
      flex: 1,
    },
    cardTitle: {
        color: '#000000',
        textAlign: 'center',
        fontSize: 24
    }
})