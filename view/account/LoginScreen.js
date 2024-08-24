import { View, Text, Image } from 'react-native';
import * as React from 'react';
import { styles } from '../../assets/styles/style';
import { Formik } from 'formik';
import AvoidingWrapper from '../../assets/styles/avoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../../Credentials';
import Input from '../component/input';
import ProcessButton from '../component/processButton';
import request from "../../request";



export default function LoginScreen({ navigation }) {
  const {storedCredentials, setStoredCredentials} = React.useContext(CredentialContext);
  const [server, setServer] = React.useState('http://sosapp.sutindo.net:8056');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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

  function handleLogin() {
    request.login([username,password,server],persistLogin);
  }
  return (    
    <AvoidingWrapper>
      <View style={styles.styledContainer}>
        <View style={styles.innerContainer}>
          <Image source={require("../../assets/image/Checkingboxes.png")} style={styles.loginPicture}></Image>
          <Text style={styles.pageTitle}>Stock Opname System</Text>
          <View style={{ width: '100%' }}>
            {/* <Formik initialValues={{ username: '', password: '' }}
              onSubmit={(values) => request.login([values.username,values.password],persistLogin)
              }> */}
              {/* {({ handleChange, handleBlur, handleSubmit, values }) => ( */}
                <View>
                <Input
                      labelStyle={styles.textInputLabel}
                      label='Host'
                      textInputStyle={styles.textInput}
                      autoCapitalize='none'
                      setter={setServer}
                      placeHolder="Isikan Alamat Server, seperti: http://sosapp.sutindo.net:8056"
                      value={server}
                    /> 
                  <Input
                      labelStyle={styles.textInputLabel}
                      label='Username'
                      textInputStyle={styles.textInput}
                      autoCapitalize='none'
                      setter={setUsername}
                      placeHolder="Isikan Username Anda"
                      value={username}
                    />  
                    <Input
                      labelStyle={styles.textInputLabel}
                      label='Password'
                      textInputStyle={styles.textInput}
                      autoCapitalize='none'
                      setter={setPassword}
                      placeHolder="Isikan Password Anda"
                      value={password}
                      secureText={true}
                    />                

                  <ProcessButton
                    buttonStyle={styles.buttonAccount}
                    onButtonPressed={handleLogin}
                    additionalComponent={<Text style={styles.buttonAccountText}>Login</Text>}
                  />
                </View>
              {/* )} */}
            {/* </Formik> */}
          </View>
        </View>
      </View>
    </AvoidingWrapper>
  )
}
