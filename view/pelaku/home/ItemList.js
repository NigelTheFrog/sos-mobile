import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import { CredentialContext } from '../../../Credentials';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeController from '../../../controller/HomeController';
import ProcessButton from '../../component/processButton';
import Card from '../../component/card';
import Input from '../../component/input';
import Dropdownitem from '../../component/dropdownitem';



export default function ItemList({ navigation }) {
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
    const [listData, setListData] = React.useState([]);
    const [listSearchedData, setListSearchedData] = React.useState([]);
    const [csoActive, setCsoActive] = React.useState(false);
    const [searchItem, setSearchItem] = React.useState('');
    const [trsId, setTrsId] = React.useState(0);
    const [csoId, setCsoId] = React.useState(0);
    const displayDataItem = () => HomeController.displayData('daftar-item', storedCredentials[0], storedCredentials[3], setListData)
    const checkCsoActive = () => HomeController.checkCsoActive('check-status-cso-item', storedCredentials[0], setCsoActive, setTrsId)
    const [isFocus, setIsFocus] = React.useState(false);
    const [statusSubmit, setStatusSubmit] = React.useState('0');
    const [statusData] = React.useState([
        {
            value: '0',
            label: 'Semua',
        },
        {
            value: 'P',
            label: 'Sudah Submit',
        },
        {
            value: 'D',
            label: 'Belum Submit',
        }
    ]);

    let interval1, interval2;
    // console.log(listData);
    // console.log(storedCredentials);

    function search(text) {
        setSearchItem(text);
        let tempItem = [];
        if (statusSubmit != '0') {
            listData.forEach(item => {
                if ((item.itemid.toString().includes(text) || item.itemname.toLowerCase().includes(text.toLowerCase())) && item.statussubmit == statusSubmit) tempItem.push(item)
            });
        } else {
            listData.forEach(item => {
                if (item.itemid.toString().includes(text) || item.itemname.toLowerCase().includes(text.toLowerCase())) tempItem.push(item)
            });
        }
        setListSearchedData(tempItem);
    }

    function filterStatus(status) {
        setStatusSubmit(status.value);
        let tempItem = [];
        if (searchItem != '') {
            if (status.value == '0') {
                listData.forEach(item => {
                    if (item.itemid.toString().includes(searchItem) || item.itemname.toLowerCase().includes(searchItem.toLowerCase())) tempItem.push(item)
                });
            } else {
                listData.forEach(item => {
                    if ((item.itemid.toString().includes(searchItem) || item.itemname.toLowerCase().includes(searchItem.toLowerCase())) && item.statussubmit == status.value) tempItem.push(item)
                });
            }
        } else {
            listData.forEach(item => {
                if (item.statussubmit == status.value) tempItem.push(item)
            });
        }
        setListSearchedData(tempItem);
    }

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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Input
                            groupStyle={[styles.formGroup, { width: '50%' }]}
                            labelStyle={styles.formGroupLabel}
                            label={<Ionicons name="search" size={20} color="black" />}
                            textInputStyle={[styles.formGroupNamaItem, { fontSize: 12 }]}
                            placeHolderStyle={{ fontSize: 8 }}
                            statusEditable={true}
                            value={searchItem}
                            setter={search}
                            placeHolder='Cari Daftar Item CSO'
                        />
                        <Dropdownitem
                            groupStyle={[styles.formGroup, { width: '45%', marginLeft: 10 }]}
                            labelStyle={styles.formGroupLabel}
                            itemStyle={{ fontSize: 12 }}
                            textLabelStyle={{ fontSize: 11 }}
                            label='Status'
                            dropdownStyle={[styles.formGroupInput, { width: '75%' }]}
                            data={statusData}
                            setFocus={setIsFocus}
                            valueField="value"
                            value={statusSubmit}
                            searchable={false}
                            setter={filterStatus}
                        />
                    </View>
                    <ProcessButton
                        buttonStyle={styles.buttonTambahItem}
                        onButtonPressed={() => navigation.navigate("TambahItem")}
                        additionalComponent={<Text style={styles.buttonTambahItemText}><Ionicons name="add" size={15} color="white" /> Tambah Item</Text>}
                    />
                    <ScrollView>
                        <Card
                            data={searchItem || statusSubmit != '0' ? listSearchedData : listData}
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
