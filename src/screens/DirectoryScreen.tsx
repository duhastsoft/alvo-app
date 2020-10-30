import React from 'react';
import {ActivityIndicator, View, StyleSheet, ImageSourcePropType, SafeAreaView, BackHandler} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import BookMarkImage from '@/assets/images/bookmark-1.png';
import CustomerSupport from '@/assets/images/customer-support-1.png';
import Axios from 'axios';
import DirectoryScroll from '@/components/scroll-views/DirectoryScroll';


interface ListItem {
    name: string;
    id: number;
}

const defaultCategory: ListItem = {
    name: 'TODAS LAS CATEGORIAS',
    id: 0
}

export default class DirectoryScreen extends React.Component{
    constructor(props: {}){
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    state = {
        isLoading: true, 
        search: '', 
        section: 1,
        target: 0,
        categories: [] as ListItem[],
        dataSoruce: [] as ListItem[]
    };


    handleBackButtonClick() {
        this.setState({
            target: 0,
            section: 1,
            isLoading: false,
            categories: [defaultCategory]
        }, () =>this.loadContent());
        return true;
    }

    selectCategory (target: number){
        this.setState({
            target,
            section: 2,
            isLoading: false,
            categories: []
        }, () =>this.loadContent());
    }
    selectService(target: number){

    }

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

    

    loadContent(){
        const request = (this.state.section==1)? 
        '/service-category/all': (this.state.target==0)? 
        '/service/all':'/service-category/'+this.state.target;;
        Axios.get(request, { params: { limit: 5 } })
        .then(myJson => {
            const itemsArray = (this.state.target!=0)? myJson.data.data.services : myJson.data.data;
            const newCategories = itemsArray.map((e: ListItem)=>{
                const formal = e.name.toUpperCase();
                return  {
                    name: formal,
                    id: e.id
                } as ListItem
            });
            const categories = [...newCategories];
            if(this.state.section==1)
                categories.unshift(defaultCategory);
            this.state.dataSoruce = categories;
            this.setState({categories,
                isLoading:false});
        }).catch(err=>{
            console.log(err);
            this.state.dataSoruce = [];
            this.setState({categories:[],
                isLoading:false});
        })
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.loadContent();
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    render(){
        const target = 'Service';
        if(this.state.isLoading){
            return(
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }

       return(
        <SafeAreaView style={styles.container} >
            <View style={styles.searchHeader}>
                <View style={(this.state.section==2)? styles.viewIcon:styles.viewNoIcon} >
                    <Icon style={styles.icon}
                    name={'chevron-left'} 
                    onPress={ () => { this.handleBackButtonClick() } }  />
                </View>
                <View style={styles.searchBar}>
                    <SearchBar 
                    
                    searchIcon={{ size: 24 }}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    placeholder="Busca aqui..."
                    value={this.state.search}
                    />
                </View>
            </View>
            <DirectoryScroll 
                style={styles.directoryScroll}
                image={(this.state.section==1)? BookMarkImage : CustomerSupport}
                list={this.state.categories}
                onPressItem={(this.state.section==1)? this.selectCategory: this.selectService}
                key={this.state.section}
            />
        <StatusBar style="auto" />
        </SafeAreaView>
       ) 
    }
}

const styles = StyleSheet.create({
    searchHeader:{
        flexDirection: "row",
        width: '100%',
        flexWrap: 'wrap',
    },
    directoryScroll:{
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    searchBar:{
        flex: 1,
        flexGrow: 8,
        elevation: 4,
    },
    viewIcon:{
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#9e9e9e',
        elevation: 4,
    },
    viewNoIcon:{
        display: 'none'
    },
    icon:{
        width: '100%',
        height: '100%',
        padding: 16
    },
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})