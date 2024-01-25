import { View, Text, Image, Alert, TextInput, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { styles } from '../../assets/styles/style';
import { Formik } from 'formik';
import AvoidingWrapper from '../../assets/styles/avoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseURL, CredentialContext } from '../../Credentials';


export default function LoginScreen({ navigation }) {
  const {storedCredentials, setStoredCredentials} = React.useContext(CredentialContext);
  const persistLogin = (credentials, message, status) => {
    // console.log(credentials);
    AsyncStorage.setItem('sosCredentials', JSON.stringify(credentials))
    .then(() => {
      setStoredCredentials(credentials);
    })
    .catch((error) => {
      console.log(error);
    })
  }
  return (
    <AvoidingWrapper>
      <View style={styles.styledContainer}>

        <View style={styles.innerContainer}>
          <Image source={require("../../assets/image/Checkingboxes.png")} style={styles.loginPicture}></Image>
          <Text style={styles.pageTitle}>Stock Opname System</Text>
          <View style={{ width: '100%' }}>
            <Formik initialValues={{ username: '', password: '' }}
              onSubmit={(values) => {
                fetch(`${BaseURL}/login`, {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: values.username,
                    password: values.password
                  }),
                })
                  .then((response) => response.json())
                  .then((responseData) => {
                    if(JSON.stringify(responseData['result']) == 1) {
                      persistLogin([
                        responseData['username'], 
                        responseData['name'], 
                        responseData['level'],
                        responseData['csoid'], 
                      ]);
                    } else {
                      Alert.alert('Login Gagal', 'Pastikan Username atau Password anda benar', [
                        {text: 'OK'},
                      ]);
                    }
                  })
              }}>
              {({ handleChange, handleBlur, handleSubmit, values }) => (
                <View>
                  <View>
                    <Text style={styles.textInputLabel}>Username</Text>
                    <TextInput style={styles.textInput}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      placeholder="Isikan Username Anda"
                      value={values.username}
                    />
                  </View>
                  <View>
                    <Text style={styles.textInputLabel}>Password</Text>
                    <TextInput style={styles.textInput}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      placeholder="Isikan Password Anda"
                      value={values.password}
                      secureTextEntry={true}
                    />
                  </View>


                  <Text style={styles.warningMessage}>

                  </Text>
                  <TouchableOpacity style={styles.buttonAccount} onPress={handleSubmit}>
                    <Text style={styles.buttonAccountText}>Login</Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>

        </View>
      </View>
    </AvoidingWrapper>
  )
}
