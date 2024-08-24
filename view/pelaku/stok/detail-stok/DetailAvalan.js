import { View, Text} from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { styles } from '../../../../assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import AvoidingWrapper from '../../../../assets/styles/avoidingWrapper';
import { CredentialContext } from '../../../../Credentials';
import ProcessController from '../../../../controller/ProcessController';
import Calculator from '../../../component/calculator';
import Dropdownitem from '../../../component/dropdownitem';
import Input from '../../../component/input';
import Multiselectitem from '../../../component/multiselectitem';
import ProcessButton from '../../../component/processButton';
import DetailController from '../../../../controller/DetailController';

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

    useEffect(() => {
        ProcessController.setData('avalan-list', "itemid", "itemname", setItemData, 1);
        ProcessController.setData('location-list', "locationid", "locationname", setLokasiData, 0);
        ProcessController.setData('color-list', "colorid", "colordesc", setWarnaData, 0);
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
                    setter={() => ProcessController.submitPerhitungan(
                        csoDet2Id, tempInput, history, input,
                        [setInput, setResultCalc, setHistory, setDisplayInput, setTempInput]
                    )}
                />

                {itemType == 'A' && csocount == 1 ?
                    <Dropdownitem
                        groupStyle={styles.formGroup}
                        labelStyle={styles.formGroupLabel}
                        label='Item'
                        dropdownStyle={styles.formGroupInput}
                        data={itemData}
                        placeHolder="--Pilih Avalan--"
                        placeHolderStyle={styles.formGroupPlaceHolderStyle}
                        setFocus={setIsFocus}
                        searchPlaceholder='Cari...'
                        valueField="value"
                        value={item}
                        setter={item => {
                            setItem(item.value);
                            setItemBatch(item.id);
                            setIsFocus(false);
                        }}
                    />
                     : <Input groupStyle={styles.formGroup}
                    labelStyle={styles.formGroupLabel}
                    label='Avalan'
                    textInputStyle={styles.formGroupNamaItem}
                    setter={setItemName}
                    value={itemName}
                    statusEditable={false}/>}

                <Dropdownitem
                    groupStyle={styles.formGroup}
                    labelStyle={styles.formGroupLabel}
                    label='Lokasi'
                    dropdownStyle={styles.formGroupInput}
                    data={lokasiData}
                    placeHolder="--Pilih Lokasi--"
                    placeHolderStyle={styles.formGroupPlaceHolderStyle}
                    setFocus={setIsFocus}
                    valueField="value"
                    value={lokasi}
                    setter={lokasi => {
                        setLokasi(lokasi.value);
                        setIsFocus(false);
                    }}
                />

                <Multiselectitem
                    groupStyle={[warna.length === 0 ? styles.formGroupColorNull : styles.formGroupColorFilled]}
                    labelStyle={styles.formGroupColorLabel}
                    label='Kode Cat'
                    dropdownStyle={styles.formGroupColorMultiSelect}
                    data={warnaData}
                    placeHolder='--Pilih Warna--'
                    placeHolderStyle={styles.formGroupPlaceHolderStyle}
                    value={warna}
                    setter={item => {
                        setWarna(item);
                    }}
                />

                <Input
                    groupStyle={styles.formPerhitungan}
                    labelStyle={styles.formPerhitunganLabel}
                    label="Qty."
                    textInputStyle={styles.formPerhitunganInput}
                    value={resultCalc}
                    statusEditable={input.length == 0 ? true : false}
                    setter={(text) => {
                        setDisplayInput(text);
                        setHistory(text);
                        setTempInput(text);
                        setResultCalc(text);
                    }}
                    keyboardType='numeric'
                    placeHolder='Jumlah Item'
                    placeHolderStyle={styles.formGroupColorPlaceHorlder}
                    additionalItem={
                        <ProcessButton
                            buttonStyle={statussubmit == "P" ? styles.formPerhitunganButtonDisabled : styles.formPerhitunganButton}
                            onButtonPressed={() => setModalVisible(!isModalVisible)}
                            additionalComponent={<Text style={styles.buttonAccountText}>Hitung</Text>}
                            statusDisabled={statussubmit == "P" ? true : false}
                        />
                    }
                />
                <Input
                    groupStyle={styles.formGroupKeterangan}
                    labelStyle={styles.formGroupLabel}
                    label='Ket.'
                    textInputStyle={styles.formKeterangan}
                    setter={onChangeKeterangan}
                    value={keterangan}
                />
                {statussubmit == "D" ?
                    <ProcessButton
                        buttonStyle={styles.buttonSubmit}
                        onButtonPressed={
                            () => DetailController.updateItem(
                                [csoDetId, csoDet2Id],
                                [storedCredentials[0], storedCredentials[5]],
                                [item, itemBatch, lokasi, resultCalc, warna, keterangan],
                                'A',
                                navigation.goBack()
                            )
                        }
                        additionalComponent={<Text style={styles.buttonAccountText}><Ionicons name="save-sharp" size={20} color="white" />   Simpan</Text>}
                    />
                    : null}
                {
                    statussubmit == "P" || csocount > 1 ?
                        <ProcessButton
                            buttonStyle={styles.buttonDelete}
                            onButtonPressed={() => navigation.goBack()}
                            additionalComponent={<Text style={styles.buttonAccountText}>Keluar</Text>}
                        />
                        :
                        <ProcessButton
                            buttonStyle={styles.buttonDelete}
                            onButtonPressed={() => DetailController.hapusDataCSO([csoDetId, csoDet2Id], navigation)}
                            additionalComponent={<Text style={styles.buttonAccountText}><Ionicons name="trash" size={20} color="white" />Hapus</Text>}
                        />
                }
            </View>
        </AvoidingWrapper>
    )
}
