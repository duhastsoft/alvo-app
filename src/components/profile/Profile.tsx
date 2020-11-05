import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleProp, FlatList, StyleSheet, Text, View, ViewStyle, TouchableOpacity
} from 'react-native';
import constants from '@/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export interface ProfileProps {
    image: string;
    name: string;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export default function Profile(props: ProfileProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.name}>{props.name}</Text>
                <Image source={{uri: props.image}} style={styles.image} />
            </View>
            <View style={styles.quickactionsbutton}>
                <View style={styles.quickactions}>
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons
                            containerStyle={{ marginTop: 2 }}
                            name={'call'}
                            size={24}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.quickactionsText}>Llamar</Text>
                </View>
                <View style={styles.quickactions}>
                    <TouchableOpacity style={styles.button}>
                        <MaterialCommunityIcons
                            containerStyle={{ marginTop: 2 }}
                            name={'bookmark'}
                            size={24}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.quickactionsText}>Guardar</Text>
                    </View>
                </View>
                <View style={styles.quickactions}>
                    <TouchableOpacity style={styles.button}>
                        <EvilIcons
                            containerStyle={{ marginTop: 2 }}
                            name={'share-apple'}
                            size={32}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.quickactionsText}>Compartir</Text>
                    </View>
                </View>
            </View>
            <View style={styles.listcontent}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingBottom: 24,
        display: "flex",
        flexDirection: 'row',
        backgroundColor: constants.colors.tangerineYellow,
        alignItems: 'flex-end',
    },
    image: {
        padding:20,
        flexGrow: 1
    },
    name: {
        paddingTop: 20,
        fontSize: 24,
        height: '100%',
        flexGrow: 2
    },
    quickactionsbutton: {
        padding: 10,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderBottomColor: '#cfd8dc',
        justifyContent: 'center',
 
    },
    listcontent: {
        flex: 3,
    },
    button: {
        height: 40,
        width: 40,
        backgroundColor: constants.colors.darkCyan,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40 * 2,
    },
    quickactions: {
        flexDirection: 'column',
        marginHorizontal:20,
        alignItems: 'center',
    },
    quickactionsText: {
        paddingTop: 4,
        fontSize: 12,
        color: constants.colors.darkCyan,
        textAlign: 'center',
    }
});