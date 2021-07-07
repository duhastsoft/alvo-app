import React from 'react';
import { Image, Text, View } from 'react-native';
import ContructionImage from '@/assets/images/construction.png';

export default function ContentScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Image source={ContructionImage} style={{ width: '80%', height: 300 }} resizeMode="contain" />
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#555',
          padding: 24,
          textAlign: 'center',
        }}
      >
        Estamos trabajando en esta sección para brindarte excelente contenido
      </Text>
    </View>
  );
}
