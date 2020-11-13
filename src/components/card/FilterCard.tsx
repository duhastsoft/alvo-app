import React from "react";
import { TouchableOpacity, Image, Text, View, StyleSheet, ViewStyle, StyleProp, ImageSourcePropType } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Icon, IconProps } from "react-native-elements";
import constants from '@/constants';
import FilterButton from '@/components/buttons/IconTextButton';

//tags of selected filter appear on the left side and filter button on the right side
export interface FilterCardProps {
    style?: StyleProp<ViewStyle>,
    onPressFilter: () => void;
    onDeleteFilterTag?: (index: number) => void;
    icon: IconProps;
}

export default class ServiceCategory extends React.Component<FilterCardProps>{
    constructor(props: FilterCardProps) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.card, this.props.style]}
                activeOpacity={0.8}
            >
                <View style={styles.cardContent}>

                    <Icon
                        name={this.props.icon.name} type={this.props.icon.type} size={this.props.icon.size} color={this.props.icon.color} />
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end"
                        }}
                    >
                        <FilterButton
                            name={'Filtrar'}
                            icon={{ size: 16, color: constants.colors.darkCyan, name: 'filter', type: 'antdesign'}}
                            onPress={this.props.onPressFilter}
                            style={styles.filters_container}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 14,
        paddingTop: 2,
        paddingBottom:10,
        backgroundColor: '#ffffff',
        width: '100%',
        elevation: 8,
        borderBottomWidth: 0.2,
        borderBottomColor: '#cfd8dc',
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
        alignItems: 'center',
        justifyContent: "flex-end"
    },
    filters_container: {
        borderRadius: 30,
        color: '#00848c'
    }
});