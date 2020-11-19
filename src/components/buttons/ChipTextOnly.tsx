import constants from '@/constants';
import React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, IconProps, Button } from "react-native-elements";

//small tags with text and cancel button
export interface ChipProps {
    name: string,
    style?: StyleProp<ViewStyle>,
}

export default function Chip(props: ChipProps) {
    return (
        <View style={styles.chip_container}>
            <Text style={styles.title}>{props.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    chip_container:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: constants.colors.darkCyan,
        borderRadius: 30,
        paddingHorizontal:12,
        paddingVertical:6,
        marginHorizontal:4
        
    },
    title:{
        color: 'white',
        fontSize:14,
        paddingRight:6,
        paddingVertical:1
    },
});

