import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home  from './Home';


const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={Home}/>
    
  </Stack.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);