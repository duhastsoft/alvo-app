import React, { useState } from 'react';
import {
    Image,
    ImageSourcePropType,
    StyleProp, FlatList, StyleSheet, Text, View, ViewStyle, TouchableOpacity,
    Linking, Alert, Platform, StatusBar, Share
} from 'react-native';
import constants from '@/constants';
import { Icon } from 'react-native-elements';
import * as Contacts from 'expo-contacts';



export interface ProfileProps {
    image: string;
    name: string;
    category?: string;
    description: string;
    service_representative?: string;
    hours?: string;
    address?: string;
    phone: string;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

function makeCall(phone: string) {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
        phoneNumber = `telprompt:${phone}`;
    }
    else {
        phoneNumber = `tel:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
        .then(supported => {
            if (!supported) {
                Alert.alert('Este numero no esta disponible');
            } else {
                return Linking.openURL(phoneNumber);
            }
        })
        .catch(err => console.log(err));
}

export default function Profile(props: ProfileProps) {

    const permissionFlow = async () => {
        try {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const contact = {
                    name: props.name,
                    contactType: 'company',
                    firstName: props.name,
                    //lastName:'Styles',
                    phoneNumbers: [
                        {
                            id: '',
                            number: '+503'+ props.phone,
                            isPrimary: true,
                            label: 'Phone'
                        }
                    ], 
                    note: 'this is anote',
                    id: '',
                };
                const FormOptions = {
                    displayedPropertyKeys: [],
                    message: 'form options message',
                    alternateName: undefined,
                    allowsEditing: false,
                    allowsActions: false,
                    shouldShowLinkedContacts: false,
                    isNew: true,
                    cancelButtonTitle: 'Cancelar',
                    preventAnimation: false,
                    groupId: undefined
                };
                Contacts.presentFormAsync(undefined, contact, FormOptions);
            } else {
                Linking.openURL('app-settings:');
                return;
            }
        } catch (error) {
            console.warn(error);
        }
    };
    
    const onShare = async () => {
        try {
            // Aqui va lo que se comparte
          const result = await Share.share({
            message: 'El número de contacto de '+ props.name +' es ' +props.phone+ ' puedes ver más detalles dentro de la aplicación de alvo',
          });
        } catch (error) {
          alert(error.message);
        }
      };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View>
                <View style={styles.header}>
                    <View style={styles.headerImage}>
                        <Image source={{ uri: props.image }} style={styles.image} /></View>
                    <View style={styles.headerText} >
                        <Text style={styles.name}>{props.name}</Text>
                        <View style={styles.category}>
                            <Text style={styles.categoryText}>{props.category}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.quickactionsbutton}>
                    <View style={styles.quickactions} >
                        <TouchableOpacity onPress={() => makeCall(props.phone)} style={styles.button}>
                            <Icon
                                name='call'
                                type='material'
                                size={22}
                                color={constants.colors.darkCyan}
                                containerStyle={{ marginTop: 2 }}
                            />

                        </TouchableOpacity>
                        <Text style={styles.quickactionsText}>llamar</Text>
                    </View>
                    <View style={styles.quickactions}>
                        <TouchableOpacity onPress={permissionFlow} style={styles.button}>
                            <Icon
                                name='user-circle'
                                type='font-awesome-5'
                                size={18}
                                color={constants.colors.darkCyan}
                                containerStyle={{ marginTop: 2 }}
                            />
                        </TouchableOpacity>
                        <View >
                            <Text style={styles.quickactionsText}>guardar</Text>
                        </View>
                    </View>
                    <View style={styles.quickactions}>
                        <TouchableOpacity onPress={onShare} style={styles.button}>
                            <Icon
                                name='share-apple'
                                type='evilicon'
                                size={30}
                                color={constants.colors.darkCyan}
                                containerStyle={{ marginTop: 2 }}
                            />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.quickactionsText}>compartir</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.listcontent}>
                <View style={styles.details}>
                    <Text style={styles.normalText}>{props.description}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>Horarios</Text>
                    <Text style={styles.detailDescription} onPress={props.onPress} >{props.hours}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>Dirección</Text>
                    <Text style={styles.normalText} onPress={props.onPress} >{props.address}</Text>
                </View>
                <View style={styles.details}>
                    <Text style={styles.detailTitle}>Teléfono</Text>
                    <Text style={styles.detailDescription} onPress={() => makeCall(props.phone)} >{props.phone}</Text>
                </View>
            </View>
        </View>
    );
}

const exampleApp = {
    expo: {
        ios: {
            infoPlist: {
                NSCalendarsUsageDescription:
                    'Allow Expo experiences to access your calendar',
                NSCameraUsageDescription:
                    'Expo uses your camera to scan project QR codes. Expo experiences you open may use the camera with the Expo camera API.',
                NSContactsUsageDescription:
                    'Allow Expo experiences to access your contacts',
                NSLocationWhenInUseUsageDescription:
                    'Allow Expo experiences to use your location',
                NSMicrophoneUsageDescription:
                    'Allow Expo experiences to access your microphone',
                NSMotionUsageDescription:
                    "Allow Expo experiences to access your device's accelerometer",
                NSPhotoLibraryAddUsageDescription:
                    'Give Expo experiences permission to save photos',
                NSPhotoLibraryUsageDescription:
                    'Give Expo experiences permission to access your photos',
                NSRemindersUsageDescription:
                    'Allow Expo experiences to access your reminders',
            },
        },
    },
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        padding: 14,
        paddingTop: 16,
        flexDirection: 'row',
        backgroundColor: constants.colors.darkCyan,
    },
    headerImage: {

    },
    headerText: {
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
        paddingBottom: 4,
        color: 'white',
    },
    category: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: constants.colors.tangerineYellow,
        borderRadius: 5,
        paddingHorizontal: 12,
        paddingVertical: 6,
        width:100
    },
    categoryText: {
        fontSize: 14,
        paddingRight: 6,
        paddingVertical: 1
    },
    quickactionsbutton: {
        padding: 14,
        paddingHorizontal: 52,
        flexDirection: 'row',
        borderBottomWidth: 0.2,
        backgroundColor: constants.colors.darkCyan,
        borderBottomColor: constants.colors.darkCyan,
        justifyContent: 'space-between',
    },
    listcontent: {
        flex: 3,
        flexDirection: 'column',
    },
    button: {
        height: 35,
        width: 35,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35 * 2,
    },
    quickactions: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    quickactionsText: {
        paddingTop: 4,
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
    },
    details: {
        padding: 14,
        paddingVertical: 14,
        borderBottomWidth: 0.8,
        borderBottomColor: '#cfd8dc',
    },
    detailTitle: {
        paddingBottom: 4,
        fontSize: 14,
        color: 'gray'
    },
    detailDescription: {
        fontSize: 16,
        color: constants.colors.darkCyan,
    },
    normalText: {
        fontSize: 16,
        color: 'black'
    },
});
