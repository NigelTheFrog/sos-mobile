import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '../../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext, BaseURL } from '../../../Credentials';

export default function AvalanList({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  // let listData = [];
  const [listData, setListData] = React.useState([]);
  const [trsId, setTrsId] = React.useState(0);
  const [csoActive, setCsoActive] = React.useState(false);
  let interval1, interval2;

  function startCSO() {
    fetch(`${BaseURL}/mulai-cso-avalan`, {
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
            storedCredentials[3],
            storedCredentials[4],
            responseData['csoid'],
            storedCredentials[6],
            responseData['trsid']
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
    fetch(`${BaseURL}/check-status-cso-avalan`, {
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
                setCsoActive(true);
                setTrsId(responseData['trsid'])
            }
            else setCsoActive(false)
        });
}


  const displayData = () => {
    fetch(`${BaseURL}/daftar-avalan-analisator`, {
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

  useFocusEffect(
    React.useCallback(() => {
        interval1 = setInterval(checkCsoActive, 1000);
        interval2 = setInterval(displayData, 1000);

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
    if (storedCredentials[5] == 0 || storedCredentials[7] != trsId){
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
                listData ? listData.map((item) =>
                  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetailAvalanAnalisator", {
                    itemname: item.itemname,
                    itemid: item.itemid,
                    qty: item.qty == null ? item.qty : item.qty.toString(),
                    selisih: item.selisih.toString(),
                    koreksi: item.koreksi.toString(),
                    deviasi: item.deviasi.toString(),
                    onhand: item.onhand.toString(),
                    itembatchid: item.itembatchid,
                    paramHistory: item.history == null ? '' : item.history,
                    paramInput: item.inputs == null ? [] : item.inputs.split(','),
                    paramCsoId: item.csoid,
                    groupname: item.groupdesc,
                    paramCsoDet2Id: item.csodet2id
                  })}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column',justifyContent: 'space-evenly', width: '75%' }}>
                      <Text style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.itemname} - {item.batchno}</Text>
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
                      </View>
                      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold' }}>CSO {item.csocount}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{item.groupdesc}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ) :
                  <View style={styles.styledContainerMulaiCSO}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                      Tidak ada item CSO, silahkan tunggu anda di-assignkan oleh admin
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