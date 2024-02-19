import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './view/HomeScreen'
import LoginScreen from './view/account/LoginScreen'

const Stack = createNativeStackNavigator();

export default function appNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name='Home' options={{headerShown: false}} component={HomeScreen} />
            <Stack.Screen name='Login' options={{headerShown: false}} component={LoginScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}