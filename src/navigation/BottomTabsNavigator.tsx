import ContentScreen from '@/screens/ContentScreen';
import DirectoryScreen from '@/screens/DirectoryScreen';
import MapScreen from '@/screens/MapScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import Home from '@/screens/Home';
import constants from '@/constants';
import { BottomTabParamList } from '@/types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

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
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Content" component={ContentScreen} />
      <Tab.Screen name="Directory" component={DirectoryScreen} />
      <Tab.Screen name="Schools" component={MapScreen} />
    </Tab.Navigator>
  );
}
