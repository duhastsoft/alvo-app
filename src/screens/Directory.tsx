import React from 'react';
import {ActivityIndicator, View, StyleSheet, ImageSourcePropType, SafeAreaView, BackHandler} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import BookMarkImage from '@/assets/images/bookmark-1.png';
import CustomerSupport from '@/assets/images/customer-support-1.png';
import Axios from 'axios';
import DirectoryScroll from '@/components/scroll-views/DirectoryScroll';


interface ListItem {
    image: ImageSourcePropType;
    name: string;
    id: number;
}

const defaultCategory: ListItem = {
    image: BookMarkImage,
    name: 'Todas las categorias',
    id: 0
}

export default class Directory extends React.Component{
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
        categories: [defaultCategory] as ListItem[],
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
        const recived = target;
        this.setState({
            target: recived,
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
        const base = (this.state.section==1) ? '/service-category/all':  '/service';
        const target = (this.state.section==2) ? 
        (this.state.target==0)? '/all' :'/'+this.state.target 
        : '' ;
        const request = base + target;
        Axios.get(request, { params: { limit: 5 } })
        .then(myJson => {
            const newCategories = myJson.data.data.map((e: ListItem)=>{
                const formal = e.name.charAt(0).toUpperCase() + e.name.slice(1);
                return  {
                    name: formal,
                    id: e.id
                } as ListItem
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
            <View style={styles.searchView}>
                <Icon style={styles.icon} name={'chevron-left'} onPress={ () => { this.handleBackButtonClick() } }  />
                <SearchBar style={styles.searchBar}
                searchIcon={{ size: 24 }}
                onChangeText={text => this.SearchFilterFunction(text)}
                placeholder="Busca aqui..."
                value={this.state.search}
                />
            </View>
            <DirectoryScroll 
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
    searchBar:{
        flexBasis: '80%'
    },
    icon:{
        maxWidth:24,
        maxHeight: 24,
        flexBasis: '20%'
    },
    row: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 16,
    },
    searchView:{
        display: 'flex', 
        flexDirection: 'row'
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