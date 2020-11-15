import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle, StyleProp, Alert, Text, FlatList } from "react-native";
import { Icon, IconProps } from "react-native-elements";
import constants from '@/constants';
import {CategoryItem} from '@/constants/Directory'

//tags of selected filter appear on the left side and filter button on the right side
export interface SelectProps {
    name: string;
    style?: StyleProp<ViewStyle>,
    data?: Array<CategoryItem>;
    onPressDropdown: boolean;
    onSelectItem?: (index: string) => void;
    itemsIcon: IconProps;
}

export default class Select extends React.Component<SelectProps>{
    constructor(props: SelectProps) {
        super(props);
    }

    state = {
        onPressDropdown: false,
        color: '#cfd8dc',
        itemSelected:{
            
        }
    }

    dropdownListView = () => {
        //Toggling the visibility state of the bottom sheet
        this.setState({
            onPressDropdown: !this.state.onPressDropdown,
        });
        this.changeColor();
    };
    itemPress(indexS: string) {
        this.props.onSelectItem!(indexS);
        this.dropdownListView();
    }

    changeColor(){
        if(this.state.onPressDropdown){
            this.setState({
                color: constants.colors.darkCyan
            });
        } else {
            this.setState({
                color: '#cfd8dc'
            });
        }
    };

    renderItem = ({ item }: { item: CategoryItem }) => (
        <TouchableOpacity
                        style={[styles.item, this.props.style,{backgroundColor:'rgba(0, 132, 140,0.2)'}]}
                        onPress={() => {
                            if (this.props.onSelectItem)
                                this.itemPress(item.id.toString());
                        }}
                        activeOpacity={0.8}
>
                        <View style={styles.cardContent}>
                            <Text style={styles.dropdown_placeholder}>{item.name}</Text>
                            <Icon
                                name={'check'} type={'feather'} size={24} color={this.props.itemsIcon.color} />

                        </View>
                    </TouchableOpacity>
    )

    render() {
        if (this.state.onPressDropdown){
            return(
                <View
                style={[styles.card, this.props.style]}
            >
                <Text style={styles.dropdown_title}>{this.props.name}</Text>
                <View style={[styles.dropdown_header,{borderColor:this.state.color}]}>
                    <Text style={styles.dropdown_placeholder}>{this.props.name}</Text>
                    <Icon
                        name='ios-arrow-down' type='ionicon' size={24} color={this.state.color} onPress={this.dropdownListView}/>
                </View>
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
            <View
                style={[styles.card, this.props.style]}
            >
                <Text style={styles.dropdown_title}>{this.props.name}</Text>
                <View style={[styles.dropdown_header,{borderColor:this.state.color}]}>
                    <Text style={styles.dropdown_placeholder}>{this.props.name}</Text>
                    <Icon
                        name='ios-arrow-down' type='ionicon' size={24} color={this.state.color} onPress={this.dropdownListView} style={{ //borderColor: 'green',
                        //borderWidth: 0.5
                    }}/>
                </View>
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
    }
});