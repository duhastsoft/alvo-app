import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleProp, FlatList, StyleSheet, Text, View, ViewStyle
} from 'react-native';
import Button, { ButtonTypes } from '@/components/buttons/Button';

export interface categoryProps {
    category: string
}

export interface ListProps {
    data: Array<categoryProps>; //recibe arreglo de las categorias, o los contactos
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export default function List(props: ListProps) {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.data}
                renderItem={({ item }) => <Text onPress = {props.onPress} style={styles.item}>{item.category}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 14,
        fontSize: 18,
        borderWidth: 0.2,
        borderTopColor: 'white',
        borderBottomColor: '#cfd8dc',
    },
});
