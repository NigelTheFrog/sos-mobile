import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext, BaseURL } from '../../../Credentials';

export default function ItemList({navigation}) {
    const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
    // let listData = [];
    const [listData, setListData] = React.useState([]);
    const [isInterval, setIsInterval] = React.useState(true);
  
  
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
      if (storedCredentials[3] != "") {
        const interval = setInterval(displayData,3000);
        return () => clearInterval(interval);
      }
    }, []);
    return (
        <View style={styles.styledContainer}>
          <ScrollView>
            <View style={styles.cardContainer}>
              {
                listData.length ? listData.map((item) =>
                  <TouchableOpacity style={styles.cardDetail} onPress={() => navigation.navigate("DetailItemAnalisator", {
                    itemname: item.itemname,
                    itemid: item.itemid,
                    qty: item.totalcso,
                    selisih: item.selisih.toString(),
                    koreksi: item.koreksi.toString(),
                    deviasi: item.deviasi.toString(),
                    onhand: item.onhand.toString(),
                    groupname: item.groupdesc
                  })}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '75%' }}>
                        <Text style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.itemname}</Text>
                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                          <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            <Text>On Hand: {item.onhand}</Text>
                            <Text>Qty: {item.totalcso}</Text>
                            <Text>Selisih: {item.selisih}</Text>
                          </View>
                          <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            <Text>Koreksi: {item.koreksi}</Text>
                            <Text>Deviasi: {item.deviasi}</Text>
                          </View>
                          {/* <View style={{ flexDirection: 'column', flexWrap: 'wrap'}}>
                          <Text>Selisih: {item.selisih}</Text>
                        </View> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>
  
                        </View>
                        {/* <Text style={{ marginBottom: 3 }}>On Hand: {item.onhand}, Qty: {item.totalcso}, Selisih: {item.selisih}</Text> */}
                        {/* <Text style={{ marginBottom: 3 }}>Koreksi: {item.koreksi}, Deviasi: , {item.deviasi}</Text> */}
                      </View>
                      <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly', alignItems: 'center' }}>
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