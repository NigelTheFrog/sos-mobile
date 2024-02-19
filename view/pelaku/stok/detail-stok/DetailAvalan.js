import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Modal from "react-native-modal";
import { styles } from '../../../../assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AvoidingWrapper from '../../../../assets/styles/avoidingWrapper';
import { CredentialContext, BaseURL } from '../../../../Credentials';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function DetailItem({ route, navigation }) {
    const { csodetid, csodet2id, itemname, statusitem, color, 
        location, itemid, itembatchid, remark, qty, csocount,
        historylist, inputlist, statussubmit } = route.params;
    const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
    const [itemData, setItemData] = useState([]);
    const [lokasiData, setLokasiData] = useState([]);
    const [warnaData, setWarnaData] = useState([]);
    const [item, setItem] = useState(itemid);
    const [itemBatch, setItemBatch] = useState(itembatchid);
    const [itemName, setItemName] = useState(itemname);
    const [lokasi, setLokasi] = useState(location);
    const [warna, setWarna] = useState(color);
    const [keterangan, onChangeKeterangan] = useState(remark);
    const [history, setHistory] = useState(historylist);
    const [displayInput, setDisplayInput] = useState('');
    const [tempInput, setTempInput] = useState('');
    const [input, setInput] = useState(inputlist);
    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [csoDetId, setCsoDetId] = useState(csodetid);
    const [csoDet2Id, setCsoDet2Id] = useState(csodet2id);
    const [resultCalc, setResultCalc] = useState(qty);
    const [itemType, setItemType] = useState(statusitem);

    const handleTextQtyChange = (text) => {
        setDisplayInput(text);
        setHistory(text);
        setTempInput(text);
        setResultCalc(text);
    }


    function setData(req, valueName, labelName, setVariable, type) {
        fetch(req, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((response) => {
            var count = Object.keys(response['data']).length;
            let arrayData = [];
            if (type == 1) {
              for (var i = 0; i < count; i++) {
                  arrayData.push({
                    value: response.data[i]['itembatchid'],
                    label: `${response.data[i][labelName]} - ${response.data[i]['batchno']}`,
                    id: response.data[i][valueName]
                  });                
              }
            } else {
              for (var i = 0; i < count; i++) {
                arrayData.push({
                  value: response.data[i][valueName],
                  label: response.data[i][labelName]
                });
              }
            }
            setVariable(arrayData);
          });
      }

    function submitPerhitungan(paramQty, paramInput) {
        fetch(`${BaseURL}/update-perhitungan`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                csodet2id: csoDet2Id,
                qty: paramQty,
                history: `${history}=${paramQty}`,
                inputs: paramInput.join(','),
                operand: input[0]
            }),
        })
            .then((response) => response.json())
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
        
                   
        if(itemType == 'A') {
        //     console.log(item);
        // console.log(itemBatch);
        // console.log(lokasi);
        // console.log(resultCalc);
        // console.log(warna);
        // console.log(keterangan);
        // console.log(storedCredentials[0]);
        // console.log(storedCredentials[7]);
        // console.log(csoDetId);
        // console.log(csoDet2Id);
        // console.log(itemType);
            fetch(`${BaseURL}/update-item`, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemid: item,
                    itembatchid: itemBatch,
                    lokasi: lokasi,
                    qtycso: Number(resultCalc),
                    color: warna,
                    remark: keterangan,
                    username: storedCredentials[0],
                    csodetid: csoDetId,
                }),
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData['result'] == 1) {
    
                        navigation.goBack();
                    } else {
                        Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan lakukan penyimpanan ulang', [
                            { text: 'OK' },
                        ]);
                    }
                });
        } else {
        //     fetch(`${BaseURL}/update-item`, {
        //         method: "POST",
        //         headers: {
        //             Accept: "application/json",
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             itemid: item,
        //             temuanname: itemName,
        //             lokasi: lokasi,
        //             qtycso: Number(resultCalc),
        //             color: warna,
        //             remark: keterangan,
        //             username: storedCredentials[0],
        //             csoid: storedCredentials[7],
        //             csodetid: csoDetId,
        //             csodet2id: csoDet2Id,
        //             statusItem: itemType
        //         }),
        //     })
        //         .then((response) => response.json())
        //         .then((responseData) => {
        //             if (responseData['result'] == 1) {
    
        //                 navigation.goBack();
        //             } else {
        //                 Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan lakukan penyimpanan ulang', [
        //                     { text: 'OK' },
        //                 ]);
        //             }
        //         });
        }
        
    }
    useEffect(() => {
        console.log(itemType);
        setData(`${BaseURL}/avalan-list`, "itemid", "itemname", setItemData, 1);
        setData(`${BaseURL}/location-list`, "locationid", "locationname", setLokasiData, 0);
        setData(`${BaseURL}/color-list`, "colorid", "colordesc", setWarnaData, 0);
        // 
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
                                <TouchableOpacity style={styles.modalCalculatorButtonOperand} onPress={() => {
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
                        <Text>Item</Text>
                    </View>
                    {itemType == 'A' && csocount == 1 ? <Dropdown
                        style={styles.formGroupInput}
                        data={itemData}
                        selectedTextProps={{ numberOfLines: 1 }}
                        placeholderStyle={styles.formGroupPlaceHolderStyle}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={'--Pilih Item--'}
                        searchPlaceholder="Cari..."
                        value={itemBatch}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setItem(item.id);
                            setItemBatch(item.value);
                            setIsFocus(false);
                        }}

                    /> : <TextInput
                        placeholder='Nama Item'
                        placeholderTextColor={styles.formGroupPlaceHolderStyle}
                        style={styles.formGroupNamaItem}
                        onChangeText={setItemName}
                        value={itemName}
                    />}


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

                <View style={[warna == null || warna.length === 0 ? styles.formGroupColorNull : styles.formGroupColorFilled]}>
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
                        keyboardType='numeric'
                        placeholder='Jumlah Item'
                        placeholderTextColor={styles.formGroupColorPlaceHorlder}
                    />
                    <TouchableOpacity style={styles.formPerhitunganButton} onPress={() => {
                        setModalVisible(!isModalVisible)
                        // if (item == null)
                        //     Alert.alert('Proses Gagal', 'Anda belum memilih item', [
                        //         { text: 'OK' },
                        //     ]);
                        // else if (lokasi == null)
                        //     Alert.alert('Proses Gagal', 'Anda belum memilih lokasi', [
                        //         { text: 'OK' },
                        //     ]);
                        // else if (warna.length === 0)
                        //     Alert.alert('Proses Gagal', 'Anda belum memilih warna', [
                        //         { text: 'OK' },
                        //     ]);
                        // else showCalculator();
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
                {statussubmit == "D" ?  <TouchableOpacity style={styles.buttonSubmit}  onPress={() => {
                    
                    // if (item == null)
                    //     Alert.alert('Tambah Item Gagal', 'Anda belum memilih item', [
                    //         { text: 'OK' },
                    //     ]);
                    if (lokasi == null)
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
                    else
                        submit();
                }}>
                    <Text style={styles.buttonAccountText}><Ionicons name="save-sharp" size={20} color="white" />   Simpan</Text>
                </TouchableOpacity> : null}             

                <TouchableOpacity style={styles.buttonDelete} onPress={() => navigation.goBack()}>
                {statussubmit == "P" ? <Text style={styles.buttonAccountText}>Keluar</Text> 
                : <Text style={styles.buttonAccountText}><Ionicons name="trash" size={20} color="white" />Batal</Text>}
                </TouchableOpacity>
            </View>
        </AvoidingWrapper>
    )
}
