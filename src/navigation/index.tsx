import ActionBarImage from '@/components/ActionBarImage';
import constants from '@/constants';
import LoginScreen from '@/screens/LoginScreen';
import QuizScreen from '@/screens/QuizScreen';
import RegisterScreen from '@/screens/RegisterScreen';
import ResultsScreen from '@/screens/ResultsScreen';
import ServiceScreen from '@/screens/ServiceScreen';
import { RootStackParamList } from '@/types';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { Icon } from 'react-native-elements';
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
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro' }} />
        <Stack.Screen
          name="Root"
          component={BottomTabsNavigator}
          options={({ route, navigation }) => ({
            headerTitle: getHeaderTitle(route),
            headerRight: () => (
              <Icon
                name="log-out"
                type="feather"
                size={22}
                color={'gray'}
                containerStyle={{ marginBottom: 4, marginRight: 14 }}
                onPress={() => {
                  getUserToken()
                    .then((token) => {
                      if (token) {
                        logout().then(() => {
                          alert('Sesión finalizada');
                        });
                      } else {
                        navigation.replace('Login');
                      }
                    })
                    .catch((err) => console.error(err.message));
                }}
              />
            ),
            headerLeft: () => <ActionBarImage />,
            headerTitleAlign: 'center',
          })}
        />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Examen de manejo' }} />
        <Stack.Screen name="Service" component={ServiceScreen} options={{ title: 'Servicio' }} />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: 'Resultados', headerShown: false }}
        />
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
      return 'Inicio';
    case 'Directory':
      return 'Directorio';
    case 'Content':
      return 'Contenido';
    case 'Schools':
      return 'Escuelas';
  }
}

async function getUserToken() {
  return (await SecureStore.getItemAsync('token')) || '';
}

function logout() {
  return SecureStore.deleteItemAsync('token');
}
