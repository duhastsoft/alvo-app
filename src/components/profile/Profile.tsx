import React from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleProp, FlatList, StyleSheet, Text, View, ViewStyle, TouchableOpacity
} from 'react-native';
import constants from '@/constants';
import { FontAwesome5 } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

export interface ProfileProps {
    image: string;
    name: string;
    category?: string;
    description: string;
    service_representative?: string;
    hours?: string;
    address?: string;
    phone?: string;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export default function Profile(props: ProfileProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style = {styles.headerImage}>
                <Image source={{uri : props.image}} style={styles.image} /></View>
                <View style={styles.headerText} >
                    <Text style={styles.name}>{props.name}</Text>
                    <View style={styles.category}>
                        <Text style={styles.categoryText}>{props.category}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.quickactionsbutton}>
                <View style={styles.quickactions}>
                    <TouchableOpacity onPress = {props.onPress} style={styles.button}>
                        <MaterialIcons
                            containerStyle={{ marginTop: 2 }}
                            name={'call'}
                            size={22}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <Text style={styles.quickactionsText}>llamar</Text>
                </View>
                <View style={styles.quickactions}>
                    <TouchableOpacity onPress = {props.onPress} style={styles.button}>
                        <FontAwesome5
                            containerStyle={{ marginTop: 2 }}
                            name={'user-circle'}
                            size={18}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <View >
                        <Text style={styles.quickactionsText}>guardar</Text>
                    </View>
                </View>
                <View style={styles.quickactions}>
                    <TouchableOpacity onPress = {props.onPress} style={styles.button}>
                        <EvilIcons
                            containerStyle={{ marginTop: 2 }}
                            name={'share-apple'}
                            size={30}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.quickactionsText}>compartir</Text>
                    </View>
                </View>
            </View>
                <View style={styles.listcontent}>
                    <View style={styles.details}>
                        <Text style = {styles.normalText}>{props.description}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.detailTitle}>Horarios</Text>
                        <Text style={styles.detailDescription} onPress = {props.onPress} >{props.hours}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.detailTitle}>Dirección</Text>
                        <Text style={styles.normalText} onPress = {props.onPress} >{props.address}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.detailTitle}>Teléfono</Text>
                        <Text style={styles.detailDescription} onPress = {props.onPress} >{props.phone}</Text>
                    </View>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    header: {
        padding:14,
        paddingTop:16,
        flexDirection: 'row',
        backgroundColor: constants.colors.darkCyan,
    },
    headerImage:{
        
    },
    headerText:{
        paddingHorizontal: 14,
        paddingVertical: 8,
    
    },
    image: {
        height: 68,
        width: 68,
        borderRadius: 68 * 2,
    },
    name: {
        fontSize: 24,
        paddingBottom:4,
        color: 'white',
    },
    category:{
        borderColor: constants.colors.tangerineYellow,
        fontSize:14,
        borderRadius:5,
        borderWidth: 0.6,
        height: 25,
        width: 70,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.colors.tangerineYellow,
    },
    categoryText:{
        paddingVertical:2,
    },
    quickactionsbutton: {
        padding: 14,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        borderBottomColor: '#cfd8dc',
        justifyContent: 'center',
    },
    listcontent: {
        flex: 3,
        flexDirection: 'column',
    },
    button: {
        height: 35,
        width: 35,
        backgroundColor: constants.colors.darkCyan,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35 * 2,
    },
    quickactions: {
        flexDirection: 'column',
        marginHorizontal: 35,
        alignItems: 'center',
    },
    quickactionsText: {
        paddingTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: constants.colors.darkCyan,
    },
    details: {
        padding: 14,
        paddingVertical: 14,
        borderBottomWidth: 0.2,
        borderBottomColor: '#cfd8dc',
    },
    detailTitle:{
        paddingBottom: 4,
        fontSize: 14,
        color:'gray'
    },
    detailDescription:{
        fontSize: 16,
        color: constants.colors.darkCyan,
    },
    normalText:{
        fontSize:16,
        color: 'black'
    }
});
