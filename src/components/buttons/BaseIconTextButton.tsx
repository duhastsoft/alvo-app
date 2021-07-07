import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, IconProps, Button } from "react-native-elements";
import constants from '@/constants';

export interface IconTextProps {
    name: string,
    style?: StyleProp<ViewStyle>,
    onPressEvent: () => void;
    icon: IconProps;
}

export default function IconText(props: IconTextProps) {
    return (
        <TouchableOpacity
            onPress={props.onPressEvent}
            style={[styles.button]}
            activeOpacity={0.9}
        >

            <View style={styles.cardContent}>

                <Icon name={props.icon.name} type={props.icon.type} size={24} color={props.icon.color} />
                <Text style={styles.title}>{props.name}</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: constants.colors.darkCyan,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        width:'100%',
        elevation: 4,
    ...constants.styles.iosElevation4,
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        paddingLeft: 6,
        textTransform: 'uppercase',
    },
    cardContent:{
        display: "flex", 
        flexDirection: "row",
        alignItems:'center',
        justifyContent:'center'
    }
});

