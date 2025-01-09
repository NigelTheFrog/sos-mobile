import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Component from 'react-native';
import * as React from 'react';
import LoginScreen from './view/account/LoginScreen';
import TambahItem from './view/pelaku/penambahan/TambahItem';
import { Colors } from './assets/styles/style';
import { AppVersion, CredentialContext } from './Credentials';
import { styles } from './assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DetailItem from './view/pelaku/stok/detail-stok/DetailItem';
import DetailAvalan from './view/pelaku/stok/detail-stok/DetailAvalan';
import HomeScreenAnalisator from './view/analisator/HomeScreenAnalisator';
import DetailItemAnalisator from './view/analisator/detail-item/DetailItemAnalisator';
import HomeScreenPelaku from './view/pelaku/HomeScreenPelaku';
import TambahAvalan from './view/pelaku/penambahan/TambahAvalan';
import DetailAvalanAnalisator from './view/analisator/detail-item/DetailAvalanAnalisator';
import WarningVersion from './view/account/WarningVersion';
import Setting from './Setting';
import request from './request';
import { useState } from 'react';
import HomeScreenApproval from './view/approval/HomeScreenApproval';
import DetailDocument from './view/approval/detail/DetailDocument';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
    const [isCurrentVersion, setIsCurrentVersion] = useState(true);


    function handleLogout() {
        AsyncStorage.clear().then(() => { setStoredCredentials("") }).catch((error) => { console.log(error) });
    }
    
    request.checkVersion().then((responseData) => {
        if (responseData['version'] != AppVersion) setIsCurrentVersion(false);
        else setIsCurrentVersion(true);
    });

    return (
        <CredentialContext.Consumer>
            {({ storedCredentials }) => (
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: Colors.blue },
                            headerTintColor: Colors.primary,
                        }}
                        initialRouteName='Login'>
                        {
                            // isCurrentVersion == true ?
                            storedCredentials ? storedCredentials[2] == 3 ?
                                <Stack.Screen name='HomeAnalisator' component={HomeScreenAnalisator} options={({ navigation }) => ({
                                    headerTitle: "Home",
                                    headerBackVisible: false,
                                    headerRight: () => (
                                        <Component.TouchableOpacity
                                            style={styles.buttonLogout}
                                            onPress={() => navigation.navigate('Setting')}
                                        >
                                            <Ionicons name="settings-sharp" size={30} color="white" />
                                        </Component.TouchableOpacity>
                                    ),
                                })} /> : storedCredentials[2] == 4 ?
                                <Stack.Screen name='HomeItem' component={HomeScreenPelaku} options={({ navigation }) => ({
                                    headerTitle: "Home",
                                    headerBackVisible: false,
                                    headerRight: () => (
                                        <Component.TouchableOpacity
                                            style={styles.buttonLogout}
                                            onPress={() => navigation.navigate('Setting')}
                                        >
                                            <Ionicons name="settings-sharp" size={30} color="white" />
                                        </Component.TouchableOpacity>
                                    ),
                                })}
                                /> : 
                                <Stack.Screen name='HomeApproval' component={HomeScreenApproval} options={({ navigation }) => ({
                                    headerTitle: "Home",
                                    headerBackVisible: false,
                                    headerRight: () => (
                                        <Component.TouchableOpacity
                                            style={styles.buttonLogout}
                                            onPress={() => navigation.navigate('Setting')}
                                        >
                                            <Ionicons name="settings-sharp" size={30} color="white" />
                                        </Component.TouchableOpacity>
                                    ),
                                })}
                                />
                                : <Stack.Screen name='Login' component={LoginScreen} options={{ headerTitle: "Login", headerBackVisible: false }} /> 
                                // <Stack.Screen name='Warning' component={WarningVersion} options={{ headerTitle: "Peringatan", headerBackVisible: false }} />

                        }

                        <Stack.Screen
                            name='Setting'
                            component={Setting}
                            options={({ navigation }) => ({
                                headerTitle: "Pengaturan Akun",
                                headerRight: () => (
                                    <Component.TouchableOpacity style={styles.buttonLogout} onPress={() => {
                                        handleLogout();
                                        navigation.popToTop();
                                    }}>
                                        <Ionicons name="exit-outline" size={20} color="white" />
                                        <Component.Text style={{ color: "#ffffff" }}>Logout</Component.Text>
                                    </Component.TouchableOpacity>
                                )
                            })}
                        />
                        <Stack.Screen name='TambahItem' component={TambahItem} options={{ headerTitle: "Tambah Item", }} />
                        <Stack.Screen name='TambahAvalan' component={TambahAvalan} options={{ headerTitle: "Tambah Avalan", }} />
                        <Stack.Screen name='DetailItem' component={DetailItem} options={{ headerTitle: "Detail Item", }} />
                        <Stack.Screen name='DetailAvalan' component={DetailAvalan} options={{ headerTitle: "Detail Avalan", }} />
                        <Stack.Screen name='DetailItemAnalisator' component={DetailItemAnalisator} options={{ headerTitle: "Detail Item", }} />
                        <Stack.Screen name='DetailAvalanAnalisator' component={DetailAvalanAnalisator} options={{ headerTitle: "Detail Avalan", }} />
                        <Stack.Screen name='DetailDocument' component={DetailDocument} options={{ headerTitle: "Detail Document", }} />
                    </Stack.Navigator>
                </NavigationContainer>
            )}
        </CredentialContext.Consumer>
    )
}