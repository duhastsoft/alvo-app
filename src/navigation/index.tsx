import constants from '@/constants';
import QuizScreen from '@/screens/QuizScreen';
import ResultsScreen from '@/screens/ResultsScreen';
import ServiceScreen from '@/screens/ServiceScreen';
import { RootStackParamList } from '@/types';
import { NavigationContainer, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
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
        <Stack.Screen name="Root" component={BottomTabsNavigator} options={({ route }) => ({
          headerTitle: getHeaderTitle(route),
        })} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Examen de manejo' }} />
        <Stack.Screen name="Service" component={ServiceScreen} options={{title: 'Servicio'}}/>
        <Stack.Screen name="Results" component={ResultsScreen} options={{title: 'Resultados', headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function getHeaderTitle(route: any) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Alvo';
    case 'Directory':
      return 'Directorio';
    case 'Content':
      return 'Contenido';
    case 'Schools':
      return 'Escuelas';
  }
}