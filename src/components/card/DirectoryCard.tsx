import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon,IconProps } from "react-native-elements";
import { ServiceItem } from "@/constants/Directory";

export interface CardCategoryProps {
    id: string,
    target?: ServiceItem,
    name: string,
    style?: StyleProp<ViewStyle>,
    onPress?: (target: any) => void;
    icon: IconProps;
}   

export default class ServiceCategory extends React.Component<CardCategoryProps>{
    constructor(props: CardCategoryProps){
        super(props);
    }
    buttonPress (target: ServiceItem){
        this.props.onPress!(target);
    }
    
    render(){
        const {target, name, icon} = this.props;
        return(
            <TouchableOpacity
            style={[styles.card, this.props.style]}
            onPress={()=>{
                if(this.props.onPress && this.props.target)
                    this.buttonPress(target!)
            }}
            activeOpacity={0.8}
            >
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{name}</Text>
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
    },
    cardTitle: {
      color: 'black',
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
  
