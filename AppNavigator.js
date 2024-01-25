import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Component from 'react-native';
import * as React from 'react';
import LoginScreen from './view/account/LoginScreen';
import HomeScreen from './view/HomeScreen';
import TambahItem from './view/TambahItem';
import { Colors } from './assets/styles/style';
import { CredentialContext } from './Credentials';
import { styles } from './assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);

    function handleLogout() {
        AsyncStorage.clear().then(() => { setStoredCredentials("") }).catch((error) => { console.log(error) });
      }
    return (
        <CredentialContext.Consumer>
            {({ storedCredentials }) => (                
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: Colors.blue },
                            headerTintColor: Colors.primary,
                        }}
                        initialRouteName= 'Login'>
                        {
                            storedCredentials ? <Stack.Screen name='Home' component={HomeScreen} options={{ 
                                headerTitle: "Home", 
                                headerBackVisible: false,
                                headerRight:() => (
                                    <Component.TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
                                        <Ionicons name="exit-outline" size={20} color="white" />
                                        <Component.Text style={{color:"#ffffff"}}>Logout</Component.Text>
                                    </Component.TouchableOpacity>
                                  ),
                            }} />
                            : <Stack.Screen name='Login' component={LoginScreen} options={{ headerTitle: "Login", headerBackVisible: false }} />
                        }
                        
                        <Stack.Screen name='TambahItem' component={TambahItem} options={{ headerTitle: "Tambah Item", }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialContext.Consumer>
    )
}