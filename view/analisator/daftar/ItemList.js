import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext, BaseURL } from '../../../Credentials';
import HomeController from '../../../controller/HomeController';

export default function ItemList({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  const [listData, setListData] = React.useState([]);
  const [trsId, setTrsId] = React.useState(0);
  const [csoActive, setCsoActive] = React.useState(false);
  const displayDataItem = () => HomeController.displayData('daftar-item-analisator', storedCredentials[0], storedCredentials[3], setListData)
  const checkCsoActive = () => HomeController.checkCsoActive('check-status-cso-item', storedCredentials[0], setCsoActive, setTrsId)

  let interval1, interval2;

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
          <ScrollView>
            <View style={styles.cardContainer}>
              {
                listData.length > 0 ? listData.map((item) =>
                  <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("DetailItemAnalisator", {
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
                      <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', width: '75%' }}>
                        {
                          item.batchno == null ?
                            <Text style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.itemname}</Text> :
                            <Text style={{ marginBottom: 3, fontWeight: 'bold' }}>{item.itemname} - {item.batchno}</Text>
                        }
                        <View style={{ flexDirection: 'row', marginBottom: 3, flexWrap: 'wrap', justifyContent: 'space-between' }}>
                          <View style={{ flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            <Text>On Hand: {item.onhand}</Text>
                            <Text>Qty: {Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.qty)}</Text>
                            <Text>Selisih: {Intl.NumberFormat('en-US', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.selisih)}</Text>
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