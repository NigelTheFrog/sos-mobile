import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import { CredentialContext } from '../../../Credentials';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeController from '../../../controller/HomeController';
import ProcessButton from '../../component/processButton';
import Card from '../../component/card';

export default function ItemList({ navigation }) {
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
    const [listData, setListData] = React.useState([]);
    const [csoActive, setCsoActive] = React.useState(false);
    const [trsId, setTrsId] = React.useState(0);
    const [csoId, setCsoId] = React.useState(0);
    const displayDataItem = () => HomeController.displayData('daftar-item', storedCredentials[0], storedCredentials[3], setListData)
    const checkCsoActive = () => HomeController.checkCsoActive('check-status-cso-item', storedCredentials[0], setCsoActive, setTrsId)

    let interval1, interval2;
    // console.log(listData);
// console.log(storedCredentials);
    useFocusEffect(        
        React.useCallback(() => {
            interval1 = setInterval(checkCsoActive, 1000);
            interval2 = setInterval(displayDataItem, 1000);
            return () => {
                clearInterval(interval1);
                clearInterval(interval2);
            };
        }, [storedCredentials[3]])
    );

    if (csoActive == false) {
        return (
            <View style={styles.styledContainerMulaiCSO}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                    Tidak ada CSO Aktif, silahkan tunggu admin memulai CSO terlebih dahulu
                </Text>
            </View>
        )
    } else {
        if (storedCredentials[3] == 0 || storedCredentials[6] != trsId) {
            return (
                <View style={styles.styledContainerMulaiCSO}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
                        Silahkan memulai CSO terlebih dahulu
                    </Text>
                    <ProcessButton
                        buttonStyle={styles.buttonMulaiCSO}
                        onButtonPressed={() => HomeController.startCSO('mulai-cso-item', storedCredentials, 'R', setStoredCredentials)}
                        additionalComponent={<Text style={styles.buttonAccountText}>Mulai CSO</Text>}
                    />
                </View>
            )
        } else {
            return (
                <View style={styles.styledContainer}>
                    <ProcessButton
                        buttonStyle={styles.buttonTambahItem}
                        onButtonPressed={() => navigation.navigate("TambahItem")}
                        additionalComponent={<Text style={styles.buttonTambahItemText}><Ionicons name="add" size={15} color="white" /> Tambah Item</Text>}
                    />
                    <ScrollView>
                        <Card
                        data={listData}
                        navigation={navigation}
                        type='R'
                        userType={0}
                        />
                    </ScrollView>
                    <ProcessButton
                        buttonStyle={styles.buttonSubmit}
                        onButtonPressed={() => HomeController.submitItem(storedCredentials[3], setListData)}
                        additionalComponent={<Text style={styles.buttonAccountText}>Submit</Text>}
                    />
                </View>
            )
        }
    }


}
