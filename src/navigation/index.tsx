import constants from '@/constants';
import QuizScreen from '@/screens/QuizScreen';
import DirectorybyCategoryScreen from '@/screens/DirectorybyCategoryScreen';
import { RootStackParamList } from '@/types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
    <BottomTabsNavigator/>
    </NavigationContainer>
  );
}
