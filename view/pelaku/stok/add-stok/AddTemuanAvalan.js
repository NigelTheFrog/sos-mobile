import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Modal from "react-native-modal";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {  styles } from '../../../../assets/styles/style';
import AvoidingWrapper from '../../../../assets/styles/avoidingWrapper';
import { CredentialContext, BaseURL } from '../../../../Credentials';
import request from '../../../../request';

export default function AddTemuanAvalan({navigation}) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const [lokasiData, setLokasiData] = useState([]);
  const [warnaData, setWarnaData] = useState([]);
  const [item, onChangeItem] = useState('');
  const [itemId, setItemId] = useState('');
  const [lokasi, setLokasi] = useState(null);
  const [warna, setWarna] = useState([]);
  const [keterangan, onChangeKeterangan] = useState('');
  const [history, setHistory] = useState('');
  const [displayInput, setDisplayInput] = useState('');
  const [tempInput, setTempInput] = useState('');
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
        type: 2,
        username: storedCredentials[0],
        csoid: storedCredentials[7],
        temuanname: item,
        lokasi: lokasi,
        color: warna,
        statusItem: "T"
      })
      fetch(`${BaseURL}/tambah-perhitungan-temuan`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: 2,
          username: storedCredentials[0],
          csoid: storedCredentials[7],
          temuanname: item,
          lokasi: lokasi,
          color: warna,
          statusItem: "T",
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData['result'] == 1) {
            setCsoDetId(responseData['csodetid']);
            setCsoDet2Id(responseData['csodet2id']);
            setItemId(responseData['itemid'])
            setModalVisible(!isModalVisible);
          } else {
            Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan tekan tombol "Hitung" ulang', [
              { text: 'OK' },
            ]);
          }
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
    })
  }

  function submit() {
    request.post('add-temuan-avalan', { 
      temuanname: item,
      lokasi: lokasi,
      qtycso: Number(resultCalc),
      color: warna,
      remark: keterangan,
      username: storedCredentials[0],
      csoid: storedCredentials[7],
      csodetid: csoDetId,
      csodet2id: csoDet2Id,
      itemid: itemId
    })
    .then((responseData) => {
      if (responseData['result'] == 1) {
        navigation.navigate("HomeItem");
      } else {
        Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan lakukan penyimpanan ulang', [
          { text: 'OK' },
        ]);
      }
    })
  }
  useEffect(() => {
      setData('location-list', "locationid", "locationname", setLokasiData);
      setData('color-list', "colorid", "colordesc", setWarnaData);
  }, []);

  return (
    <AvoidingWrapper>
      <View style={styles.styledContainer}>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalButtonClose} onPress={() => setModalVisible(!isModalVisible)}>
              <Ionicons name="close-outline" size={30} color="black" />
            </TouchableOpacity>
            <View style={styles.modalFormGroup}>
              <View style={styles.modalFormGroupLabel}>
                <Text>History</Text>
              </View>
              <TextInput
                style={styles.modalFormGroupInput}
                value={history}
                editable={false}
              />
            </View>
            <View style={styles.modalFormGroup}>
              <View style={styles.modalFormGroupLabel}>
                <Text>Input</Text>
              </View>
              <TextInput
                style={styles.modalFormGroupInput}
                value={displayInput}
                editable={false}
                keyboardType='default'
              />
            </View>
            <View style={styles.modalFormGroup}>
              <View style={styles.modalFormGroupLabel}>
                <Text>Total</Text>
              </View>
              <TextInput
                style={styles.modalFormGroupInput}
                value={resultCalc}
                editable={false}
                keyboardType='default'
              />
            </View>

            <View style={styles.styledContainer}>
              <View style={styles.modalCalculator}>
                <TouchableOpacity style={styles.modalCalculatorButtonOperand}
                  onPress={() => {
                    setInput([]);
                    setDisplayInput('');
                    setTempInput('');
                    setHistory('');
                    setResultCalc('');
                  }}>
                  <Text style={styles.buttonAccountText}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={ history == '' ? true : false} style={styles.modalCalculatorButtonOperand} onPress={() => {
                  if (tempInput != '') {
                    const dataTempInputLength = tempInput.length;
                    setDisplayInput(displayInput.slice(0, -(dataTempInputLength + 1)));
                    setHistory(displayInput.slice(0, -(dataTempInputLength + 1)));
                  } else {
                    const getLastData = input[input.length - 1].length;
                    setDisplayInput(displayInput.slice(0, -(getLastData + 2)));
                    if (resultCalc == "") {
                      setHistory(history.slice(0, -(getLastData + 2)));
                    } else {
                      const resultLength = resultCalc.length;
                      setHistory(history.slice(0, -(getLastData + 2 + resultLength)));
                    }
                  }
                  const newInputData = [...input];
                  newInputData.pop();
                  setInput(newInputData);
                  setTempInput('');
                }} >
                  <Ionicons name="backspace" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonOperand} onPress={() => {
                  const lastHistoryChar = history.slice(-1);

                  if (!lastHistoryChar.includes('+') && history != '') {
                    setHistory(`${history}+`);
                    if (displayInput != '') {
                      setDisplayInput(`${displayInput}+`);
                    }
                  }
                  if (tempInput != '') {
                    setInput([...input, tempInput]);
                    setTempInput('');
                  }
                }}>
                  <Ionicons name="add" size={20} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.modalCalculator}>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}7`);
                    setHistory(`${history}7`);
                    setTempInput(`${tempInput}7`);
                  }}>
                  <Text style={styles.buttonAccountText}>7</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}8`);
                    setHistory(`${history}8`);
                    setTempInput(`${tempInput}8`);
                  }}>
                  <Text style={styles.buttonAccountText}>8</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}9`);
                    setHistory(`${history}9`);
                    setTempInput(`${tempInput}9`);
                  }}>
                  <Text style={styles.buttonAccountText}>9</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCalculator}>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}4`);
                    setHistory(`${history}4`);
                    setTempInput(`${tempInput}4`);
                  }}>
                  <Text style={styles.buttonAccountText}>4</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}5`);
                    setHistory(`${history}5`);
                    setTempInput(`${tempInput}5`);
                  }}>
                  <Text style={styles.buttonAccountText}>5</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}6`);
                    setHistory(`${history}6`);
                    setTempInput(`${tempInput}6`);
                  }}>
                  <Text style={styles.buttonAccountText}>6</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCalculator}>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}1`);
                    setHistory(`${history}1`);
                    setTempInput(`${tempInput}1`);
                  }}>
                  <Text style={styles.buttonAccountText}>1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}2`);
                    setHistory(`${history}2`);
                    setTempInput(`${tempInput}2`);
                  }}>
                  <Text style={styles.buttonAccountText}>2</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}3`);
                    setHistory(`${history}3`);
                    setTempInput(`${tempInput}3`);
                  }}>
                  <Text style={styles.buttonAccountText}>3</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.modalCalculator}>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber}
                  onPress={() => {
                    setDisplayInput(`${displayInput}0`);
                    setHistory(`${history}0`);
                    setTempInput(`${tempInput}0`);
                  }}>
                  <Text style={styles.buttonAccountText}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonNumber} onPress={() => {
                  //   console.log(input);
                  // const newInputData = [...input];
                  //   newInputData.pop();
                  //   console.log(newInputData)
                }}>
                  <Text style={styles.buttonAccountText}>.</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalCalculatorButtonSimpan} onPress={() => {
                  if (history != '') {
                    let tempCalculation = 0;
                    let tempDataInput = [...input];
                    if (tempInput != '') {
                      tempDataInput.push(tempInput);
                      for (var i = 0; i < input.length; i++) {
                        tempCalculation += parseInt(input[i]);
                      }
                      tempCalculation += parseInt(tempInput);
                    } else {
                      for (var i = 0; i < input.length; i++) {
                        tempCalculation += parseInt(input[i]);
                      }
                    }
                    submitPerhitungan(tempCalculation.toString(), tempDataInput);
                  } else {
                    Alert.alert('Perhitungan Gagal', 'Pastikan Anda sudah menekan salah satu angka pada kalkulator terlebih dahulu', [
                      { text: 'OK' },
                    ]);
                  }

                }}>
                  <Text style={styles.buttonAccountText}>=</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.formGroup}>
          <View style={styles.formGroupLabel}>
            <Text>Avalan</Text>
          </View>
          <TextInput
          placeholder='Nama Avalan'
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
            if (item == "")
              Alert.alert('Proses Gagal', 'Anda belum mengisi temuan', [
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
      </View>
    </AvoidingWrapper>
  )
}