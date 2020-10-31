import React from 'react';
import { StyleSheet, View } from 'react-native';
import List from '@/components/list/List';
import { DirectoryStackParamList } from '@/types';
import { StackNavigationProp } from '@react-navigation/stack';

const categories=[
  {title: 'Mecanicos'},
  {title: 'Talleres'},
  {title: 'Gruas'},
  {title: 'Venta de repuestos'},
  {title: 'Seguro de carros'},
];

interface DirectoryProps {
  navigation: StackNavigationProp<DirectoryStackParamList, 'Directory'>;
}

export default function DirectoryScreen({ navigation }: DirectoryProps) {
  return (
    <View style={styles.container}>
    <List
      data={categories}
      onPress={() =>
        navigation.navigate('DirectorybyCategory')
      }
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
