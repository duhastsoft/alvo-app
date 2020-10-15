import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface CardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  style?: object;
  onPress?: () => void;
}

export default function Card(props: CardProps) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[{ ...props.style }]}>
      <View style={styles.card}>
        <Image source={props.image} style={{ marginBottom: 16 }} />
        <Text style={styles.cardTitle}>{props.title.toUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
    alignItems: 'center',
  },

  cardTitle: {
    color: '#00848c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
