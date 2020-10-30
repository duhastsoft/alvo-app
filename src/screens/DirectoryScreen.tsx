import React from 'react';
import { FlatList, StyleSheet,Text, View } from 'react-native';
import List from '@/components/list/List';

const categories=[
  {title: 'Mecanicos'},
  {title: 'Talleres'},
  {title: 'Gruas'},
  {title: 'Venta de repuestos'},
  {title: 'Seguro de carros'},
];

export default function DirectoryScreen() {
  return (
    <View style={styles.container}>
    <List
      data={categories}
    />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
