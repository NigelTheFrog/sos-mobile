import { View, Text, Image } from 'react-native';
import * as React from 'react';
import { Colors, styles } from '../../assets/styles/style';
import { Formik } from 'formik';
import AvoidingWrapper from '../../assets/styles/avoidingWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CredentialContext } from '../../Credentials';
import Input from '../component/input';
import ProcessButton from '../component/processButton';
import request from "../../request";
import Dropdownitem from '../component/dropdownitem';



export default function LoginScreen({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  const [isFocus, setIsFocus] = React.useState(false);
  const [server, setServer] = React.useState('');
  const [serverData] = React.useState([
    { value: 'http://srmsby.sos.sutindo.net:8056', label: 'SRM SBY' },
    { value: 'http://kkssby.sos.sutindo.net:8056', label: 'KKS SBY' },
    { value: 'http://ssosmd.sos.sutindo.net:8056', label: 'SSO SMD' },
    { value: 'http://srmbpn.sos.sutindo.net:8056', label: 'SRM BPN' },
    { value: 'http://ssosby.sos.sutindo.net:8056', label: 'SSO SBY' },
    { value: 'http://aassby.sos.sutindo.net:8056', label: 'AAS SBY' },
    { value: 'http://srmsmg.sos.sutindo.net:8056', label: 'SRM SMG' },
    { value: 'http://fasmlg.sos.sutindo.net:8056', label: 'FAS MLG' },
    { value: 'http://smisby.sos.sutindo.net:8056', label: 'SMI SBY' },
    { value: 'http://pstsby.sos.sutindo.net:8056', label: 'PST SBY' },
    { value: 'http://pmisby.sos.sutindo.net:8056', label: 'PMI SBY' },
    { value: 'http://rra.sos.sutindo.net:8056', label: 'RRA' },
    { value: 'http://bas.sos.sutindo.net:8056', label: 'BAS' },
    { value: 'http://pstjktb.sos.sutindo.net:8056', label: 'PST JKTB' },
    { value: 'http://pstjktr.sos.sutindo.net:8056', label: 'PST JKTR' },
    { value: 'http://pstpnk.sos.sutindo.net:8056', label: 'PST PNK' },
    { value: 'http://aersby.sos.sutindo.net:8056', label: 'AER SBY' },
    { value: 'http://pstpku.sos.sutindo.net:8056', label: 'PST PKU' },
    { value: 'http://spijkt.sos.sutindo.net:8056', label: 'SPI JKT' },
    { value: 'http://smssrg.sos.sutindo.net:8056', label: 'SMS SRG' },
    { value: 'http://gcisby.sos.sutindo.net:8056', label: 'GCI SBY' },
    { value: 'http://ssssby.sos.sutindo.net:8056', label: 'SSS SBY' },
    { value: 'http://abbjyp.sos.sutindo.net:8056', label: 'ABB JYP' },
    { value: 'http://abbamb.sos.sutindo.net:8056', label: 'ABB AMB' },
    { value: 'http://abbtmk.sos.sutindo.net:8056', label: 'ABB TMK' },
    { value: 'http://pstpst.sos.sutindo.net:8056', label: 'PST PST' },
    { value: 'http://aassmg.sos.sutindo.net:8056', label: 'AAS SMG' },
    { value: 'http://srmjkt.sos.sutindo.net:8056', label: 'SRM JKT' },
    { value: 'http://srmsmgs.sos.sutindo.net:8056', label: 'SRM SMGS' },
    { value: 'http://pmijkt.sos.sutindo.net:8056', label: 'PMI JKT' },
    { value: 'http://aerjkt.sos.sutindo.net:8056', label: 'AER JKT' },
    { value: 'http://aersmg.sos.sutindo.net:8056', label: 'AER SMG' },
    { value: 'http://aerbli.sos.sutindo.net:8056', label: 'AER BLI' },
    { value: 'http://scisby.sos.sutindo.net:8056', label: 'SCI SBY' },
    { value: 'http://scickr.sos.sutindo.net:8056', label: 'SCI CKR' },
    { value: 'http://ivisby.sos.sutindo.net:8056', label: 'IVI SBY' },
    { value: 'http://ivijkt.sos.sutindo.net:8056', label: 'IVI JKT' },
    // { value: 'dev.sos.sutindo.net:8056', label: 'DEV' },
    // { value: 'trial.sos.sutindo.net:8056', label: 'TRIAL' }
  ]);
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
    request.login([username, password, server], persistLogin);
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
              <Dropdownitem
                labelStyle={styles.textInputLabel}
                label='Company'
                dropdownStyle={styles.textInput}
                data={serverData}
                setFocus={setIsFocus}
                placeHolder="--Pilih Company--"
                placeHolderStyle={{color:Colors.darkGrey}}
                valueField="value"
                value={server}
                searchable={true}
                setter={server => {
                  setServer(server.value);
                  setIsFocus(false);
                }}
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
