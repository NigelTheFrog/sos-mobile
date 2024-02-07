import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext, BaseURL } from '../../../Credentials';

export default function ItemList({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  // let listData = [];
  const [listData, setListData] = React.useState([]);
  const [trsId, setTrsId] = React.useState(0);
  const [csoActive, setCsoActive] = React.useState(false);

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
    fetch(`${BaseURL}/daftar-item-analisator`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: storedCredentials[4],
        // csoid: storedCredentials[3],
      }),

    })
      .then((response) => response.json())
      .then((responseData) => {
        setListData(responseData['data']);
      });
  }

  React.useEffect(() => {
    const interval1 = setInterval(checkCsoActive, 1000);
    const interval2 = setInterval(displayData, 3000);
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

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
          <TouchableOpacity style={styles.buttonMulaiCSO} onPress={startCSO}>
            <Text style={styles.buttonAccountText}>Mulai CSO</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.styledContainer}>
          <ScrollView>
            <View style={styles.cardContainer}>
              {
                listData.length > 0 ? listData.map((item) =>
                  <TouchableOpacity style={styles.cardDetail} onPress={() => navigation.navigate("DetailItemAnalisator", {
                    itemname: item.itemname,
                    itemid: item.itemid,
                    qty: item.qty.toString(),
                    selisih: item.selisih.toString(),
                    koreksi: item.koreksi.toString(),
                    deviasi: item.deviasi.toString(),
                    onhand: item.onhand.toString(),
                    paramHistory: item.history,
                    paramInput: item.inputs.split(','),
                    paramCsoId: item.csoid,
                    groupname: item.groupdesc,
                    paramCsoDet2Id: item.csodet2id
                  })}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '75%' }}>
                        <Text style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.itemname}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                          <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            <Text>On Hand: {item.onhand}</Text>
                            <Text>Qty: {item.qty}</Text>
                            <Text>Selisih: {item.selisih}</Text>
                          </View>
                          <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            <Text>Koreksi: {item.koreksi}</Text>
                            <Text>Deviasi: {item.deviasi}</Text>
                          </View>
                          
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>

                        </View>
                        {/* <Text style={{ marginBottom: 3 }}>On Hand: {item.onhand}, Qty: {item.totalcso}, Selisih: {item.selisih}</Text> */}
                        {/* <Text style={{ marginBottom: 3 }}>Koreksi: {item.koreksi}, Deviasi: , {item.deviasi}</Text> */}
                      </View>
                      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
                      <Text style={{ fontWeight: 'bold' }}>CSO {item.csocount}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{item.groupdesc}</Text>
                        {/* <Text>{item.groupdesc}</Text> */}
                      </View>
                    </View>
                  </TouchableOpacity>
                ) :
                  <View style={styles.styledContainerMulaiCSO}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                      Tidak ada item CSO, silahkan tunggua anda di-assignkan oleh admin
                    </Text>
                  </View>
              }
            </View>
          </ScrollView>
        </View>
      );
    }
  }
}