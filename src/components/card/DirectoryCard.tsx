import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon,IconProps } from "react-native-elements";

export interface CardCategoryProps {
    index: number,
    name: string;
    style?: StyleProp<ViewStyle>,
    onPress?: (index: number) => void;
    icon_name: string;
    icon_type: string;
}   

export default class ServiceCategory extends React.Component<CardCategoryProps>{
    constructor(props: CardCategoryProps){
        super(props);
    }
    buttonPress (indexS: number){
        this.props.onPress!(indexS);
    }
    
    render(){
        return(
            <TouchableOpacity
            style={[styles.card, this.props.style]}
            onPress={()=>{
                if(this.props.onPress)
                    this.buttonPress(this.props.index)
            }}
            activeOpacity={0.8}
            >
                <View style={styles.cardContent}>

                    <Icon name={this.props.icon_name} type={this.props.icon_type} size={24} color="gray" />
                    <Text style={styles.cardTitle}>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
      padding: 14,
      backgroundColor: '#ffffff',
      width: '100%',
      elevation: 8,
    },
    cardTitle: {
      color: '#00848c',
      textAlign: 'left',
      flexBasis: '80%',
      fontSize:16,
      paddingLeft:4,
        
    },
    cardContent:{
        display: "flex", 
        flexDirection: "row",
        alignItems:'center'
    }
  });
  
