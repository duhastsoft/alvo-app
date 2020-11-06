import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BookMarkImage from '@/assets/images/bookmark-1.png';
import CustomerSupport from '@/assets/images/customer-support-1.png';
import Axios from 'axios';
import DirectoryScroll from '@/components/scroll-views/DirectoryScroll';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '@/types';
import {ListItem,Section,defaultCategory} from '@/constants/Directory';
import LoadingComponent from '@/components/LoadingComponent'
import SearchBarComponent from '@/components/SearchBarComponent';


interface DirectoryProps {
    navigation: StackNavigationProp<BottomTabParamList, 'Directory'>;
}

export default class DirectoryScreen extends React.Component<DirectoryProps>{
    constructor(props: DirectoryProps){
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectService = this.selectService.bind(this);
    }

    state = {
        isLoading: true, 
        search: '', 
        section: Section.Categories,
        target: 0,
        categories: [] as ListItem[],
        dataSource: [] as ListItem[]
    };

    handleBackButtonClick = ()=> {
        this.setState({
            target: 0,
            section: Section.Categories,
            isLoading: false,
            categories: [defaultCategory]
        }, () =>this.loadContent());
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

    searchFilterFunction = (text: string): void =>{
        const searched = text;
        console.log(this.state)
        const newData = this.state.dataSource.filter(function(item) {
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = searched.toUpperCase();
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
        const fetchData = async () =>{
            try{
                const result = await Axios.get(request, { params: { limit: 5 } });
                const itemsArray = (this.state.target==0)? result.data.data: result.data.data.services;
                const newCategories = itemsArray.map((e: ListItem)=>{
                    const formal = e.name[0].toUpperCase() +  e.name.slice(1);
                    return  {
                        name: formal,
                        id: e.id
                    } as ListItem
                });
                const categories = [...newCategories];
                if(this.state.section==Section.Categories)
                    categories.unshift(defaultCategory);
                this.state.dataSource = categories;
                this.setState({categories,isLoading:false});
            }
            catch(err){
                console.log(err);
                this.state.dataSource = [];
                this.setState({categories:[],
                    isLoading:false});
            }
        }
        fetchData();
    }

    componentDidMount(){
        this.loadContent();
    }

    render(){
        const target = 'Service';
        if(this.state.isLoading){
            return(
                <LoadingComponent text={'Loading directory'} />
            )
        }
       return(
        <SafeAreaView style={styles.container} >
            <SearchBarComponent
                onChangeText={this.searchFilterFunction}
                onPress={this.handleBackButtonClick}
                textValue={this.state.search}
                returnButton={(this.state.section==Section.Categories)? false:true}
            />
            <DirectoryScroll 
                image={(this.state.section==Section.Categories)? BookMarkImage : CustomerSupport}
                list={this.state.categories}
                onPressItem={(this.state.section==Section.Categories)? this.selectCategory: this.selectService}
                key={this.state.section}
                style={styles.directoryScroll}
                header={(this.state.section==Section.Categories)?false:true}
            />
        <StatusBar style="auto" />
        </SafeAreaView>
       ) 
    }
}

const styles = StyleSheet.create({
    directoryScroll:{
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
