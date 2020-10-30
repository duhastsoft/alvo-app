import React from 'react';
import { FlatList, StyleSheet,Text, View } from 'react-native';
import List from '@/components/list/List';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabParamList } from '@/types';

const categories=[
  {title: 'Mecanicos'},
  {title: 'Talleres'},
  {title: 'Gruas'},
  {title: 'Venta de repuestos'},
  {title: 'Seguro de carros'},
];

interface DirectoryProps {
  navigation: StackNavigationProp<BottomTabParamList, 'Directorio'>;
}

export default function DirectoryScreen({ navigation }: DirectoryProps) {
  return (
    <View style={styles.container}>
    <List
      data={categories}
      onPress={() =>
        navigation.dangerouslyGetParent()?.navigate('DirectorybyCategory', {
          //agregar filtro de categoria
        })
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
