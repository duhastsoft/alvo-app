import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon,IconProps } from "react-native-elements";

export interface CardCategoryProps {
    id: string,
    name: string,
    style?: StyleProp<ViewStyle>,
    onPress?: (index: string) => void;
    icon: IconProps;
}   

export default class ServiceCategory extends React.Component<CardCategoryProps>{
    constructor(props: CardCategoryProps){
        super(props);
    }
    buttonPress (indexS: string){
        this.props.onPress!(indexS);
    }
    
    render(){
        const {id, name, icon} = this.props;
        return(
            <TouchableOpacity
            style={[styles.card, this.props.style]}
            onPress={()=>{
                if(this.props.onPress)
                    this.buttonPress(id)
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
  
