import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle, StyleProp, Alert, Text, FlatList } from "react-native";
import { Icon, IconProps } from "react-native-elements";
import constants from '@/constants';
import {ListItem} from '@/constants/Directory'

//tags of selected filter appear on the left side and filter button on the right side
export interface SelectProps {
    title: string;
    style?: StyleProp<ViewStyle>,
    data?: Array<ListItem>;
    onPressDropdown: boolean;
    selectedIndex: string;
    filterIndex: number;
    onSelectItem: (index: ListItem, filterI: number) => void;
    itemsIcon: IconProps;
}

export default class Select extends React.Component<SelectProps>{
    constructor(props: SelectProps) {
        super(props);
    }

    state = {
        onPressDropdown: false,
        color: '#cfd8dc',
        currentSelected: this.props.data?.find(e=>e.id==this.props.selectedIndex) as ListItem
    }

    dropdownListView = () => {
        //Toggling the visibility state of the bottom sheet
        const color = (this.state.onPressDropdown) ? constants.colors.darkCyan: '#cfd8dc';
        this.setState({
            onPressDropdown: !this.state.onPressDropdown,
            color,
        });
    };
    itemPress(indexS: string) {
        const selected = this.props.data?.find(e=>e.id==indexS) as ListItem;
        this.props.onSelectItem(selected, this.props.filterIndex);
        this.dropdownListView();
        this.setState({currentSelected: selected});
    }

    renderItem = ({ item }: { item: ListItem }) => (
        <TouchableOpacity
                style={[this.props.style, (this.state.currentSelected.id==item.id)?styles.item_selected:styles.item]}
                onPress={() => {this.itemPress(item.id);
                }}
                activeOpacity={0.8}
>
                <View style={styles.cardContent}>
                    <Text style={styles.dropdown_placeholder}>{item.name}</Text>
                    {this.state.currentSelected.id==item.id &&
                    <Icon name={'check'} type={'feather'} size={24} color={this.props.itemsIcon.color} />
                    }
                </View>
        </TouchableOpacity>
    )

    render() {
        if (this.state.onPressDropdown){
            return(
                <View style={[styles.card, this.props.style]}>
                <Text style={styles.dropdown_title}>{this.props.title}</Text>
                <TouchableOpacity style={[styles.dropdown_header,{borderColor:this.state.color}]} onPress={this.dropdownListView}>
                    <Text style={styles.dropdown_placeholder}>{this.state.currentSelected.name}</Text>
                    <Icon
                        name='ios-arrow-down' type='ionicon' size={24} color={this.state.color} />
                </TouchableOpacity>
                <FlatList
                style={{
                    //backgroundColor: 'green',
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    height:140,
                }}
                data={this.props.data}
                keyExtractor={item => item.id.toString()}
                        renderItem={this.renderItem}

            />
            </View>
            );
            
        }else{ 
        return (
            <View style={[styles.card, this.props.style]}>
                <Text style={styles.dropdown_title}>{this.props.title}</Text>
                <TouchableOpacity style={[styles.dropdown_header,{borderColor:this.state.color}]} onPress={this.dropdownListView} >
                    <Text style={styles.dropdown_placeholder}>{this.state.currentSelected.name}</Text>
                    <Icon
                        name='ios-arrow-down' type='ionicon' size={24} color={this.state.color} 
                        style={{ //borderColor: 'green',
                        //borderWidth: 0.5
                    }}/>
                </TouchableOpacity>
            </View>
        );}
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        width: '100%',
        marginBottom:14
    },
    cardTitle: {
        color: '#00848c',
        textAlign: 'left',
        flexBasis: '80%',
        fontSize: 16,
        paddingLeft: 4,

    },
    dropdown_header: {
        display: "flex",
        flexDirection: "row",
        borderColor:'#cfd8dc',
        borderWidth: 1.6,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical:10,
        justifyContent:'space-between',
    },
    dropdown_title:{
        fontSize:18,
        color:'gray',
        fontWeight:'bold',
        marginBottom:12
    },
    dropdown_placeholder:{
        fontSize:18,
        color:'gray',
        //borderColor: 'green',
        //borderWidth: 0.5
    },
    cardContent: {
        color: '#00848c',
        display: "flex",
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical:10,
        justifyContent:'space-between'
    },
    item:{
        backgroundColor: 'white',
        width: '100%',
    },
    item_selected:{
        backgroundColor: 'rgba(0, 132, 140,0.2)',
        width: '100%',
    },
    no_visible:{
        display: "none"
    }
});