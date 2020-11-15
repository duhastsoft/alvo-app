import React from "react";
import { TouchableOpacity, View, StyleSheet, ViewStyle, StyleProp, Alert, FlatList } from "react-native";
import { Icon, IconProps } from "react-native-elements";
import constants from '@/constants';
import FilterButton from '@/components/buttons/IconTextButton';
import Chip from '@/components/buttons/Chip';

//tags of selected filter appear on the left side and filter button on the right side
export interface ItemProps {
    id: string;
    name: string;
}

export interface FilterCardProps {
    style?: StyleProp<ViewStyle>,
    data?: Array<ItemProps>;
    onPressFilter: () => void;
    onDeleteFilterTag?: (index: string) => void;
    icon: IconProps;
}

export default class FilterCard extends React.Component<FilterCardProps>{
    constructor(props: FilterCardProps) {
        super(props);
    }

    buttonPress(indexS: string) {
        this.props.onDeleteFilterTag!(indexS);
    }

    render() {
        return (
            <View
                style={[styles.card, this.props.style]}
            >
                <View style={styles.cardContent}>

                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true} style={{ backgroundColor: 'rgb(242,242,242)', paddingVertical: 6, borderRadius: 30, marginBottom: 8 }}
                        data={this.props.data}
                        renderItem={({ item }) =>
                            <Chip name={item.name}
                                onPress={() => {
                                    if (this.props.onDeleteFilterTag)
                                        this.buttonPress(item.id)
                                }} />}

                    />

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            marginLeft: 4,
                            paddingTop: 2,
                            paddingBottom: 10,
                        }}
                    >
                        <FilterButton
                            name={'Filtrar'}
                            icon={{ size: 16, color: constants.colors.darkCyan, name: 'filter', type: 'antdesign' }}
                            onPress={this.props.onPressFilter}
                            style={styles.filters_container}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: 14,

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
        justifyContent: "flex-end",
        paddingVertical: 4
    },
    filters_container: {
        borderRadius: 30,
        color: '#00848c',
    }
});