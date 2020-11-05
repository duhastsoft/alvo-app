import constants from '@/constants';
import QuizScreen from '@/screens/QuizScreen';
import ServiceScreen from '@/screens/ServiceScreen';
import { RootStackParamList } from '@/types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: constants.colors.darkCyan,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Root" component={BottomTabsNavigator} options={{ title: 'Alvo' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Examen de manejo' }} />
        <Stack.Screen name="Service" component={ServiceScreen} options={{title: 'Servicio'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
