import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Component from 'react-native';
import * as React from 'react';
import LoginScreen from './view/account/LoginScreen';
import TambahItem from './view/pelaku/penambahan/TambahItem';
import { Colors } from './assets/styles/style';
import { CredentialContext } from './Credentials';
import { styles } from './assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailItem from './view/pelaku/stok/detail-stok/DetailItem';
import HomeScreenAnalisator from './view/analisator/HomeScreenAnalisator';
import DetailItemAnalisator from './view/analisator/detail-item/DetailItemAnalisator';
import HomeScreenPelaku from './view/pelaku/HomeScreenPelaku';
import TambahAvalan from './view/pelaku/penambahan/TambahAvalan';
import DetailAvalanAnalisator from './view/analisator/detail-item/DetailAvalanAnalisator';


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
                            storedCredentials ? storedCredentials[2] ==3?
                            <Stack.Screen name='HomeAnalisator' component={HomeScreenAnalisator} options={{ 
                                headerTitle: "Home", 
                                headerBackVisible: false,
                                headerRight:() => (
                                    <Component.TouchableOpacity style={styles.buttonLogout} onPress={handleLogout}>
                                        <Ionicons name="exit-outline" size={20} color="white" />
                                        <Component.Text style={{color:"#ffffff"}}>Logout</Component.Text>
                                    </Component.TouchableOpacity>
                                  ),
                            }} />  :
                            <Stack.Screen name='HomeItem' component={HomeScreenPelaku} options={{ 
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
                        <Stack.Screen name='TambahAvalan' component={TambahAvalan} options={{ headerTitle: "Tambah Avalan", }} />
                        <Stack.Screen name='DetailItem' component={DetailItem} options={{ headerTitle: "Detail Item", }} />
                        <Stack.Screen name='DetailItemAnalisator' component={DetailItemAnalisator} options={{ headerTitle: "Detail Item", }} />
                        <Stack.Screen name='DetailAvalanAnalisator' component={DetailAvalanAnalisator} options={{ headerTitle: "Detail Avalan", }} />

                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialContext.Consumer>
    )
}