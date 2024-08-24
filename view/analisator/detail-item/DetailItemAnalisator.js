import { View, Text, Alert, TouchableOpacity, TextInput } from 'react-native';
import { useState, useContext } from 'react';
import Modal from "react-native-modal";
import { styles } from '../../../assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import AvoidingWrapper from '../../../assets/styles/avoidingWrapper';
import { CredentialContext, BaseURL } from '../../../Credentials';

export default function DetailItemAnalisator({ route, navigation }) {
    const { 
        itemname, itemid, itembatchid, onhand, selisih, 
        koreksi, deviasi, groupname, qty, 
        paramHistory, paramInput, paramCsoId, paramCsoDet2Id 
    } = route.params;
    const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
    const [item, setItem] = useState(itemid);
    const [itemBatchId, setItemBatchId] = useState(itembatchid);
    const [itemName, setItemName] = useState(itemname);
    const [groupName, setGroupName] = useState(groupname);

    const [history, setHistory] = useState(paramHistory);
    const [displayInput, setDisplayInput] = useState('');
    const [keterangan, setKeterangan] = useState('');
    const [tempInput, setTempInput] = useState('');
    const [input, setInput] = useState(paramInput);
    const [resultCalc, setResultCalc] = useState(qty);

    const [resultDeviasi, setResultDeviasi] = useState(deviasi);
    const [resultKoreksi, setResultKoreksi] = useState(koreksi);
    const [resultSelisih, setResultSelisih] = useState(selisih);

    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    const [csoDetId, setCsoDetId] = useState(paramCsoId);
    const [csoDet2Id, setCsoDet2Id] = useState(paramCsoDet2Id);


    function submitPerhitungan(paramQty, paramInput) {
        fetch(`${BaseURL}/update-perhitungan-item-analisator`, {
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
        fetch(`${BaseURL}/update-item-analisator`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itembatchid: itemBatchId,
                koreksi: resultKoreksi,
                deviasi: resultDeviasi,
                analisatorid: storedCredentials[4],
                keterangan: keterangan,
                statusitem: 'R'
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

    }
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
                    <TextInput
                        placeholder='Nama Item'
                        placeholderTextColor={styles.formGroupPlaceHolderStyle}
                        style={styles.formGroupDetailItem}
                        onChangeText={setItemName}
                        value={itemName}
                        editable={false}
                    />
                </View>

                <View style={styles.formGroup}>
                    <View style={styles.formGroupLabel}>
                        <Text>Group</Text>
                    </View>
                    <TextInput
                        placeholder='Group ke -'
                        placeholderTextColor={styles.formGroupPlaceHolderStyle}
                        style={styles.formGroupDetailItem}
                        onChangeText={setGroupName}
                        value={groupName}
                        editable={false}
                    />
                </View>

                <View style={styles.formGroup}>
                    <View style={styles.formGroupLabel}>
                        <Text>On Hand</Text>
                    </View>
                    <TextInput
                        placeholder='Jumlah On Hand'
                        placeholderTextColor={styles.formGroupPlaceHolderStyle}
                        style={styles.formGroupDetailItem}
                        // onChangeText={setGroupName}
                        value={onhand}
                        editable={false}
                    />
                </View>

                <View style={styles.formPerhitungan}>
                    <View style={styles.formPerhitunganLabel}>
                        <Text>Qty.</Text>
                    </View>
                    <TextInput
                        style={styles.formPerhitunganInput}
                        value={resultCalc}
                        // editable={input.length == 0? true: false}
                        keyboardType='numeric'
                        placeholder='Total CSO'
                        placeholderTextColor={styles.formGroupColorPlaceHorlder}
                    />
                    <TouchableOpacity style={styles.formPerhitunganButton} onPress={() => setModalVisible(!isModalVisible)}>
                        <Text style={styles.buttonAccountText}>Hitung</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formGroup}>
                    <View style={styles.formGroupLabel}>
                        <Text>Selisih</Text>
                    </View>
                    <TextInput
                        placeholder='Nama Item'
                        placeholderTextColor={styles.formGroupPlaceHolderStyle}
                        style={styles.formGroupDetailItem}
                        // onChangeText={setGroupName}
                        value={selisih}
                        editable={false}
                    />
                </View>

                <View style={styles.formGroup}>
                    <View style={styles.formGroupLabel}>
                        <Text>Koreksi</Text>
                    </View>
                    <TextInput
                        placeholder='Jumlah Koreksi'
                        placeholderTextColor={styles.formGroupPlaceHolderStyle}
                        style={styles.formGroupDetailItem}
                        keyboardType='numeric'
                        onChangeText={setResultKoreksi}
                        value={resultKoreksi}
                    />
                </View>

                <View style={styles.formGroup}>
                    <View style={styles.formGroupLabel}>
                        <Text>Deviasi</Text>
                    </View>
                    <TextInput
                        placeholder='Besaran deviasi'
                        placeholderTextColor={styles.formGroupPlaceHolderStyle}
                        style={styles.formGroupDetailItem}
                        keyboardType='numeric'
                        onChangeText={setResultDeviasi}
                        value={resultDeviasi}
                    />
                </View>

                <View style={styles.formGroupKeterangan}>
                    <View style={styles.formGroupLabel}>
                        <Text>Ket.</Text>
                    </View>
                    <TextInput
                        style={styles.formKeterangan}
                        onChangeText={setKeterangan}
                        value={keterangan}
                    />
                </View>

                <TouchableOpacity style={styles.buttonSubmit} onPress={submit}>
                    <Text style={styles.buttonAccountText}><Ionicons name="save-sharp" size={20} color="white" /> Simpan</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonDelete} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonAccountText}>Keluar</Text>
                    {/* {statussubmit == "P" ? <Text style={styles.buttonAccountText}>Keluar</Text> 
                : <Text style={styles.buttonAccountText}><Ionicons name="trash" size={20} color="white" />Batal</Text>} */}
                </TouchableOpacity>
            </View>
        </AvoidingWrapper>
    );

}
