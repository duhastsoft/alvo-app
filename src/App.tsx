import Axios from 'axios';
import { registerRootComponent } from 'expo';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';

Axios.defaults.baseURL = 'http://192.168.0.6:8080/api/v1';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );

  function selectIcon (focused: boolean, iconName: string){
    switch(iconName){
      case 'Home':
        return focused ? 'home-variant' : 'home-variant';
      case 'Content':
        return focused ? 'book-open-page-variant' : 'book-open-page-variant';
      case 'Directory':
        return focused ? 'notebook' : 'notebook';
      case 'Escuelas':
        return focused ? 'map-search' : 'map-search';
      default:
        return focused ? 'home-variant' : 'home-variant';
    }
  }
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default registerRootComponent(App);
