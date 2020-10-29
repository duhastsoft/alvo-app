import ContentScreen from '@/screens/ContentScreen';
import DirectoryScreen from '@/screens/DirectoryScreen';
import MapScreen from '@/screens/MapScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Home from '@/screens/Home';
import constants from '@/constants';

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home-variant' : 'home-variant';
          } else if (route.name === 'Content') {
            iconName = focused ? 'book-open-page-variant' : 'book-open-page-variant';
          } else if (route.name === 'Directory') {
            iconName = focused ? 'notebook' : 'notebook';
          } else if (route.name === 'Escuelas') {
            iconName = focused ? 'map-search' : 'map-search';
          }

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
        activeTintColor: constants.colors.darkCyan,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Content" component={ContentScreen} />
      <Tab.Screen name="Directory" component={DirectoryScreen} />
      <Tab.Screen name="Escuelas" component={MapScreen} />
    </Tab.Navigator>
  );
}
