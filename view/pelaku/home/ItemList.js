import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext, BaseURL } from '../../../Credentials';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function ItemList({ navigation }) {
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
    const [listData, setListData] = React.useState([]);
    const [csoActive, setCsoActive] = React.useState(false);
    const [trsId, setTrsId] = React.useState(0);

    function startCSO() {
        fetch(`${BaseURL}/mulai-cso-item`, {
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
                    let storedData = [
                        storedCredentials[0], 
                        storedCredentials[1], 
                        storedCredentials[2], 
                        responseData['csoid'], 
                        storedCredentials[4],
                        storedCredentials[5],
                        responseData['trsid'],
                        storedCredentials[7]
                    ];
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

    function SubmitItem() {
        fetch(`${BaseURL}/submit-item`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                csoid: storedCredentials[3],
            }),

        })
            .then((response) => response.json())
            .then((responseData) => {
                let arrayData = [];
                for (var i = 0; i < Object.keys(responseData['data']).length; i++) {
                    arrayData.push(responseData['data']);
                }
                setListData(responseData['data']);
            });
    }

    function checkCsoActive() {
        fetch(`${BaseURL}/check-status-cso-item`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData['result'] == 1) {
                    setCsoActive(true);
                    setTrsId(responseData['trsid'])
                }
                else setCsoActive(false)
            });
    }

    const displayData = () => {
        fetch(`${BaseURL}/daftar-item`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: storedCredentials[0],
                csoid: storedCredentials[3],
            }),

        })
            .then((response) => response.json())
            .then((responseData) => {
                setListData(responseData['data']);
            });
    }

    React.useEffect(() => {   
        const interval1 = setInterval(checkCsoActive, 3000);
        const interval2 = setInterval(displayData, 3000);         
        return () => {
            // clearInterval(interval1);
            // clearInterval(interval2);
          }; 
           
    }, []);

    if (csoActive == false) {
        return(
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
                    <TouchableOpacity style={styles.buttonMulaiCSO} onPress={startCSO}>
                        <Text style={styles.buttonAccountText}>Mulai CSO</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.styledContainer}>
                    <TouchableOpacity style={styles.buttonTambahItem} onPress={() => {
                        navigation.navigate("TambahItem");
                    }}>
                        <Text style={styles.buttonTambahItemText}><Ionicons name="add" size={20} color="white" />Tambah Item</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={styles.cardContainer}>
                            {
                                listData.length > 0 ? listData.map((item) =>
                                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetailItem", {
                                        csodetid: item.csodetid,
                                        csodet2id: item.csodet2id,
                                        color: item.color == null ? item.color : item.color.split(','),
                                        location: item.locationid,
                                        itemid: item.itemid,
                                        itembatchid: item.itembatchid,
                                        itemname: item.itemname,
                                        remark: item.remark,
                                        qty: item.qty == null ? item.qty : item.qty.toString(),
                                        historylist: item.history == null ? '' : item.history,
                                        inputlist: item.inputs == null ? [] : item.inputs.split(','),
                                        statusitem: item.statusitem,
                                        statussubmit: item.statussubmit,
                                        csocount: item.csocount
                                    })}>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'column',  justifyContent: 'space-evenly', width: '70%'}}>
                                                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>CSO {item.csocount}</Text>  
                                                {
                                                    item.batchno == null?
                                                    <Text style={{ marginBottom: 5}}>{item.itemname}</Text> :
                                                    <Text style={{ marginBottom: 5}}>{item.itemname} - {item.batchno}</Text>
                                                }                                              
                                                
                                                {
                                                    item.statussubmit == "P" ?
                                                        <Text style={{ color: "green" }}>
                                                            <Ionicons name="checkmark" size={15} color="green" /> Terlapor
                                                        </Text>
                                                        :
                                                        <Text style={{ color: "#d98a02" }}>
                                                            <Ionicons name="information" size={15} color="#d98a02" /> Belum Terlapor
                                                        </Text>
                                                }
                                            </View>
                                            <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                                <Text>{item.locationname}</Text>
                                                <Text style={{ fontWeight: 'bold' }}>{item.qty} {item.uom}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>


                                ) :
                                    <View style={styles.styledContainerMulaiCSO}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                                            Belum ada item CSO, silahkan tambah item terlebih dahulu
                                        </Text>
                                    </View>
                            }
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={styles.buttonSubmit} onPress={SubmitItem}>
                        <Text style={styles.buttonAccountText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }


}