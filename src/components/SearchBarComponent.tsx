import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';

<<<<<<< HEAD
interface SearchBarProps{
    returnButton: boolean;
    textValue: string;
    onPress?: () => void;
    onChangeText: (text: string) => void;
}

export default function SearchBarComponent(props: SearchBarProps){
    return (
        <View style={styles.searchHeader}>
                <View style={(props.returnButton)? styles.viewIcon:styles.viewNoIcon} >
                    <Icon style={styles.icon}
                    name={'chevron-left'} 
                    onPress={()=>{if(props.onPress){
                        props.onPress();
                    }}}  
                />
                </View>
                <View style={styles.searchBar}>
                    <SearchBar 
                    searchIcon={{ size: 24, color:'gray' }}
                    onChangeText={text => props.onChangeText(text)}
                    placeholder="Busca aqui..."
                    placeholderTextColor='gray'
                    value={props.textValue}
                    containerStyle={styles.searchBarStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    />
                </View>
        </View>
      );
}

const styles = StyleSheet.create({
    searchHeader:{
        flexDirection: "row",
        width: '100%',
        flexWrap: 'wrap',
        
    },
    searchBar:{
        flex: 1,
        flexGrow: 8,
        elevation: 4,
    },
    viewIcon:{
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#9e9e9e',
        elevation: 4,
        justifyContent: 'center'
    },
    viewNoIcon:{
        display: 'none'
    },
    icon:{
        width: '100%',
        padding: 16
    },
    searchBarStyle:{
        backgroundColor: 'white',
        borderTopColor: 'white',
        paddingHorizontal:14,
        borderBottomColor:'white',
        borderBottomWidth: 0.2,
    },
    inputContainerStyle:{
        backgroundColor:'#f2f2f2',
        borderRadius:10,
    },
});
=======
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
>>>>>>> bf2671a203978d2a62148ac4e225dac30a9cb687
