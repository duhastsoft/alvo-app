import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button, { ButtonTypes } from '../components/buttons/Button';
import Card from '../components/card/Card';

const options = [
  {
    image: require('../../assets/images/stop-sign-1.png'),
    title: 'Señalización',
  },
  {
    image: require('../../assets/images/tire-1.png'),
    title: 'Ley de transporte',
  },
  {
    image: require('../../assets/images/book-1.png'),
    title: 'Reglamento General',
  },
  {
    image: require('../../assets/images/cone-1.png'),
    title: 'Examen VMT',
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {options.map((option) => (
          <Card
            key={option.title}
            image={option.image}
            title={option.title}
            style={styles.item}
            onPress={() => alert(`You pressed ${option.title}`)}
          />
        ))}
      </View>

      <Button
        title="Prueba libre"
        onPressEvent={() => alert('Prueba libre')}
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
