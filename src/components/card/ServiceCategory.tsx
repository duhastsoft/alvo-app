import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";


export interface CardCategoryProps {
    image: ImageSourcePropType;
    name: string;
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
                <Text style={styles.cardTitle}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
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
  
