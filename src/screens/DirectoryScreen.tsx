import React from 'react';
import { StyleSheet, SafeAreaView, Button, View, Alert, Text, TouchableOpacity, StatusBar } from 'react-native';
//import { StatusBar } from 'expo-status-bar';
import Axios from 'axios';
import DirectoryScroll from '@/components/scroll-views/DirectoryScroll';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '@/types';
import BaseButton, { ButtonTypes } from '@/components/buttons/Button';
import { ServiceItem,  Section, 
    defaultCategory, wellWrittenC, wellWrittenS, ListItem, functionCast, defaultCity, defaultState } from '@/constants/Directory';
import LoadingComponent from '@/components/LoadingComponent'
import SearchBarComponent from '@/components/SearchBarComponent';
import {  Icon } from 'react-native-elements'
import FilterCard from '@/components/card/FilterCard';
import Select from '@/components/dropdown/Select';
import constants from '@/constants';
import BottomSheet from '@/components/BottomSheet'; 
import MultiSelect from '@/components/dropdown/MultiSelect';
import { element } from 'prop-types';


interface DirectoryProps {
    navigation: StackNavigationProp<BottomTabParamList, 'Directory'>;
}

export default class DirectoryScreen extends React.Component<DirectoryProps>{
    constructor(props: DirectoryProps) {
        super(props);
        this.selectService = this.selectService.bind(this);
        this.onSelectedItemsChange = this.onSelectedItemsChange.bind(this);
    }

    state = {
        isLoading: true,
        isVisible: false,
        search: {
            text: '',
            filters: [] as ListItem[],
        },
        categories: [] as ListItem[],
        services: [] as ServiceItem[],
        dataSource: [] as ServiceItem[],
        states: [] as ListItem[],
        cities: [] as ListItem[]
    };

    toggleBottomNavigationView = () => {
        this.setState({
            isVisible: !this.state.isVisible
        });
    };

    onSelectedItemsChange(selected: ListItem, filterIndex: number)  {
        const {search} = this.state;
        switch(filterIndex){
            case 0:
                search.filters[filterIndex] = selected;
            break;
            case 1:
                search.filters[filterIndex] = selected;
            break;
        }
        this.state.services = this.state.dataSource;
        this.state.search.text = '';
        this.state.services = this.state.dataSource.filter(e=> {
            return (search.filters[0].index == e.categoryId || search.filters[0].index=='0')
            && (search.filters[1].name == e.states || search.filters[1].index=='0')
            && (search.filters[2].name == e.cities  || search.filters[2].index=='0')
        });
    };

    selectService(target: ServiceItem): void {
        
        const category = this.state.categories.find((e)=>{
            return e.index == target.categoryId;
        });
        this.props.navigation.dangerouslyGetParent()?.navigate('Service', {
            id: target.index, categoryName: category?.name
        });
    }

    searchFilterFunction = (text: string): void => {
        const searched = text;
        const newData = this.state.dataSource.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = searched.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            services: newData,
            search: {...this.state.search, text}
        });
    }

    loadContent() {
        const requestCategories = '/service-category/all';
        const requestServices = '/service/all';
        const fetchData = async () => {
            try {
                const resultCategories = await Axios.get(requestCategories);
                const resultServices = await Axios.get(requestServices);
                const arrayCategories = resultCategories.data.data;
                const newCategories : Array<ListItem> = arrayCategories.map((e:ListItem)=>{
                    return wellWrittenC(e, e.id)
                });
                const categories = [...newCategories];
                categories.unshift(defaultCategory);
                const arrayServices = resultServices.data.data;
                const newServices : Array<ServiceItem> = arrayServices.map((e:ServiceItem)=>{
                    return wellWrittenS(e, e.id);
                });
                const services = [...newServices];
            
                this.state.dataSource = services;
                this.state.categories = categories;
                this.state.services = services;

                this.state.search.filters[0] = defaultCategory;
                const cities: ListItem[] = [];
                cities.push(defaultCity);
                const states: ListItem[] = [];
                states.push(defaultState);
                services.forEach(element=>{	
                    if(!cities.some(e =>e.name==element.cities)){	
                        cities.push({id: 'cities-'+cities.length.toString(), name: element.cities, index: cities.length.toString()});
                    }		
                    if(!states.some(e =>e.name==element.states)){	
                        states.push({id: 'states-'+states.length.toString(), name: element.states, index: cities.length.toString()});
                    }		
                });
                this.state.search.filters[1] = defaultState;
                this.state.search.filters[2] = defaultCity;
                this.state.states = states;
                this.state.cities = cities;
            }
            catch (err) {
                this.state.dataSource = [];
                this.state.services = [];
            }
            finally{
                this.setState({isLoading: false });
            }
        }
        fetchData();
    }

    componentDidMount() {
        this.loadContent();
    }

    render() {
        const { categories, services, isLoading, search, isVisible, cities, states } = this.state;
        if (isLoading) {
            return (<LoadingComponent text={'Loading directory'} />)
        }
        return (
            <SafeAreaView style={styles.container} >
                <StatusBar barStyle="dark-content"/>
                <SearchBarComponent
                    onChangeText={this.searchFilterFunction}
                    textValue={search.text}
                    returnButton={false}
                />

                <FilterCard
                    data={search.filters}
                    onPressFilter={this.toggleBottomNavigationView}
                    icon={{ size: 16, color: constants.colors.darkCyan, name: 'filter', type: 'antdesign' }}
                />
                
                <BottomSheet
                style={styles.bs}
                 isVisible={isVisible}>
                    <View style={styles.bs_container}>
                        <View style={styles.bs_header_container}>
                            <Text style={styles.bs_title}>Filtrar</Text>
                            <View>
                                <Icon name={'close'} type={'antdesign'} size={24} color="gray" onPress={this.toggleBottomNavigationView}  />
                            </View>
                        </View>
                        <View style={styles.bs_body}>
                        <View>
                            <Select 
                            title={'Categoria'}
                            data = {categories}
                            onPressDropdown = {false}
                            filterIndex={0}
                            selectedIndex={search.filters[0].index}
                            onSelectItem={this.onSelectedItemsChange}
                            itemsIcon={{ size: 16, color: constants.colors.darkCyan, name: 'filter', type: 'antdesign' }} />
                        </View>
                        <View>
                            <Select 
                            title={'Departamento'}
                            data = {states}
                            onPressDropdown = {false}
                            filterIndex={1}
                            selectedIndex={search.filters[1].index}
                            onSelectItem={this.onSelectedItemsChange}
                            itemsIcon={{ size: 16, color: constants.colors.darkCyan, name: 'filter', type: 'antdesign' }} />
                        </View>
                        <View>
                            <Select 
                            title={'Municipio'}
                            data = {cities}
                            onPressDropdown = {false}
                            filterIndex={2}
                            selectedIndex={search.filters[2].index}
                            onSelectItem={this.onSelectedItemsChange}
                            itemsIcon={{ size: 16, color: constants.colors.darkCyan, name: 'filter', type: 'antdesign' }} />
                        </View>
                        <BaseButton
                            type={ButtonTypes.YELLOW}
                            title={'Aplicar'}
                            onPressEvent={this.toggleBottomNavigationView}
                        />
                        </View>
                    </View>
                </BottomSheet>

                <DirectoryScroll
                    list={services}
                    onPressItem={this.selectService}
                    key={Section.Categories}
                    style={styles.directoryScroll}
                    header={false}
                />
               
            </SafeAreaView>
        )
    }
}



const styles = StyleSheet.create({
    directoryScroll: {
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    bs: {
        height:500,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 14,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        //borderColor: 'red',
        //borderWidth: 0.2
    },
    bs_container: {
        flex:1,
        flexDirection: 'column',
        //borderColor: 'red',
        //borderWidth: 0.2,
        justifyContent:'space-between'
    },
    bs_header_container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingBottom: 8,
        borderColor: 'white',
        borderBottomColor: '#cfd8dc',
        borderWidth: 1.6,
        marginBottom:20
    },
    bs_body:{
        flex:1,
        flexDirection: 'column',
        justifyContent:'space-between',
    },
    bs_title: {
        fontSize: 28,
        color: constants.colors.darkCyan,
        fontWeight: 'bold',
        //borderColor: 'green',
        //borderWidth: 0.5
    },
    bs_title_icon: {
        //borderColor: 'green',
        //borderWidth: 0.2
    },
    filters_container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 30,
        color: '#00848c',
    },
    badges_text: {
        padding: 2

    }
});
