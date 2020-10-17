import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

export interface CardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function Card(props: CardProps) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.card, props.style]}
      activeOpacity={0.8}
    >
      <View style={{ alignItems: 'center' }}>
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
  },

  cardTitle: {
    color: '#00848c',
    textAlign: 'center',
  },
});
