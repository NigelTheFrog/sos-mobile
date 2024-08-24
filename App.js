import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './AppNavigator';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from './Credentials';


export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");
  const checkLoginCredential = () => {
    AsyncStorage
      .getItem('sosCredentials')
      .then((result) => {
        if (result != null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch(error => console.log(error));
  }
  if (!appReady) {
    return <AppLoading startAsync={checkLoginCredential} onError={console.warn} onFinish={() => setAppReady(true)} />
  }

  return (
    <CredentialContext.Provider value={{storedCredentials,setStoredCredentials}}>
      <SafeAreaProvider>
        <StatusBar style="auto"></StatusBar>
        <AppNavigator />
      </SafeAreaProvider>
    </CredentialContext.Provider>
  );
}


