import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { DirectoryStackParamList } from '@/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import constants from '@/constants';

interface DirectorybyCategoryProps {
  navigation: StackNavigationProp<DirectoryStackParamList, 'DirectorybyCategory'>;
  route: RouteProp<DirectoryStackParamList, 'DirectorybyCategory'>;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  sectionHeader: {
    paddingVertical: 2,
    paddingHorizontal: 14,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: constants.colors.darkCyan,
  },
  item: {
    padding: 10,
    paddingHorizontal: 14,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 0.2,
    borderBottomColor: '#cfd8dc',
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
