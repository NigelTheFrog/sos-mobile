import { Alert } from "react-native";
import request from "../request";

class DetailController {
    hapusDataCSO(csodetid, navigation) {
        request.post('delete-item', {
            csodetid: csodetid[0],
            csodet2id: csodetid[1]
        }).then((responseData) => {
            if (responseData['result'] == 1) {
                navigation.goBack();
            } else {
                Alert.alert('Proses Gagal', 'Gagal menghapus data', [
                    { text: 'OK' },
                ]);
            }
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
                    statusItem: data[4]
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

    submitPerhitungan(csoDet2Id, tempInput, history, input, setter) {
        if (history != '') {
            let tempCalculation = 0;
            let tempDataInput = [...input];
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

            request.post('simpan-perhitungan', {
                csodet2id: csoDet2Id,
                qty: tempCalculation.toString(),
                history: history,
                inputs: tempDataInput.join(','),
                operand: input[0]
            })
                .then((responseData) => {
                    if (responseData['result'] == 1) {
                        setter[0](tempDataInput);
                        setter[1](tempCalculation.toString());
                        setter[2](`${history}=${tempCalculation.toString()}`);
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

    submit(csodetid, credentialData, data, type, navigation) {
        request.post('update-item', type == 'R' || type == 'A' ? {
            itemid: data[0],
            itembatchid: data[1],
            lokasi: data[2],
            qtycso: Number(data[3]),
            color: data[4],
            remark: data[5],
            username: credentialData[0],
            csoid: credentialData[1],
            csodetid: csodetid[0],
            csodet2id: csodetid[1],
            statusItem: type,
            grade: data[6]
        } : {
            itemid: data[0],
            temuanname: data[1],
            lokasi: data[2],
            qtycso: Number(data[3]),
            color: data[4],
            remark: data[5],
            username: credentialData[0],
            csoid: credentialData[1],
            csodetid: csodetid[0],
            csodet2id: csodetid[1],
            statusItem: type,
            grade: data[6]
        })
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

    updateItem(csodetid, credentialData, data, type, navigation) {
        if (data[2] == null)
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih lokasi', [
                { text: 'OK' },
            ]);
        else if (data[4] == [])
            Alert.alert('Tambah Item Gagal', 'Anda belum memilih warna', [
                { text: 'OK' },
            ]);
        else if (data[5] == '')
            Alert.alert('Peringatan', 'Apakah anda hendak menambahkan item tanpa memberikan keterangan?', [
                { text: 'Iya', onPress: () => this.submit(csodetid, credentialData, data, type, navigation) }, { text: 'Batal' }
            ]);
        else this.submit(csodetid, credentialData, data, type, navigation);
    }
}

export default new DetailController();