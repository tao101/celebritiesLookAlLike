import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home  from './Home';
import CamScreen  from './CamScreen';
import Results  from './Results';


const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='camera' component={CamScreen}/>
    <Stack.Screen name='results' component={Results}/>
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);