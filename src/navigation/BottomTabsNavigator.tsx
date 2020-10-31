import React from 'react';
import ContentScreen from '@/screens/ContentScreen';
import DirectoryScreen from '@/screens/DirectoryScreen';
import MapScreen from '@/screens/MapScreen';
import DirectorybyCategoryScreen from '@/screens/DirectorybyCategoryScreen';
import QuizScreen from '@/screens/QuizScreen';
import Home from '@/screens/Home';
import ServiceProfile from '@/screens/ServiceProfile';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import constants from '@/constants';
import { BottomTabParamList } from '@/types';
import { DirectoryStackParamList } from '@/types';
import { RootStackParamList } from '@/types';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const DirectoryStack = createStackNavigator<DirectoryStackParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const tabIcons: { [key: string]: string } = {
  Home: 'home-variant',
  Content: 'book-open-page-variant',
  Directory: 'notebook',
  Schools: 'map-search',
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
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: 'Inicio' }}/>
      <Tab.Screen name="Content" component={ContentScreen} options={{ tabBarLabel: 'Contenido' }} />
      <Tab.Screen name="Directory" component={DirectoryStackScreen} options={{ tabBarLabel: 'Directorio' }}/>
      <Tab.Screen name="Schools" component={MapScreen} options={{ tabBarLabel: 'Escuelas' }}/>
    </Tab.Navigator>
  );
}

function DirectoryStackScreen() {
  return (
    <DirectoryStack.Navigator
    screenOptions={{
      headerTintColor: constants.colors.darkCyan,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <DirectoryStack.Screen name="Directory" component={DirectoryScreen} options={{title:'Directory'}} />
    <DirectoryStack.Screen name="DirectorybyCategory" component={DirectorybyCategoryScreen}
      options={{ title: 'Directory h' }} />
    <DirectoryStack.Screen name="ServiceProfile" component={ServiceProfile} options={{ title: 'Perfil' }} />
  </DirectoryStack.Navigator>
  );
}