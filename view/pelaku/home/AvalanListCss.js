import { View, Text, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import { styles } from '../../../assets/styles/style';
import { CredentialContext } from '../../../Credentials';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeController from '../../../controller/HomeController';
import ProcessButton from '../../component/processButton';
import Card from '../../component/card';


export default function AvalanListCss({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  const [listData, setListData] = React.useState([]);
  const [listSearchedData, setListSearchedData] = React.useState([]);
  const [searchItem, setSearchItem] = React.useState('');
  const [trsId, setTrsId] = React.useState(0);
  const [csoId, setCsoId] = React.useState(0);
  const [csoActive, setCsoActive] = React.useState(false);
  const displayDataAvalan = () => HomeController.displayData('daftar-avalan', storedCredentials[0], storedCredentials[5], setListData)
  const checkCsoActive = () => HomeController.checkCsoActive('check-status-cso-avalan', storedCredentials[0], setCsoActive, setTrsId)
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
            Silahkan memulai CSS terlebih dahulu
          </Text>
          <ProcessButton
            buttonStyle={styles.buttonMulaiCSO}
            onButtonPressed={() => HomeController.startCSO('mulai-cso-avalan', storedCredentials, 'A', setStoredCredentials)}
            additionalComponent={<Text style={styles.buttonAccountText}>Mulai CSS</Text>}
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
              placeHolder='Cari Daftar Avalan CSO'
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
            onButtonPressed={() => navigation.navigate("TambahAvalan")}
            additionalComponent={<Text style={styles.buttonTambahItemText}><Ionicons name="add" size={15} color="white" /> Tambah Avalan</Text>}
          />

          <ScrollView>
            <Card
              data={searchItem ? listSearchedData : listData}
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