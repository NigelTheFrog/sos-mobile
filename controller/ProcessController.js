import { Alert } from "react-native";
import request from "../request";

class ProcessController {
    setData(req, valueName, labelName, setVariable, type) {
        request.get(req).then((response) => {
            var count = Object.keys(response['data']).length;
            let arrayData = [];
            if (type == 1) {
                for (var i = 0; i < count; i++) {
                    if (response.data[i]['statusitem'] == 'R') {
                        arrayData.push({
                            value: response.data[i][valueName],
                            label: response.data[i][labelName],
                            trsdetid: response.data[i]['trsdetid']
                        });
                    } else {
                        arrayData.push({
                            value: response.data[i][valueName],
                            label: `${response.data[i][labelName]} \n${response.data[i]['dimension']} \n${response.data[i]['tolerance']}`,
                            trsdetid: response.data[i]['trsdetid']
                        });
                    }

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

    showCalculator(csoDetId, credentialData, data, setter, isModalVisible) {
        if (data[0] == null) {
            Alert.alert('Proses Gagal', 'Anda belum memilih item', [
                { text: 'OK' },
            ]);
        } else if (data[2] == null) {
            Alert.alert('Proses Gagal', 'Anda belum memilih lokasi', [
                { text: 'OK' },
            ]);
        } else if (data[3].length == null) {
            Alert.alert('Proses Gagal', 'Anda belum memilih warna', [
                { text: 'OK' },
            ]);
        } else {
            if (csoDetId[0] == "" && csoDetId[1] == "") {
                request.post('tambah-perhitungan', {
                    username: credentialData[0],
                    csoid: credentialData[1],
                    itemid: data[0],
                    itembatchid: data[1],
                    lokasi: data[2],
                    color: data[3],
                    statusItem: data[4],
                    grade: data[5],
                    trsdetid: data[6],
                }).then((responseData) => {
                    if (responseData['result'] == 1) {
                        setter[0](responseData['csodetid']);
                        setter[1](responseData['csodet2id']);
                        setter[2](!isModalVisible);
                    } else {
                        Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan tekan tombol "Hitung" ulang', [
                            { text: 'OK' },
                        ]);
                    }
                });
            } else {
                setter[2](!isModalVisible);
            }
        }
    }

    submitPerhitungan(csoDet2Id, tempInput, history, input, setter, perkalian) {
        if (history != '') {
            let tempCalculation = 0;
            let pengali = '';
            let tempDataInput = [...input];
            let tempHistory = history;
            if (tempInput != '') {
                tempDataInput.push(tempInput);
                for (var i = 0; i < input.length; i++) {
                    tempCalculation += parseFloat(input[i]);
                }
                tempCalculation += parseFloat(tempInput);
            } else {
                for (var i = 0; i < input.length; i++) {
                    tempCalculation += parseFloat(input[i]);
                }
            }
            if(perkalian[2] != '') tempHistory.slice(0, -(perkalian[2].length + 1));

            if(perkalian[0] != '' && perkalian[1] != '' ) {                
                setter[5]((parseFloat(perkalian[0]) * parseFloat(perkalian[1])).toString());
                pengali = `+${parseFloat(perkalian[0]) * parseFloat(perkalian[1])}`;
                tempCalculation += (parseFloat(perkalian[0]) * parseFloat(perkalian[1]));
            } else {
                setter[5]('');
                pengali = '';
            }

            request.post('simpan-perhitungan', {
                csodet2id: csoDet2Id,
                qty: tempCalculation.toString(),
                history: `${tempHistory}${pengali}=${tempCalculation.toString()}`,
                inputs: tempDataInput.join(','),
                operand: input[0],
                pengali: perkalian[0],
                qty_pengali: perkalian[1]
            })
                .then((responseData) => {
                    if (responseData['result'] == 1) {
                        setter[0](tempDataInput);
                        setter[1](tempCalculation.toString());
                        setter[2](`${tempHistory}${pengali}=${tempCalculation.toString()}`);
                        setter[3]('');
                        setter[4]('');

                    } else {
                        Alert.alert('Proses Gagal', 'Harap periksa koneksi internet anda dan lakukan penyimpanan ulang', [
                            { text: 'OK' },
                        ]);
                    }
                });
        } else {
            Alert.alert('Perhitungan Gagal', 'Pastikan Anda sudah menekan salah satu angka pada kalkulator terlebih dahulu', [
                { text: 'OK' },
            ]);
        }
    }

    submit(csoDetId, credentialData, data, type, navigation) {
        request.post('add-item', {
            itemid: data[0],
            itembatchid: data[1],
            lokasi: data[2],
            qtycso: Number(data[3]),
            color: data[4],
            remark: data[5],
            grade: data[6],
            trsdetid: data[7],
            tonasecso: data[8],
            username: credentialData[0],
            csoid: credentialData[1],
            csodetid: csoDetId[0],
            csodet2id: csoDetId[1],
            statusItem: type
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

    addItem(csoDetId, credentialData, data, type, navigation) {
        if (data[0] == null)
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih item', [
                { text: 'OK' },
            ]);
        else if (data[2] == null)
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih lokasi', [
                { text: 'OK' },
            ]);
        else if (data[4] == [])
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih warna', [
                { text: 'OK' },
            ]);
        else if (data[5] == '')
            Alert.alert('Peringatan', 'Apakah anda hendak menambahkan item tanpa memberikan keterangan?', [
                { text: 'Iya', onPress: () => this.submit(csoDetId, credentialData, data, type, navigation) }, { text: 'Batal' }
            ]);
        else this.submit(csoDetId, credentialData, data, type, navigation);
    }
}

export default new ProcessController();