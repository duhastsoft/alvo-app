import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleProp, FlatList, StyleSheet, Text, View, ViewStyle
} from 'react-native';

export interface TitleProps {
    title: string
}
export interface ListProps {
    data: Array<TitleProps>; //recibe arreglo de las categorias, o los contactos
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export default function List(props: ListProps) {
    return (
        <View style={styles.container}>
            <FlatList
                data={props.data}
                renderItem={({ item }) => <Text onPress = {props.onPress} style={styles.item}>{item.title}</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
