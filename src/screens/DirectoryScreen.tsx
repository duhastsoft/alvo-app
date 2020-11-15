import React from 'react';
import { StyleSheet, SafeAreaView, Button, View, Alert, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Axios from 'axios';
import DirectoryScroll from '@/components/scroll-views/DirectoryScroll';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '@/types';
import BaseButton, { ButtonTypes } from '@/components/buttons/Button';
import { CategoryItem, ServiceItem, Section, defaultCategory, wellWrittenC, wellWrittenS } from '@/constants/Directory';
import LoadingComponent from '@/components/LoadingComponent'
import SearchBarComponent from '@/components/SearchBarComponent';
import {  Icon } from 'react-native-elements'
import FilterCard from '@/components/card/FilterCard';
import Select from '@/components/dropdown/Select';
import constants from '@/constants';
import BottomSheet from '@/components/BottomSheet'; 
import MultiSelect from '@/components/dropdown/MultiSelect';


interface DirectoryProps {
    navigation: StackNavigationProp<BottomTabParamList, 'Directory'>;
}

export default class DirectoryScreen extends React.Component<DirectoryProps>{
    constructor(props: DirectoryProps) {
        super(props);
        this.selectService = this.selectService.bind(this);
    }

    state = {
        isLoading: true,
        isVisible: false,
        search: '',
        section: Section.Categories,
        target: '0',
        categories: [] as CategoryItem[],
        services: [] as ServiceItem[],
        dataSource: [] as ServiceItem[]
    };

    toggleBottomNavigationView = () => {
        this.setState({
            isVisible: !this.state.isVisible
        });
    };

    onSelectedItemsChange = (selectedItems: any) => {
        this.setState({ selectedItems });
    };

    selectService(target: string): void {
        this.props.navigation.dangerouslyGetParent()?.navigate('Service', {
            id: target
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
            search: text
        });
    }

    loadContent() {
        const requestCategories = '/service-category/all';
        const requestServices = '/service/all';
        const requestSpecific = '/service-category/' + this.state.target;
        const fetchData = async () => {
            try {
                const resultCategories = await Axios.get(requestCategories);
                const resultServices = await Axios.get(requestServices);
                //const itemsArray = (this.state.target == 0) ? result.data.data : result.data.data.services;
                const arrayCategories = resultCategories.data.data;
                const newCategories = arrayCategories.map((e:CategoryItem)=>wellWrittenC(e));
                const categories = [...newCategories];
                
                const arrayServices = resultServices.data.data;
                const newServices = arrayServices.map((e:ServiceItem)=>wellWrittenS(e));
                const services = [...newServices];
                
                this.state.dataSource = services;
                this.state.categories = categories;
                this.state.services = services;

            }
            catch (err) {
                console.log(err);
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
        const { categories, services, section, isLoading, search, isVisible } = this.state;
        if (isLoading) {
            return (
                <LoadingComponent text={'Loading directory'} />
            )
        }
        return (
            <SafeAreaView style={styles.container} >

                <SearchBarComponent
                    onChangeText={this.searchFilterFunction}
                    textValue={search}
                    returnButton={false}
                />

                <FilterCard
                    data={categories}
                    onDeleteFilterTag={this.toggleBottomNavigationView}
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
                        name={'Categoria'}
                        data = {categories}
                        onPressDropdown = {false}
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
                    key={section}
                    style={styles.directoryScroll}
                    header={(section == Section.Categories) ? false : true}
                />
                <StatusBar style="auto" />
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
