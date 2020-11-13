import React, { Component, useState } from 'react';
import { StyleSheet, SafeAreaView, Button, View, Alert, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import BookMarkImage from '@/assets/images/bookmark-1.png';
import CustomerSupport from '@/assets/images/customer-support-1.png';
import Axios from 'axios';
import DirectoryScroll from '@/components/scroll-views/DirectoryScroll';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '@/types';
import BaseButton, { ButtonTypes } from '@/components/buttons/Button';
import { ListItem, Section, defaultCategory } from '@/constants/Directory';
import LoadingComponent from '@/components/LoadingComponent'
import SearchBarComponent from '@/components/SearchBarComponent';
import { BottomSheet, Icon, Avatar, Badge, withBadge } from 'react-native-elements'
import FilterCard from '@/components/card/FilterCard';
import constants from '@/constants';

import List from '@/components/list/List'


interface DirectoryProps {
    navigation: StackNavigationProp<BottomTabParamList, 'Directory'>;
}

export default class DirectoryScreen extends React.Component<DirectoryProps>{
    constructor(props: DirectoryProps) {
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
        this.selectService = this.selectService.bind(this);
    }

    state = {
        isLoading: true,
        isVisible: false,
        selectedItems: [],
        search: '',
        section: Section.Categories,
        target: 0,
        categories: [] as ListItem[],
        dataSource: [] as ListItem[]
    };

    handleBackButtonClick = () => {
        this.setState({
            target: 0,
            section: Section.Categories,
            isLoading: false,
            categories: [defaultCategory]
        }, () => this.loadContent());
    }

    toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        this.setState({
            isVisible: !this.state.isVisible
        });
    };
    onSelectedItemsChange = (selectedItems: any) => {
        this.setState({ selectedItems });
    };

    selectCategory(target: number): void {
        this.setState({
            target,
            section: Section.Services,
            isLoading: false,
            categories: []
        }, () => this.loadContent());
    }

    selectService(target: number): void {
        this.props.navigation.dangerouslyGetParent()?.navigate('Service', {
            id: target
        });
    }

    searchFilterFunction = (text: string): void => {
        const searched = text;
        console.log(this.state)
        const newData = this.state.dataSource.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = searched.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            categories: newData,
            search: text
        });
    }

    loadContent() {
        const request = (this.state.section == Section.Categories) ?
            '/service-category/all' : (this.state.target == 0) ?
                '/service/all' : '/service-category/' + this.state.target;
        const fetchData = async () => {
            try {
                const result = await Axios.get(request, { params: { limit: 5 } });
                const itemsArray = (this.state.target == 0) ? result.data.data : result.data.data.services;
                const newCategories = itemsArray.map((e: ListItem) => {
                    const formal = e.name[0].toUpperCase() + e.name.slice(1);
                    return {
                        name: formal,
                        id: e.id
                    } as ListItem
                });
                const categories = [...newCategories];
                if (this.state.section == Section.Categories)
                    categories.unshift(defaultCategory);
                this.state.dataSource = categories;
                this.setState({ categories, isLoading: false });
            }
            catch (err) {
                console.log(err);
                this.state.dataSource = [];
                this.setState({
                    categories: [],
                    isLoading: false
                });
            }
        }
        fetchData();
    }

    componentDidMount() {
        this.loadContent();
    }

    render() {
        const { selectedItems } = this.state;
        const items = [{
            id: '92iijs7yta',
            name: 'Ondo'
        }, {
            id: 'a0s0a8ssbsd',
            name: 'Ogun'
        }, {
            id: '16hbajsabsd',
            name: 'Calabar'
        }, {
            id: 'nahs75a5sg',
            name: 'Lagos'
        }, {
            id: '667atsas',
            name: 'Maiduguri'
        }, {
            id: 'hsyasajs',
            name: 'Anambra'
        }, {
            id: 'djsjudksjd',
            name: 'Benue'
        }, {
            id: 'sdhyaysdj',
            name: 'Kaduna'
        }, {
            id: 'suudydjsjd',
            name: 'Abuja'
        }
        ];
        const chips = [{ id: '0', value: 'List Item 1' },
        { id: '1', value: 'List Item 2' },]
        const list = [
            { key: '0', category: 'List Item 1' },
            { key: '1', category: 'List Item 2' },
            {
                key: '2', category: 'Cancel',
                containerStyle: { backgroundColor: 'red' },
                titleStyle: { color: 'white' },
                onPress: () => this.toggleBottomNavigationView,
            },
        ];
        const target = 'Service';
        if (this.state.isLoading) {
            return (
                <LoadingComponent text={'Loading directory'} />
            )
        }
        if (this.state.isVisible) {
            return (
                <BottomSheet modalProps={{
                    onRequestClose: () => {
                        Alert.alert("Modal has been closed.");
                    }
                }} isVisible={this.state.isVisible}>
                    <View style={styles.bs_container}>
                        <View style={styles.bs_title_container}>
                            <Text style={styles.bs_title}>Filtrar</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <Icon name={'close'} type={'antdesign'} size={24} color="gray" onPress={this.toggleBottomNavigationView} />
                            </View>
                        </View>
                        <BaseButton
                            type={ButtonTypes.PRIMARY}
                            title={'Aplicar'}
                            onPressEvent={this.toggleBottomNavigationView}
                        />
                    </View>
                </BottomSheet>
            );
        }
        return (
            <SafeAreaView style={styles.container} >

                <SearchBarComponent
                    onChangeText={this.searchFilterFunction}
                    onPress={this.handleBackButtonClick}
                    textValue={this.state.search}
                    returnButton={(this.state.section == Section.Categories) ? false : true}
                />

                <FilterCard
                    onPressFilter={this.toggleBottomNavigationView}
                    icon={{ size: 16, color: constants.colors.darkCyan, name: 'filter', type: 'antdesign' }}
                />
                <DirectoryScroll
                    image={(this.state.section == Section.Categories) ? BookMarkImage : CustomerSupport}
                    list={this.state.categories}
                    onPressItem={(this.state.section == Section.Categories) ? this.selectCategory : this.selectService}
                    key={this.state.section}
                    style={styles.directoryScroll}
                    header={(this.state.section == Section.Categories) ? false : true}
                />

                <TouchableOpacity>
                    <View>

                    </View>
                </TouchableOpacity>

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
    bs_container: {
        flex: 2,
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 14,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderColor: 'red',
        borderWidth: 0.2
    },
    bs_title_container: {
        flex: 1,
        flexDirection: 'row',
        paddingBottom: 8,
        alignItems: 'center',
        borderColor: 'white',
        borderBottomColor: '#cfd8dc',
        borderWidth: 1.6
    },
    bs_title: {
        fontSize: 28,
        color: 'black',
        fontWeight: 'bold',
        borderColor: 'green',
        borderWidth: 0.2
    },
    bs_title_icon: {
        alignSelf: 'flex-end',
        borderColor: 'green',
        borderWidth: 0.2
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
