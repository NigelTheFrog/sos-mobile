import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';
import { styles } from '../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext, BaseURL } from '../../Credentials';
import ItemList from './daftar/ItemList';
import AvalanList from './daftar/AvalanList';

const Tab = createMaterialTopTabNavigator();


export default function HomeScreenAnalisator() {
  const [listData, setListData] = React.useState([]);

    return (
      <Tab.Navigator>
        <Tab.Screen name="Daftar Item" component={ItemList} />
        <Tab.Screen name="Daftar Avalan" component={AvalanList} />
      </Tab.Navigator>
    )
  

}