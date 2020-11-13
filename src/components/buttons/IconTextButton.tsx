import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, IconProps, Button } from "react-native-elements";
import constants from '@/constants';

export interface IconTextProps {
    name: string,
    style?: StyleProp<ViewStyle>,
    onPress: () => void;
    icon: IconProps;
}

export default function ServiceCategory(props: IconTextProps) {
    return (
        <Button
            raised={true}
            buttonStyle={styles.button}
            title={props.name}
            titleStyle={styles.title}
            onPress={props.onPress}
            icon={<Icon
                name={props.icon.name} type={props.icon.type} size={props.icon.size} color={props.icon.color}/>}
        />
    )
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
        fontSize: 16,
        paddingLeft: 4,

    },
    cardContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
    },
    button:{
        backgroundColor:'white',
        borderRadius:20,
        paddingHorizontal:12,
        paddingVertical:4
    },
    title:{
        color: constants.colors.darkCyan,
        fontSize:14,
        fontWeight:'bold',
        paddingLeft:6,
        paddingVertical:6
    }
});

