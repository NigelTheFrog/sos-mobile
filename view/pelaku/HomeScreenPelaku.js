import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CredentialContext, BaseURL } from '../../Credentials';
import ItemList from './home/ItemList';
import AvalanList from './home/AvalanList';
import ItemListCss from './home/ItemListCss';
import AvalanListCss from './home/AvalanListCss';



const Tab = createMaterialTopTabNavigator();

export default function HomeScreenPelaku() {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);

    return (
      <Tab.Navigator>
        {/* <Tab.Screen name="Daftar Item" component={ItemList} />
        <Tab.Screen name="Daftar Avalan" component={AvalanList} /> */}
        <Tab.Screen name="Daftar Item CSO" options={{tabBarLabelStyle: {fontSize: 10}}} component={ItemList} />
        <Tab.Screen name="Daftar Item CSS" options={{tabBarLabelStyle: {fontSize: 10}}} component={ItemListCss} />
        <Tab.Screen name="Daftar Avalan CSO" options={{tabBarLabelStyle: {fontSize: 10}}} component={AvalanList} />
        <Tab.Screen name="Daftar Avalan CSS" options={{tabBarLabelStyle: {fontSize: 10}}} component={AvalanListCss} />
      </Tab.Navigator>
    )
  
}