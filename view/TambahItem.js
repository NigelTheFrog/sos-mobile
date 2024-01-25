import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddItem from './stok/add-stok/AddItem';
import AddAvalan from './stok/add-stok/AddAvalan';
import AddTemuanItem from './stok/add-stok/AddTemuanItem';
import AddTemuanAvalan from './stok/add-stok/AddTemuanAvalan';

const Tab = createMaterialTopTabNavigator();

export default function TambahItem() {
  return (
      <Tab.Navigator>
      <Tab.Screen name="Item" component={AddItem} />
      <Tab.Screen name="Avalan" component={AddAvalan} />
      <Tab.Screen name="Temuan Item" component={AddTemuanItem} />
      <Tab.Screen name="Temuan Avalan" component={AddTemuanAvalan} />
    </Tab.Navigator>
  )
}