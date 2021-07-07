import BookImage from '@/assets/images/book-1.png';
import ConeImage from '@/assets/images/cone-1.png';
import VMTimage from '@/assets/images/VMT.png';
import StopImage from '@/assets/images/stop-sign-1.png';
import TireImage from '@/assets/images/tire-1.png';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import Card from '@/components/card/Card';
import { BottomTabParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import ButtonwithIcon from '@/components/buttons/BaseIconTextButton';
import constants from '@/constants';

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
  { image: VMTimage, title: 'Examen VMT', type: 'vmt' },
];

interface HomeProps {
  navigation: StackNavigationProp<BottomTabParamList, 'Home'>;
}

export default function Home({ navigation }: HomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
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
          style={{ width: '100%', marginBottom: 20 }}
          type={ButtonTypes.YELLOW}
        />
        <ButtonwithIcon
          name={'Historial de resultados'}
          onPressEvent={() => navigation.dangerouslyGetParent()?.navigate('Results', {})}
          icon={{
            name: 'history',
            type: 'material',
            color: 'white',
          }}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: 'gray', marginBottom: 2 }}>
          Desarrollada por Duhast Soft
        </Text>
        <Text style={{ fontSize: 14, color: 'gray' }}>v.1.0.0</Text>
      </View>
      <StatusBar barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 10,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
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
