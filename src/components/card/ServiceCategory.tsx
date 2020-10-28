import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';


export interface CardCategoryProps {
    index: number,
    image: ImageSourcePropType;
    name: string;
    style?: StyleProp<ViewStyle>,
    navigation: StackNavigationProp<any>;
}   

export default class ServiceCategory extends React.Component<CardCategoryProps>{
    constructor(props: CardCategoryProps){
        super(props);
    }
    buttonPress (indexS: number){
        this.props.navigation.navigate('Home', {index: indexS})
    }
    
    render(){
        return(
            <TouchableOpacity
            style={[styles.card, this.props.style]}
            onPress={()=>this.buttonPress(this.props.index)}
            activeOpacity={0.8}
            >
                <View style={styles.cardContent}>
                    <Image
                    style={styles.cardImage} 
                    resizeMode="cover"
                    source={this.props.image}
                    />
                    <Text style={styles.cardTitle}>{this.props.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
      padding: 16,
      backgroundColor: '#f0ffff',
      width: '100%',
      elevation: 8,
    },
  
    cardTitle: {
      color: '#00848c',
      textAlign: 'left',
      flexBasis: '80%'
    },
    cardImage: {
        padding: 8,
        marginEnd: 16,
        maxWidth:24,
        maxHeight: 24
    },
    cardContent:{
        display: "flex", 
        flexDirection: "row",
        padding: 8,
    }
  });
  
