import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CredentialContext, BaseURL } from '../../Credentials';
import ItemList from './home/ItemList';
import AvalanList from './home/AvalanList';
import { View, Text, TouchableOpacity } from 'react-native'
import { styles } from '../../assets/styles/style';



const Tab = createMaterialTopTabNavigator();

export default function HomeScreenPelaku() {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);

  function startCSO() {
    fetch(`${BaseURL}/mulai-cso`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: storedCredentials[0],
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData['result'] == 1) {
          let storedData = [storedCredentials[0], storedCredentials[1], storedCredentials[2], responseData['csoid'], storedCredentials[4]];
          AsyncStorage.setItem('sosCredentials', JSON.stringify(storedData))
            .then(() => {
              setStoredCredentials(storedData);
            })
            .catch((error) => {
              console.log(error);
            })
        } else {
          Alert.alert('Start CSO Gagal', 'Harap lakukan CSO', [
            { text: 'OK' },
          ]);
        }
      })
  }
  if (storedCredentials[3] == 0) {
    return (
      <View style={styles.styledContainerMulaiCSO}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
          Silahkan memulai CSO terlebih dahulu
        </Text>
        <TouchableOpacity style={styles.buttonMulaiCSO} onPress={startCSO}>
          <Text style={styles.buttonAccountText}>Mulai CSO</Text>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Daftar Item" component={ItemList} />
        <Tab.Screen name="Daftar Avalan" component={AvalanList} />
      </Tab.Navigator>
    )
  }
}