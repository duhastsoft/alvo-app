import constants from '@/constants';
import React from 'react';
import { Text, View, Image, ImageSourcePropType } from 'react-native';
import Alvo from '@/assets/images/trophy.png';

interface ScoreProps {
    message: string;
    image: ImageSourcePropType;
    numberofanswers: string;
    score: string;
}

export default function ScoreswithImage(props: ScoreProps) {
    return (
        <View style={{ alignItems: 'center', backgroundColor: constants.colors.darkCyan, paddingHorizontal: 20, paddingBottom:12, marginBottom:12, justifyContent:'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 12, color:'white' }}>{props.message}</Text>
            <Image
                source={props.image}
                style={{
                    width: 120,
                    height: 120,
                    //borderRadius: 40 / 2,
                    //marginHorizontal: 2,
                    paddingHorizontal: 2
                }}
            />
            <View style={{ flexDirection: 'row', marginHorizontal: 24, backgroundColor: 'white', width: '90%', justifyContent: 'space-between', borderRadius: 10 }}>
                <View style={{ flexDirection: 'column', padding: 12 }}>
                    <Text style={{ fontSize: 20, marginBottom: 10 }}>Resumen</Text>
                    <Text style={{ fontSize: 18, color: 'gray' }}>{props.numberofanswers} respuestas correctas</Text>
                </View>
                <View style={{
                    flexDirection: 'column', alignItems: 'center', backgroundColor: constants.colors.tangerineYellow, padding: 12, borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                }}>
                    <Text> puntuación</Text>
                    <Text style={{ fontSize: 42 }}>{props.score}</Text>
                </View>
            </View>
        </View>
    );
}