import React from 'react';
import {ImageSourcePropType, ScrollView, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import LoadingIcon from '@/assets/images/sand-clock-1.png';
import ServiceCategory from '../card/DirectoryCard';

interface DirectoryCard {
    id: number;
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
    if(props.list.length<1){
        return(<ScrollView style={[styles.row, props.style]}>
            <ServiceCategory
                    index={0} 
                    key={0} 
                    image={LoadingIcon} 
                    name={'Nada que mostrar aquí'}
                    style={props.styleItems}
                    />
        </ScrollView>)
    }
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
        flexDirection: 'row',
        marginBottom: 16,
      },
})