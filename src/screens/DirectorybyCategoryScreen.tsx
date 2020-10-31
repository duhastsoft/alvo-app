import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { DirectoryStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface DirectorybyCategoryProps {
  navigation: StackNavigationProp<DirectoryStackParamList, 'DirectorybyCategory'>;
  route: RouteProp<DirectoryStackParamList, 'DirectorybyCategory'>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#cfd8dc',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default function DirectorybyCategory({ navigation }: DirectorybyCategoryProps) {
  return (
    <View style={styles.container}>
      <SectionList
        sections={[
          { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
          { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
          { title: 'M', data: ['Mackson', 'Mames', 'Millian', 'Mimmy', 'Moel', 'Mohn', 'Mulie'] },
          { title: 'R', data: ['Rackson', 'Rames', 'Rillian', 'Rimmy', 'Roel', 'Rohn', 'Rulie'] }
        ]}
        renderItem={({ item }) => <Text
          onPress={() =>
            navigation.navigate('ServiceProfile') //agregar parametros
          } style={styles.item}>{item}</Text>}
        renderSectionHeader={({ section }) => <Text
          style={styles.sectionHeader}>{section.title}</Text>}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  );
}
