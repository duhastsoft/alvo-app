import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleProp, FlatList, StyleSheet, Text, View, ViewStyle, TouchableOpacity
} from 'react-native';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import { IconProps,Icon } from 'react-native-elements';

export interface ItemProps {
    id: string;
    name: string;
}


export interface ListProps {
    data?: Array<ItemProps>; //recibe arreglo de las categorias, o los contactos
    style?: StyleProp<ViewStyle>;
    onSelectItem?: () => void;
    icon: IconProps;
}

export default function List(props: ListProps) {
    return (
        <View style={styles.container}>
            <FlatList
                        style={{
                            backgroundColor: 'white',
                            paddingVertical: 6,
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            marginBottom: 8
                        }}
                        data={props.data}
                        renderItem={({ item }) =>
                            <TouchableOpacity
                                style={[styles.card, props.style]}
                                onPress={props.onSelectItem}
                                activeOpacity={0.8}
                            >
                                <View style={styles.cardContent}>
                                    <Text >{item.name}</Text>
                                    <Icon
                                        name={props.icon.name} type={props.icon.type} size={props.icon.size} color={props.icon.color} />

                                </View>
                            </TouchableOpacity>}

                    />
        </View>
    );
}

/*<FlatList
data={props.data}
renderItem={({ item }) => <Text onPress = {props.onPress} style={styles.item}>{item.category}</Text>}
/>*/
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
    },
    item: {
        padding: 14,
        fontSize: 18,
        borderWidth: 0.2,
        borderTopColor: 'white',
        borderBottomColor: '#cfd8dc',
    },
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
        fontSize:16,
        paddingLeft:4,
          
      },
      cardContent:{
          display: "flex", 
          flexDirection: "row",
          alignItems:'center'
      }
});
