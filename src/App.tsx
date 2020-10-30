import Axios from 'axios';
import { registerRootComponent } from 'expo';
import React from 'react';
import { Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';

Axios.defaults.baseURL = 'http://192.168.1.12:8080/api/v1';

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default registerRootComponent(App);
