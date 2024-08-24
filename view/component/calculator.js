import { View, Text } from 'react-native';
import * as React from 'react';
import Input from './input';
import { styles } from '../../assets/styles/style';
import ProcessButton from './processButton';
import Modal from "react-native-modal";
import Ionicons from '@expo/vector-icons/Ionicons';

const CalculatorButton = ({ setDisplayInput, displayInput, setHistory, history, setTemporaryInput, temporaryInput, label}) => (
  <>
    <ProcessButton
      buttonStyle={styles.modalCalculatorButtonNumber}
      onButtonPressed={() => {
        setDisplayInput(displayInput);
        setHistory(history)
        setTemporaryInput(temporaryInput)
      }}
      additionalComponent={<Text style={styles.buttonAccountText}>{label}</Text>}
    />
  </>
);

export default Calculator = ({
  isVisible,
  closeModal,
  modalStyle,
  input,
  setInput,
  history,
  setHistory,
  displayInput,
  setDisplayInput,
  resultCalculation,
  setResultCalculation,
  temporaryInput,
  setTemporaryInput,
  setter
}) => (
  <>
    <Modal isVisible={isVisible}>
      <View style={modalStyle}>
        <ProcessButton
          buttonStyle={styles.modalButtonClose}
          onButtonPressed={() => closeModal(!isVisible)}
          additionalComponent={<Ionicons name="close-outline" size={30} color="black" />}
        />
        <Input
          groupStyle={styles.modalFormGroup}
          labelStyle={styles.modalFormGroupLabel}
          label='History'
          textInputStyle={styles.modalFormGroupInput}
          value={history}
          statusEditable={false}
        />
        <Input
          groupStyle={styles.modalFormGroup}
          labelStyle={styles.modalFormGroupLabel}
          label='Input'
          textInputStyle={styles.modalFormGroupInput}
          value={displayInput}
          statusEditable={false}
        />
        <Input
          groupStyle={styles.modalFormGroup}
          labelStyle={styles.modalFormGroupLabel}
          label="Total"
          textInputStyle={styles.modalFormGroupInput}
          value={resultCalculation}
          statusEditable={false}
        />
        <View style={styles.styledContainer}>
          <View style={styles.modalCalculator}>
            <ProcessButton
              buttonStyle={styles.modalCalculatorButtonOperand}
              onButtonPressed={() => {
                setInput([]);
                setDisplayInput('');
                setTemporaryInput('');
                setHistory('');
                setResultCalculation('');
              }}
              additionalComponent={<Text style={styles.buttonAccountText}>C</Text>}
            />
            <ProcessButton
              buttonStyle={styles.modalCalculatorButtonOperand}
              statusDisabled={history == '' ? true : false ? true : false}
              onButtonPressed={() => {
                if (temporaryInput != '') {
                  const dataTempInputLength = temporaryInput.length;
                  setDisplayInput(displayInput.slice(0, -(dataTempInputLength + 1)));
                  setHistory(displayInput.slice(0, -(dataTempInputLength + 1)));
                } else {
                  const getLastData = input[input.length - 1].length;
                  setDisplayInput(displayInput.slice(0, -(getLastData + 2)));
                  if (resultCalculation == "") {
                    setHistory(history.slice(0, -(getLastData + 2)));
                  } else {
                    const resultLength = resultCalculation.length;
                    setHistory(history.slice(0, -(getLastData + 2 + resultLength)));
                  }
                }
                const newInputData = [...input];
                newInputData.pop();
                setInput(newInputData);
                setTemporaryInput('');
              }}
              additionalComponent={<Ionicons name="backspace" size={20} color="white" />}
            />
            <ProcessButton
              buttonStyle={styles.modalCalculatorButtonOperand}
              onButtonPressed={() => {
                const lastHistoryChar = history.slice(-1);

                if (!lastHistoryChar.includes('+') && history != '') {
                  setHistory(`${history}+`);
                  if (displayInput != '') {
                    setDisplayInput(`${displayInput}+`);
                  }
                }
                if (temporaryInput != '') {
                  setInput([...input, temporaryInput]);
                  setTemporaryInput('');
                }
              }}
              additionalComponent={<Ionicons name="add" size={20} color="white" />}
            />
          </View>
          <View style={styles.modalCalculator}>
            <CalculatorButton
              displayInput={`${displayInput}7`}
              setDisplayInput={setDisplayInput}
              history={`${history}7`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}7`}
              setTemporaryInput={setTemporaryInput}
              label='7'
            />
            <CalculatorButton
              displayInput={`${displayInput}8`}
              setDisplayInput={setDisplayInput}
              history={`${history}8`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}8`}
              setTemporaryInput={setTemporaryInput}
              label='8'
            />
            <CalculatorButton
              displayInput={`${displayInput}9`}
              setDisplayInput={setDisplayInput}
              history={`${history}9`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}9`}
              setTemporaryInput={setTemporaryInput}
              label='9'
            />
          </View>
          <View style={styles.modalCalculator}>
          <CalculatorButton
              displayInput={`${displayInput}4`}
              setDisplayInput={setDisplayInput}
              history={`${history}4`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}4`}
              setTemporaryInput={setTemporaryInput}
              label='4'
            />
            <CalculatorButton
              displayInput={`${displayInput}5`}
              setDisplayInput={setDisplayInput}
              history={`${history}5`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}5`}
              setTemporaryInput={setTemporaryInput}
              label='5'
            />
            <CalculatorButton
              displayInput={`${displayInput}6`}
              setDisplayInput={setDisplayInput}
              history={`${history}6`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}6`}
              setTemporaryInput={setTemporaryInput}
              label='6'
            />
          </View>
          <View style={styles.modalCalculator}>
          <CalculatorButton
              displayInput={`${displayInput}1`}
              setDisplayInput={setDisplayInput}
              history={`${history}1`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}1`}
              setTemporaryInput={setTemporaryInput}
              label='1'
            />
            <CalculatorButton
              displayInput={`${displayInput}2`}
              setDisplayInput={setDisplayInput}
              history={`${history}2`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}2`}
              setTemporaryInput={setTemporaryInput}
              label='2'
            />
            <CalculatorButton
              displayInput={`${displayInput}3`}
              setDisplayInput={setDisplayInput}
              history={`${history}3`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}3`}
              setTemporaryInput={setTemporaryInput}
              label='3'
            />
          </View>
          <View style={styles.modalCalculator}>
          <CalculatorButton
              displayInput={`${displayInput}0`}
              setDisplayInput={setDisplayInput}
              history={`${history}0`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}0`}
              setTemporaryInput={setTemporaryInput}
              label='0'
            />
            <CalculatorButton
              displayInput={`${displayInput}.`}
              setDisplayInput={setDisplayInput}
              history={`${history}.`}
              setHistory={setHistory}
              temporaryInput={`${temporaryInput}.`}
              setTemporaryInput={setTemporaryInput}
              label='.'
            />
            <ProcessButton
              buttonStyle={styles.modalCalculatorButtonSimpan}
              onButtonPressed={() => {
                if (history != '') {
                  let tempCalculation = 0;
                  let tempDataInput = [...input];
                  if (temporaryInput != '') {
                    tempDataInput.push(temporaryInput);
                    for (var i = 0; i < input.length; i++) {
                      tempCalculation += parseFloat(input[i]);
                    }
                    tempCalculation += parseFloat(temporaryInput);
                  } else {
                    for (var i = 0; i < input.length; i++) {
                      tempCalculation += parseFloat(input[i]);
                    }
                  }
                  setter(tempCalculation.toString(), tempDataInput)
                  // submitPerhitungan(tempCalculation.toString(), tempDataInput);
                } else {
                  Alert.alert('Perhitungan Gagal', 'Pastikan Anda sudah menekan salah satu angka pada kalkulator terlebih dahulu', [
                    { text: 'OK' },
                  ]);
                }

              }}
              additionalComponent={<Text style={styles.buttonAccountText}>=</Text>}
            />
          </View>
        </View>
      </View>
    </Modal>
  </>
);