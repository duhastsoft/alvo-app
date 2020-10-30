import BookImage from '@/assets/images/book-1.png';
import ConeImage from '@/assets/images/cone-1.png';
import StopImage from '@/assets/images/stop-sign-1.png';
import TireImage from '@/assets/images/tire-1.png';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import Card from '@/components/card/Card';
import { BottomTabParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const DEFAULT_QUIZ_SIZE = 20;

const options = [
  { image: StopImage, title: 'Señalización', type: 'category', id: 3, limit: DEFAULT_QUIZ_SIZE },
  {
    image: TireImage,
    title: 'Ley de transporte',
    type: 'category',
    id: 1,
    limit: DEFAULT_QUIZ_SIZE,
  },
  {
    image: BookImage,
    title: 'Reglamento General',
    type: 'category',
    id: 2,
    limit: DEFAULT_QUIZ_SIZE,
  },
  { image: ConeImage, title: 'Examen VMT', type: 'vmt' },
];

interface HomeProps {
  navigation: StackNavigationProp<BottomTabParamList, 'Inicio'>;
}

export default function Home({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.map((option) => (
          <Card
            key={option.title}
            image={option.image}
            title={option.title}
            style={styles.item}
            onPress={() =>
              navigation.dangerouslyGetParent()?.navigate('Quiz', {
                type: option.type,
                category: option.id,
              })
            }
          />
        ))}
      </View>

      <Button
        title="Prueba libre"
        onPressEvent={() =>
          navigation.dangerouslyGetParent()?.navigate('Quiz', {
            type: 'free',
            limit: DEFAULT_QUIZ_SIZE,
          })
        }
        style={{ width: '100%' }}
        type={ButtonTypes.YELLOW}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 16,
  },

  item: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexBasis: '40%',
    flexGrow: 1,
  },
});
