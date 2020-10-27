import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";


export interface CardCategoryProps {
    image: ImageSourcePropType;
    title: string;
    style?: StyleProp<ViewStyle>;
}

export default function ServiceCategory(props: CardCategoryProps){
    return(
        <TouchableOpacity
        onPress={()=>{alert('Dont touch me')}}
        style={[styles.card, props.style]}
        activeOpacity={0.8}>
            <View style={styles.cardContent}>
                <Image
                style={styles.cardImage} 
                resizeMode="cover"
                source={props.image}
                />
                <Text style={styles.cardTitle}>{props.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
      padding: 16,
      borderRadius: 10,
      backgroundColor: '#fff',
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
        marginEnd: 16
    },
    cardContent:{
        display: "flex", 
        flexDirection: "row",
        padding: 8,
    }
  });
  
