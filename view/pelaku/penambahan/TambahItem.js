import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddItem from '../stok/add-stok/AddItem';
import AddTemuanItem from '../stok/add-stok/AddTemuanItem';

const Tab = createMaterialTopTabNavigator();

export default function TambahItem({route}) {
  return (
      <Tab.Navigator>
      <Tab.Screen name="Item" component={AddItem} initialParams={{trsid: route.params.trsid, csoid: route.params.csoid}}/>
      <Tab.Screen name="Temuan Item" component={AddTemuanItem} initialParams={{trsid: route.params.trsid, csoid: route.params.csoid}}/>
    </Tab.Navigator>
  )
}