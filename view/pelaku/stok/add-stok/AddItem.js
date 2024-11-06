import { View, Text } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { styles } from '../../../../assets/styles/style';
import AvoidingWrapper from '../../../../assets/styles/avoidingWrapper';
import { CredentialContext } from '../../../../Credentials';
import Ionicons from '@expo/vector-icons/Ionicons';
import Calculator from '../../../component/calculator';
import Dropdownitem from '../../../component/dropdownitem';
import Multiselectitem from '../../../component/multiselectitem';
import Input from '../../../component/input';
import ProcessButton from '../../../component/processButton';
import ProcessController from '../../../../controller/ProcessController';

export default function AddItem({ navigation }) {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const [itemData, setItemData] = useState([]);
  const [lokasiData, setLokasiData] = useState([]);
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
  const [warnaData, setWarnaData] = useState([]);
  const [item, setItem] = useState(null);
  const [itemBatchId, setItemBatchId] = useState(null);
  const [lokasi, setLokasi] = useState(null);
  const [warna, setWarna] = useState([]);
  const [keterangan, onChangeKeterangan] = useState('');
  const [grade, setGrade] = useState('');
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
    ProcessController.setData('item-list', "itemid", "itemname", setItemData, 1);
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
            setItemBatchId(item.id);
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
              buttonStyle={styles.formPerhitunganButton}
              onButtonPressed={() => ProcessController.showCalculator(
                [csoDetId, csoDet2Id],
                [storedCredentials[0], storedCredentials[3]],
                [item, itemBatchId, lokasi, warna, 'R', grade],
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
              [storedCredentials[0], storedCredentials[3]],
              [item, itemBatchId, lokasi, resultCalc, warna, keterangan, grade],
              'R',
              navigation
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
