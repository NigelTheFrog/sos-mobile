import { View, Text } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '../../../../assets/styles/style';
import AvoidingWrapper from '../../../../assets/styles/avoidingWrapper';
import { CredentialContext } from '../../../../Credentials';
import ProcessController from '../../../../controller/ProcessController';
import Dropdownitem from '../../../component/dropdownitem';
import Multiselectitem from '../../../component/multiselectitem';
import Input from '../../../component/input';
import Calculator from '../../../component/calculator';
import ProcessButton from '../../../component/processButton';

export default function AddAvalan({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const [avalanData, setAvalanData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
  const [warnaData, setWarnaData] = useState([]);
  const [avalan, setAvalan] = useState(null);
  const [avalanBatchId, setAvalanBatchId] = useState(null);
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


  useEffect(() => {
    ProcessController.setData('avalan-list', "itemid", "itemname", setAvalanData, 1);
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
        <Dropdownitem
          groupStyle={styles.formGroup}
          labelStyle={styles.formGroupLabel}
          label='Avalan'
          dropdownStyle={styles.formGroupInput}
          data={avalanData}
          placeHolder="--Pilih Avalan--"
          placeHolderStyle={styles.formGroupPlaceHolderStyle}
          setFocus={setIsFocus}
          searchPlaceholder='Cari...'
          value={avalanBatchId}
          valueField="id"
          isNotAvalan={false}
          setter={item => {
            setAvalan(item.value);
            setAvalanBatchId(item.id);
            setIsFocus(false);
          }}
        />

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
              buttonStyle={styles.formPerhitunganButton}
              onButtonPressed={() => ProcessController.showCalculator(
                [csoDetId, csoDet2Id],
                [storedCredentials[0], storedCredentials[5]],
                [avalan, avalanBatchId, lokasi, warna, 'A'],
                [setCsoDetId, setCsoDet2Id, setModalVisible],
                isModalVisible
              )}
              additionalComponent={<Text style={styles.buttonAccountText}>Hitung</Text>}
            />
          }
        />

        <Input
          groupStyle={styles.formGroupKeterangan}
          labelStyle={styles.formGroupLabel}
          label='Ket.'
          textInputStyle={styles.formKeterangan}
          value={keterangan}
          setter={onChangeKeterangan}
        />

        <ProcessButton
          buttonStyle={styles.buttonSubmit}
          onButtonPressed={
            () => ProcessController.addItem(
              [csoDetId, csoDet2Id],
              [storedCredentials[0], storedCredentials[5]],
              [avalan, avalanBatchId, lokasi, resultCalc, warna, keterangan],
              'A',
              navigation.navigate("HomeItem")
            )
          }
          additionalComponent={<Text style={styles.buttonAccountText}><Ionicons name="save-sharp" size={20} color="white" />   Simpan</Text>}
        />
        <ProcessButton
          buttonStyle={styles.buttonDelete}
          additionalComponent={<Text style={styles.buttonAccountText}><Ionicons name="trash" size={20} color="white" />   Hapus</Text>}
        />
      </View>
    </AvoidingWrapper>
  )
}