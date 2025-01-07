import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Modal from "react-native-modal";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { styles } from '../../../../assets/styles/style';
import AvoidingWrapper from '../../../../assets/styles/avoidingWrapper';
import { CredentialContext, BaseURL, AppVersion } from '../../../../Credentials';
import request from '../../../../request';
import Dropdownitem from '../../../component/dropdownitem';
import ProcessController from '../../../../controller/ProcessController';
import Calculator from '../../../component/calculator';

export default function AddTemuanItem({route, navigation}) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const { trsid, csoid } = route.params;
  const [lokasiData, setLokasiData] = useState([]);
  const [warnaData, setWarnaData] = useState([]);
  const [gradeData] = useState([
    {
      value: 1,
      label: 'Grade 1',
    },
    {
      value: 2,
      label: 'Grade 2',
    },
    {
      value: 3,
      label: 'Grade 3',
    }
  ]);
  const [item, onChangeItem] = useState('');
  const [itemId, setItemId] = useState('');
  const [lokasi, setLokasi] = useState(null);
  const [warna, setWarna] = useState([]);
  const [grade, setGrade] = useState('');
  const [keterangan, onChangeKeterangan] = useState('');
  const [history, setHistory] = useState('');
  const [displayInput, setDisplayInput] = useState('');
  const [tempInput, setTempInput] = useState('');
  const [boxQty, setBoxQty] = useState('');
  const [isianBox, setIsianBox] = useState('');
  const [hasilPerkalian, setHasilPerkalian] = useState('');
  const [input, setInput] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [csoDetId, setCsoDetId] = useState('');
  const [csoDet2Id, setCsoDet2Id] = useState('');
  const [resultCalc, setResultCalc] = useState('');

  const handleTextQtyChange = (text) => {
    setDisplayInput(text);
    setHistory(text);
    setTempInput(text);
    setResultCalc(text);
  }

  function setData(req, valueName, labelName, setVariable) {
    request.get(req).then((response) => {
      var count = Object.keys(response['data']).length;
      let arrayData = [];
      for (var i = 0; i < count; i++) {
        arrayData.push({
          value: response.data[i][valueName],
          label: response.data[i][labelName]
        });
      }
      setVariable(arrayData);
    });
  }

  function showCalculator() {
    if (csoDetId == "" && csoDet2Id == "") {
      request.post('tambah-perhitungan-temuan', { 
        type: 1,
        username: storedCredentials[0],
        csoid: csoid,
        trsid: trsid,
        temuanname: item,
        lokasi: lokasi,
        color: warna,
        statusItem: "TR",
        grade: grade
      }).then((responseData) => {
        if (responseData['result'] == 1) {
          setCsoDetId(responseData['csodetid']);
          setCsoDet2Id(responseData['csodet2id']);
          setItemId(responseData['itemid'])
          setModalVisible(!isModalVisible);
        } else {
          Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan tekan tombol "Hitung" ulang', [
            { text: 'OK' },
          ]);
        };
      })
    } else {
      setModalVisible(!isModalVisible)
    }
  }

  function submitPerhitungan(paramQty, paramInput) {
    request.post('simpan-perhitungan', { 
      csodet2id: csoDet2Id,
      qty: paramQty,
      history: `${history}=${paramQty}`,
      inputs: paramInput.join(','),
      operand: input[0]
    })
    .then((responseData) => {
      if (responseData['result'] == 1) {
        setInput(paramInput);
        setResultCalc(paramQty);
        setHistory(`${history}=${paramQty}`);
        setDisplayInput('');
        setTempInput('');

      } else {
        Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan lakukan penyimpanan ulang', [
          { text: 'OK' },
        ]);
      }
    });
  }

  function submit() {
    request.post('add-temuan-item', { 
      temuanname: item,
      lokasi: lokasi,
      qtycso: Number(resultCalc),
      color: warna,
      remark: keterangan,
      username: storedCredentials[0],
      trsid: trsid,
      csoid: csoid,
      csodetid: csoDetId,
      csodet2id: csoDet2Id,
      itemid: itemId,
      statusItem: "TR",
      grade: grade
    })
    .then((responseData) => {
      if (responseData['result'] == 1) {
        navigation.navigate("HomeItem");
      } else {
        Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan lakukan penyimpanan ulang', [
          { text: 'OK' },
        ]);
      }
    });
  }
  useEffect(() => {
      setData('location-list', "locationid", "locationname", setLokasiData);
      setData('color-list', "colorid", "colordesc", setWarnaData);
  }, []);

  return (
    <AvoidingWrapper>
      <View style={styles.styledContainer}>
      <Calculator
          isVisible={isModalVisible}
          closeModal={setModalVisible}
          modalStyle={styles.modalView}
          input={input}
          setInput={setInput}
          history={history}
          setHistory={setHistory}
          displayInput={displayInput}
          setDisplayInput={setDisplayInput}
          resultCalculation={resultCalc}
          setResultCalculation={setResultCalc}
          temporaryInput={tempInput}
          setTemporaryInput={setTempInput}
          boxQty={boxQty}
          setBoxQty={setBoxQty}
          isianBox={isianBox}
          setIsianBox={setIsianBox}
          hasilPerkalian={hasilPerkalian}
          setHasilPerkalian={setHasilPerkalian}  
          setter={() => ProcessController.submitPerhitungan(
            csoDet2Id, tempInput, history, input,
            [setInput, setResultCalc, setHistory, setDisplayInput, setTempInput, setHasilPerkalian],
            [boxQty, isianBox, hasilPerkalian]
          )}
        />

        <View style={styles.formGroup}>
          <View style={styles.formGroupLabel}>
            <Text>Item</Text>
          </View>
          <TextInput
          placeholder='Nama Item'
          placeholderTextColor={styles.formGroupPlaceHolderStyle}          
          style={styles.formGroupNamaItem}
          onChangeText={onChangeItem}
          value={item}
          />
          
        </View>

        <View style={styles.formGroup}>
          <View style={styles.formGroupLabel}>
            <Text>Lokasi</Text>
          </View>
          <Dropdown
            style={styles.formGroupInput}
            data={lokasiData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'--Pilih Lokasi--'}
            placeholderStyle={styles.formGroupPlaceHolderStyle}            
            searchPlaceholder="Cari..."
            value={lokasi}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={lokasi => {
              setLokasi(lokasi.value);
              setIsFocus(false);
            }}

          />
        </View>

        <View style={[warna.length === 0 ? styles.formGroupColorNull: styles.formGroupColorFilled]}>
          <View style={styles.formGroupColorLabel}>
            <Text>Kode Cat</Text>
          </View>

          <View style={styles.formGroupColorMultiSelect}>
            <MultiSelect
              data={warnaData}
              search
              maxHeight={300}
              labelField="label"
              valueField="label"
              placeholder={'--Pilih Warna--'}
              placeholderStyle={styles.formGroupPlaceHolderStyle}            
              searchPlaceholder="Cari..."
              value={warna}
              onChange={item => {
                setWarna(item);
              }}
              renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.formGroupColorSelectedStyle}>
                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                    <AntDesign color="black" name="delete" size={17} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>


        <View style={styles.formPerhitungan}>
          <View style={styles.formPerhitunganLabel}>
            <Text>Qty.</Text>
          </View>
          <TextInput
            style={styles.formPerhitunganInput}
            value={resultCalc}
            editable={input.length == 0}
            onChangeText={handleTextQtyChange}
            placeholder='Jumlah Item'
            placeholderTextColor={styles.formGroupColorPlaceHorlder}
            keyboardType='numeric'
          />
          <TouchableOpacity style={styles.formPerhitunganButton} onPress={() => {
            if (item == null)
              Alert.alert('Proses Gagal', 'Anda belum memilih item', [
                { text: 'OK' },
              ]);
            else if (lokasi == null)
              Alert.alert('Proses Gagal', 'Anda belum memilih lokasi', [
                { text: 'OK' },
              ]);
            else if (warna.length === 0)
              Alert.alert('Proses Gagal', 'Anda belum memilih warna', [
                { text: 'OK' },
              ]);
            else showCalculator();
          }}>
            <Text style={styles.buttonAccountText}>Hitung</Text>
          </TouchableOpacity>
        </View>
        <Dropdownitem
          groupStyle={styles.formGroup}
          labelStyle={styles.formGroupLabel}
          label='Grade'
          dropdownStyle={styles.formGroupInput}
          data={gradeData}
          placeHolder="--Pilih Grade--"
          placeHolderStyle={styles.formGroupPlaceHolderStyle}
          setFocus={setIsFocus}
          valueField="value"
          value={grade}
          searchable={false}
          setter={grade => {
            setGrade(grade.value);
            setIsFocus(false);
          }}
        />
        <View style={styles.formGroupKeterangan}>
          <View style={styles.formGroupLabel}>
            <Text>Ket.</Text>
          </View>
          <TextInput
            style={styles.formKeterangan}
            onChangeText={onChangeKeterangan}
            value={keterangan}            
          />
        </View>
        <TouchableOpacity style={styles.buttonSubmit} onPress={() => {
          if (item == null)
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih item', [
              { text: 'OK' },
            ]);
          else if (lokasi == null)
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih lokasi', [
              { text: 'OK' },
            ]);
          else if (warna == [])
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih warna', [
              { text: 'OK' },
            ]);
          else if (keterangan == '')
            Alert.alert('Peringatan', 'Apakah anda hendak menambahkan item tanpa memberikan keterangan?', [
              { text: 'Iya', onPress: () => submit() }, { text: 'Batal' }
            ]);
          else submit();
        }}>
          <Text style={styles.buttonAccountText}><Ionicons name="save-sharp" size={20} color="white" />   Simpan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonDelete}>
          <Text style={styles.buttonAccountText}><Ionicons name="trash" size={20} color="white" />   Hapus</Text>
        </TouchableOpacity>
        <Text style={styles.appVersionLabel}>Version {AppVersion}</Text>
      </View>
      
    </AvoidingWrapper>
  )
}