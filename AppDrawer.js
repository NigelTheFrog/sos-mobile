import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ItemList from './view/analisator/daftar/ItemList';
import AvalanList from './view/analisator/daftar/AvalanList';
import { NavigationContainer } from '@react-navigation/native';
import { CredentialContext } from './Credentials';


const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
    return (
        <Drawer.Navigator initialRouteName="HomeDrawer1">
        <Drawer.Screen name="HomeDrawer1" component={ItemList} />
        <Drawer.Screen name="HomeDrawer2" component={AvalanList} />
      </Drawer.Navigator>
    );
  }