import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
<<<<<<< HEAD
import Home from './src/home.js'
=======
import Home from './src/screens/home';
import Tareas from './src/screens/tareas';

>>>>>>> 284adfcbf4ae3abfb678b34d569225d7d964ac69

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Tareas" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Tareas" component={Tareas} />
      </Stack.Navigator>
    </NavigationContainer>
  );}