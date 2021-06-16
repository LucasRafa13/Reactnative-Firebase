import React, { useState } from 'react';

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'

import Login from './src/screens/Login'
import Home from './src/screens/Home';

const Stack = createStackNavigator();

export default function App() {

  const [signed, setSigned] = useState(true)

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName='Login'
      >

        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}