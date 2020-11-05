import React from 'react';
import {ActivityIndicator, View, StyleSheet, SafeAreaView} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import BookMarkImage from '@/assets/images/bookmark-1.png';
import CustomerSupport from '@/assets/images/customer-support-1.png';
import Axios from 'axios';
import DirectoryScroll from '@/components/scroll-views/DirectoryScroll';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '@/types';
import {ListItem,Section,defaultCategory} from '@/constants/Directory';


interface DirectoryProps {
    navigation: StackNavigationProp<BottomTabParamList, 'Directory'>;
}

export default class DirectoryScreen extends React.Component<DirectoryProps>{
    constructor(props: DirectoryProps){
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectService = this.selectService.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    state = {
        isLoading: true, 
        search: '', 
        section: Section.Categories,
        target: 0,
        categories: [] as ListItem[],
        dataSoruce: [] as ListItem[]
    };

    handleBackButtonClick(): void {
        try{
            this.setState({
                target: 0,
                section: Section.Categories,
                isLoading: false,
                categories: [defaultCategory]
            }, () =>this.loadContent());
        }
        catch(err){
            console.log(err);
        }
    }

    selectCategory (target: number): void{
        this.setState({
            target,
            section: Section.Services,
            isLoading: false,
            categories: []
        }, () =>this.loadContent());
    }

    selectService(target: number): void{
        this.props.navigation.dangerouslyGetParent()?.navigate('Service', {
            id: target
        });
    }

    SearchFilterFunction(text: string): void {
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
        const request = (this.state.section==Section.Categories)? 
        '/service-category/all': (this.state.target==0)? 
        '/service/all':'/service-category/'+this.state.target;
        Axios.get(request, { params: { limit: 5 } })
        .then(myJson => {
            const itemsArray = (this.state.target==0)? myJson.data.data: myJson.data.data.services;
            const newCategories = itemsArray.map((e: ListItem)=>{
                const formal = e.name.toUpperCase();
                return  {
                    name: formal,
                    id: e.id
                } as ListItem
            });
            const categories = [...newCategories];
            if(this.state.section==Section.Categories)
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
        this.loadContent();
    }

    componentWillUnmount(){
   
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
                <View style={(this.state.section==Section.Services)? styles.viewIcon:styles.viewNoIcon} >
                    <Icon style={styles.icon}
                    name={'chevron-left'} 
                    onPress={this.handleBackButtonClick}  
                />
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
                image={(this.state.section==Section.Categories)? BookMarkImage : CustomerSupport}
                list={this.state.categories}
                onPressItem={(this.state.section==Section.Categories)? this.selectCategory: this.selectService}
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
        justifyContent: 'center'
    },
    viewNoIcon:{
        display: 'none'
    },
    icon:{
        width: '100%',
        padding: 16
    },
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
