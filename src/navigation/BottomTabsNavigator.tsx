import ContentScreen from '@/screens/ContentScreen';
import DirectoryScreen from '@/screens/DirectoryScreen';
import MapScreen from '@/screens/MapScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Home from '@/screens/Home';
import constants from '@/constants';
import { BottomTabParamList } from '@/types';
import { createStackNavigator } from '@react-navigation/stack';
import { DirectoryStackParamList } from '@/types';
import DirectorybyCategoryScreen from '@/screens/DirectorybyCategoryScreen';
import { RootStackParamList } from '@/types';
import QuizScreen from '@/screens/QuizScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const DirectoryStack = createStackNavigator<DirectoryStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const tabIcons: { [key: string]: string } = {
  Inicio: 'home-variant',
  Contenido: 'book-open-page-variant',
  Directorio: 'notebook',
  Escuelas: 'map-search',
};

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return (
            <MaterialCommunityIcons
              containerStyle={{ marginTop: 2 }}
              name={tabIcons[route.name]}
              size={size}
              color={color}
            />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: constants.colors.darkCyan,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Inicio">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: constants.colors.darkCyan,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="Root" component={Home} options={{ title: 'Alvo' }} />
            <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Examen de manejo' }} />
          </Stack.Navigator>
        )
        }
      </Tab.Screen>
      <Tab.Screen name="Contenido" component={ContentScreen} />
      <Tab.Screen name="Directorio">
        {() => (
          <DirectoryStack.Navigator
            screenOptions={{
              headerTintColor: constants.colors.darkCyan,
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <DirectoryStack.Screen name="Directorio" component={DirectoryScreen} options={{ title: 'Directorio' }} />
            <DirectoryStack.Screen name="DirectorybyCategory" component={DirectorybyCategoryScreen}
              options={{ title: 'Directorio' }} />
          </DirectoryStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Escuelas" component={MapScreen} />
    </Tab.Navigator>
  );
}
