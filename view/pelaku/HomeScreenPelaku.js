import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CredentialContext, BaseURL } from '../../Credentials';
import ItemList from './home/ItemList';
import AvalanList from './home/AvalanList';



const Tab = createMaterialTopTabNavigator();

export default function HomeScreenPelaku() {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);

    return (
      <Tab.Navigator>
        <Tab.Screen name="Daftar Item" component={ItemList} />
        <Tab.Screen name="Daftar Avalan" component={AvalanList} />
      </Tab.Navigator>
    )
  
}