import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react';
import { styles } from '../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext, BaseURL } from '../Credentials';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function HomeScreen({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  const [listData, setListData] = React.useState([]);

  function startCSO() {
    fetch(`${BaseURL}/mulai-cso`, {
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
          let storedData = [storedCredentials[0], storedCredentials[1], storedCredentials[2], responseData['csoid']];
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

  function displayData() {
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
        let arrayData = [];
        for (var i = 0; i < Object.keys(responseData['data']).length; i++) {
          arrayData.push(responseData['data']);
        }
        setListData(responseData['data']);
      });
  }

  React.useEffect(() => {
    const interval = setInterval(displayData,1000);
    return () => clearInterval(interval);
    // if (listData.length == 0) {
    //   displayData();
    // } 
  },[]);

  if (storedCredentials[3] == "") {
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
        <TouchableOpacity style={styles.buttonTambahItem} onPress={() => navigation.navigate("TambahItem")}>
          <Text style={styles.buttonTambahItemText}><Ionicons name="add" size={20} color="white" />Tambah Item</Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.cardContainer}>
            {
              listData.length ? listData.map((item) =>
                <TouchableOpacity style={styles.card}>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                      <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>CSO {item.csocount}</Text>
                      <Text style={{ marginBottom: 5 }}>{item.itemname}</Text>
                      {
                        item.statussubmit == "P" ?
                          <Text style={{ color:"green"}}>
                            <Ionicons name="checkmark" size={15} color="green" /> Terlapor
                          </Text>
                          :
                          <Text style={{ color: "#d98a02" }}>
                            <Ionicons name="information" size={15} color="#d98a02" /> Belum Terlapor
                          </Text>
                      }
                    </View>
                    <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                      <Text style={{}}>{item.locationname}</Text>
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