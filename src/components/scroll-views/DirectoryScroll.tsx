import React from 'react';
import {ImageSourcePropType, ScrollView, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import ServiceCategory from '../card/DirectoryCard';

interface DirectoryCard {
    id: number;
    image: ImageSourcePropType;
    name: string;
}


export interface DirectoryScrollProps {
    image: ImageSourcePropType;
    style?: StyleProp<ViewStyle>;
    styleItems?: StyleProp<ViewStyle>;
    onPressItem: (index: number) => void;
    list: DirectoryCard[];
}

export default function DirectoryScroll(props: DirectoryScrollProps){
    return(
        <ScrollView style={[styles.row, props.style]}>
            {
                props.list.map((option)=>(<ServiceCategory
                    index={option.id} 
                    key={option.id} 
                    image={props.image} 
                    name={option.name}
                    onPress={props.onPressItem}
                    style={props.styleItems}
                    />))
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'column',
        marginBottom: 16,
      },
})