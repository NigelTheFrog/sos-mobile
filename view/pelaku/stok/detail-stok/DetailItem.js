import { View, Text } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { styles } from '../../../../assets/styles/style';
import Ionicons from '@expo/vector-icons/Ionicons';
import AvoidingWrapper from '../../../../assets/styles/avoidingWrapper';
import { CredentialContext } from '../../../../Credentials';
import ProcessController from '../../../../controller/ProcessController';
import Input from '../../../component/input';
import Dropdownitem from '../../../component/dropdownitem';
import Multiselectitem from '../../../component/multiselectitem';
import ProcessButton from '../../../component/processButton';
import DetailController from '../../../../controller/DetailController';
import Calculator from '../../../component/calculator';


export default function DetailItem({ route, navigation }) {
    const { csodetid, csodet2id, itemname, statusitem, statushslcso, color, trsid, csoid,
        itemid, trsdet, itembatchid, qty, historylist, location, gradeid, remark,
        inputlist, statussubmit, tonase, qty_pengali, pengali } = route.params;
    const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
    const [itemData, setItemData] = useState([]);
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
    const [item, setItem] = useState(itemid);
    const [itemBatch, setItemBatch] = useState(itembatchid);
    const [itemName, setItemName] = useState(itemname);
    const [trsdetid, setTrsDetId] = useState(trsdet);
    const [lokasi, setLokasi] = useState(location);
    const [warna, setWarna] = useState(color);
    const [keterangan, onChangeKeterangan] = useState(remark);
    const [grade, setGrade] = useState(gradeid);
    const [history, setHistory] = useState(historylist);
    const [displayInput, setDisplayInput] = useState('');
    const [boxQty, setBoxQty] = useState(qty_pengali ? qty_pengali : '');
    const [isianBox, setIsianBox] = useState(pengali ? pengali : '');
    const [hasilPerkalian, setHasilPerkalian] = useState(qty_pengali && pengali ? (parseFloat(qty_pengali) * parseFloat(pengali).toString) : '');
    const [tempInput, setTempInput] = useState('');
    const [input, setInput] = useState(inputlist);
    const [isFocus, setIsFocus] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [csoDetId, setCsoDetId] = useState(csodetid);
    const [csoDet2Id, setCsoDet2Id] = useState(csodet2id);
    const [resultCalc, setResultCalc] = useState(qty);
    const [tonaseQty, setTonaseQty] = useState(tonase);
    const [itemType, setItemType] = useState(statusitem);
    useEffect(() => {
        ProcessController.setData(`item-list?trsid=${trsid}`, "itemid", "itemname", setItemData, 1);
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
                {itemType == 'R' && statushslcso == 'D' && statussubmit != "P" ?
                    <Dropdownitem
                        groupStyle={styles.formGroup}
                        labelStyle={styles.formGroupLabel}
                        label='Item'
                        dropdownStyle={styles.formGroupInput}
                        data={itemData}
                        placeHolder="--Pilih Item--"
                        placeHolderStyle={styles.formGroupPlaceHolderStyle}
                        setFocus={setIsFocus}
                        searchPlaceholder='Cari...'
                        valueField="value"
                        value={item}
                        setter={item => {
                            setItem(item.value);
                            setItemBatch(item.id);
                            setTrsDetId(item.trsdetid);
                            setIsFocus(false);
                        }}
                    /> :
                    <Input
                        groupStyle={styles.formGroup}
                        labelStyle={styles.formGroupLabel}
                        label='Item'
                        textInputStyle={styles.formGroupNamaItem}
                        setter={setItemName}
                        value={itemName}
                        statusEditable={false}
                    />
                }

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
                {
                    storedCredentials[11] == 'KKS' ?
                        <Input
                            groupStyle={styles.formGroup}
                            labelStyle={styles.formGroupLabel}
                            label='Tonase'
                            textInputStyle={styles.formGroupNamaItem}
                            value={tonaseQty}
                            setter={setTonaseQty}
                        /> : null
                }

                <Input
                    groupStyle={styles.formGroupKeterangan}
                    labelStyle={styles.formGroupLabel}
                    label='Ket.'
                    textInputStyle={styles.formKeterangan}
                    value={keterangan}
                    setter={onChangeKeterangan}
                />
                {statussubmit == "D" ?
                    <ProcessButton
                        buttonStyle={styles.buttonSubmit}
                        onButtonPressed={
                            () => DetailController.updateItem(
                                [csoDetId, csoDet2Id],
                                [storedCredentials[0], csoid],
                                [item, itemBatch, lokasi, resultCalc, warna, keterangan, grade, trsdetid, tonaseQty],
                                'R',
                                navigation.navigate("HomeItem")
                            )
                        }
                        additionalComponent={<Text style={styles.buttonAccountText}><Ionicons name="save-sharp" size={20} color="white" />   Simpan</Text>}
                    />
                    : null}
                {
                    statussubmit == "P" || statushslcso == 'T' ?
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
