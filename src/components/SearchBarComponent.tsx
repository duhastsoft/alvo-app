import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';

interface SearchBarProps {
  returnButton: boolean;
  textValue: string;
  onPress: () => void;
  onChangeText: (text: string) => void;
}

export default function SearchBarComponent(props: SearchBarProps) {
  return (
    <View style={styles.searchHeader}>
      <View style={props.returnButton ? styles.viewIcon : styles.viewNoIcon}>
        <Icon style={styles.icon} name={'chevron-left'} onPress={() => props.onPress()} />
      </View>
      <View style={styles.searchBar}>
        <SearchBar
          searchIcon={{ size: 24 }}
          onChangeText={(text) => props.onChangeText(text)}
          placeholder="Busca aqui..."
          value={props.textValue}
          lightTheme
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchHeader: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    backgroundColor: 'white',
  },
  searchBar: {
    flex: 1,
    flexGrow: 8,
    elevation: 0,
  },
  viewIcon: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: 'white',
    elevation: 4,
    justifyContent: 'center',
  },
  viewNoIcon: {
    display: 'none',
  },
  icon: {
    width: '100%',
    padding: 16,
  },
});
