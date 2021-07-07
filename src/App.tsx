import Axios from 'axios';
import { registerRootComponent } from 'expo';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import env from './env';
import Navigation from './navigation';

Axios.defaults.baseURL = env.API_URL;

function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Navigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default registerRootComponent(App);
