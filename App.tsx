import * as React from 'react';
import { Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Directorio</Text>
    </View>
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Alvo' }}
      />
      </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home-variant' : 'home-variant';
            } else if (route.name === 'Content') {
              iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant';
            }else if (route.name === 'Directory') {
              iconName = focused ? 'notebook' : 'notebook';
            }else if (route.name === 'Escuelas') {
              iconName = focused ? 'map-search' : 'map-search';
            }

            return <MaterialCommunityIcons containerStyle={{ marginTop: 2}} name={iconName} size={size} color={color} />;
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
}
