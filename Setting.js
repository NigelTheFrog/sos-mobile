import { View, Text, Alert } from 'react-native';
import { useState, useContext } from 'react';
import { styles } from './assets/styles/style';
import AvoidingWrapper from './assets/styles/avoidingWrapper';
import { CredentialContext, BaseURL, AppVersion } from './Credentials';
import Input from './view/component/input';
import ProcessButton from './view/component/processButton';
import request from './request';

export default function Setting() {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialContext);
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [passwordUlang, setPasswordUlang] = useState('');

  function submit() {
    request.post('ubah-password', {
      username: storedCredentials[0],
      passwordlama: passwordLama,
      passwordbaru: passwordBaru,
    }).then((responseData) => {
      if (responseData['result'] == 1) {
        console.log(responseData['message']);
        Alert.alert('Proses Berhasil', 'Password telah diperbarui', [
          { text: 'OK' },
        ]);
      } else {
        Alert.alert('Proses Gagal', 'Password lama tidak sesuai', [
          { text: 'OK' },
        ]);
      }
    })
  }

  return (
    <AvoidingWrapper>
      <View style={styles.styledContainer}>
        <Input
          groupStyle={styles.formGroup}
          labelStyle={styles.formGroupLabel}
          label='Password Lama'
          autoCapitalize='none'
          textInputStyle={styles.formGroupInputPassword}
          value={passwordLama}
          setter={setPasswordLama}
          placeHolder='Password Lama'
          placeHolderStyle={styles.formGroupColorPlaceHorlder}
          secureText={true}
        />
        <Input
          groupStyle={styles.formGroup}
          labelStyle={styles.formGroupLabel}
          label='Password Baru'
          autoCapitalize='none'
          textInputStyle={styles.formGroupInputPassword}
          value={passwordBaru}
          setter={setPasswordBaru}
          placeHolder='Password Baru'
          placeHolderStyle={styles.formGroupColorPlaceHorlder}
          secureText={true}
        />
        <Input
          groupStyle={styles.formGroup}
          labelStyle={styles.formGroupLabel}
          label='Password Ulang'
          autoCapitalize='none'
          textInputStyle={styles.formGroupInputPassword}
          value={passwordUlang}
          setter={setPasswordUlang}
          placeHolder='Ketik ulang password baru'
          placeHolderStyle={styles.formGroupColorPlaceHorlder}
          secureText={true}
        />

        <ProcessButton
          buttonStyle={styles.buttonSubmit}
          onButtonPressed={() => {
            if (passwordBaru == '')
              Alert.alert('Ubah Passowrd Gagal', 'Password Baru Kosong', [
                { text: 'OK' },
              ]);
            else if (passwordLama == '')
              Alert.alert('Ubah Passowrd Gagal', 'Password Lama Kosong', [
                { text: 'OK' },
              ]);
            else {
              if (passwordBaru != passwordUlang)
                Alert.alert('Ubah Passowrd Gagal', 'Password baru tidak sama dengan yang diisi ulang', [
                  { text: 'OK' },
                ]);
              else submit();
            }
          }}
          additionalComponent={<Text style={styles.buttonAccountText}>Simpan</Text>}
        />
        <Text style={styles.appVersionLabel}>Version {AppVersion}</Text>
      </View>
    </AvoidingWrapper>
  )
}