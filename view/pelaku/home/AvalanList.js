import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import { CredentialContext } from '../../../Credentials';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeController from '../../../controller/HomeController';
import ProcessButton from '../../component/processButton';
import Card from '../../component/card';


export default function AvalanList({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  const [listData, setListData] = React.useState([]);
  const [trsId, setTrsId] = React.useState(0);
  const [csoId, setCsoId] = React.useState(0);
  const [csoActive, setCsoActive] = React.useState(false);
  const displayDataAvalan = () => HomeController.displayData('daftar-avalan', storedCredentials[0], storedCredentials[5], setListData)
  const checkCsoActive = () => HomeController.checkCsoActive('check-status-cso-avalan', storedCredentials[0], setCsoActive, setTrsId)

  let interval1, interval2;

  useFocusEffect(
    React.useCallback(() => {
      interval1 = setInterval(checkCsoActive, 1000);
      interval2 = setInterval(displayDataAvalan, 1000);

      return () => {
        clearInterval(interval1);
        clearInterval(interval2);
      };
    }, [storedCredentials[5]])
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
    if (storedCredentials[5] == 0 || storedCredentials[7] != trsId) {
      return (
        <View style={styles.styledContainerMulaiCSO}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Silahkan memulai CSO terlebih dahulu
          </Text>
          <ProcessButton
            buttonStyle={styles.buttonMulaiCSO}
            onButtonPressed={() => HomeController.startCSO('mulai-cso-avalan', storedCredentials, 'A', setStoredCredentials)}
            additionalComponent={<Text style={styles.buttonAccountText}>Mulai CSO</Text>}
          />
        </View>
      )
    } else {
      return (
        <View style={styles.styledContainer}>
          <ProcessButton
            buttonStyle={styles.buttonTambahItem}
            onButtonPressed={() => navigation.navigate("TambahAvalan")}
            additionalComponent={<Text style={styles.buttonTambahItemText}><Ionicons name="add" size={15} color="white" /> Tambah Avalan</Text>}
          />

          <ScrollView>
            <Card
              data={listData}
              navigation={navigation}
              type='A'
              userType={0}
            />
          </ScrollView>
          <ProcessButton
            buttonStyle={styles.buttonSubmit}
            onButtonPressed={() => HomeController.submitItem(storedCredentials[5], setListData)}
            additionalComponent={<Text style={styles.buttonAccountText}>Submit</Text>}
          />
        </View>
      )
    }
  }

}