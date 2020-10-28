import * as React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import Home from './screens/Home';
import { registerRootComponent } from 'expo';
import Directory from './screens/Directory';
import Axios from 'axios';

//Pantallas de prueba
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function MapScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Mapa</Text>
    </View>
  );
}

function DirectoryScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'gray',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Directory" component={Directory} options={{ title: 'Directorio de servicios' }} />
      <Stack.Screen name="Services" component={Directory} options={{ title: 'Servicios' }} />
    </Stack.Navigator>
  );
}

function ContentScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Contenido</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'gray',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: 'Alvo' }} />
    </Stack.Navigator>
  );
}

function App() {
  Axios.defaults.baseURL = 'http://192.168.56.1:8080/api/v1';
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = selectIcon(focused, route.name);
            return (
              <MaterialCommunityIcons
                containerStyle={{ marginTop: 2 }}
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#00848c',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={StackScreen} />
        <Tab.Screen name="Content" component={ContentScreen} />
        <Tab.Screen name="Directory" component={DirectoryScreen} />
        <Tab.Screen name="Escuelas" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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

export default registerRootComponent(App);
