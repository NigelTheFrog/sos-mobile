import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddAvalan from '../stok/add-stok/AddAvalan';
import AddTemuanAvalan from '../stok/add-stok/AddTemuanAvalan';

const Tab = createMaterialTopTabNavigator();

export default function TambahAvalan() {
  return (
      <Tab.Navigator>
      <Tab.Screen name="Avalan" component={AddAvalan} />
      <Tab.Screen name="Temuan Avalan" component={AddTemuanAvalan} />
    </Tab.Navigator>
  )
}