import { View, Text, Image, Dimensions } from 'react-native';
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
import {MaterialCommunityIcons } from '@expo/vector-icons';
import { AppVersion } from '../../Credentials';



export default function LoginScreen({ navigation }) {
  const { storedCredentials, setStoredCredentials } = React.useContext(CredentialContext);
  const [isFocus, setIsFocus] = React.useState(false);
  const [server, setServer] = React.useState('');
  const [serverData] = React.useState([
    { value: 'http://aassby.sos.sutindo.net:8056', label: 'AAS SBY' },
    { value: 'http://aassmg.sos.sutindo.net:8056', label: 'AAS SMG' },
    { value: 'http://abbamb.sos.sutindo.net:8056', label: 'ABB AMB' },
    { value: 'http://abbjyp.sos.sutindo.net:8056', label: 'ABB JYP' },
    { value: 'http://abbtmk.sos.sutindo.net:8056', label: 'ABB TMK' },
    { value: 'http://aerbli.sos.sutindo.net:8056', label: 'AER BLI' },
    { value: 'http://aerjkt.sos.sutindo.net:8056', label: 'AER JKT' },
    { value: 'http://aersby.sos.sutindo.net:8056', label: 'AER SBY' },
    { value: 'http://aersmg.sos.sutindo.net:8056', label: 'AER SMG' },
    { value: 'http://aerpcm.sos.sutindo.net:8056', label: 'AER SHOWROOM PCM' },
    { value: 'http://aerptc.sos.sutindo.net:8056', label: 'AER SHOWROOM PTC' },
    { value: 'http://aerpma.sos.sutindo.net:8056', label: 'AER SHOWROOM PMA' },
    { value: 'http://bas.sos.sutindo.net:8056', label: 'BAS' },
    { value: 'http://fasmlg.sos.sutindo.net:8056', label: 'FAS MLG' },
    { value: 'http://gcijkt.sos.sutindo.net:8056', label: 'GCI JKT' },
    { value: 'http://gcisby.sos.sutindo.net:8056', label: 'GCI SBY' },
    { value: 'http://ivijkt.sos.sutindo.net:8056', label: 'IVI JKT' },
    { value: 'http://ivisby.sos.sutindo.net:8056', label: 'IVI SBY' },
    { value: 'http://kkssby.sos.sutindo.net:8056', label: 'KKS SBY' },
    { value: 'http://pmijkt.sos.sutindo.net:8056', label: 'PMI JKT' },
    { value: 'http://pmisby.sos.sutindo.net:8056', label: 'PMI SBY' },
    { value: 'http://pstjktb.sos.sutindo.net:8056', label: 'PST JKTB' },
    { value: 'http://pstjktr.sos.sutindo.net:8056', label: 'PST JKTR' },
    { value: 'http://pstjktbb.sos.sutindo.net:8056', label: 'PST JKT BALARAJA B' },
    { value: 'http://pstjktbr.sos.sutindo.net:8056', label: 'PST JKT BALARAJA R' },
    { value: 'http://pstjktib.sos.sutindo.net:8056', label: 'PST JKT INDOMETAL B' },
    { value: 'http://pstjktir.sos.sutindo.net:8056', label: 'PST JKT INDOMETAL R' },
    { value: 'http://pstpkutko.sos.sutindo.net:8056', label: 'PST PEKANBARU TOKO' },
    { value: 'http://pstpku.sos.sutindo.net:8056', label: 'PST PKU' },
    { value: 'http://pstpnk.sos.sutindo.net:8056', label: 'PST PNK' },
    { value: 'http://pstpst.sos.sutindo.net:8056', label: 'PST PST' },
    { value: 'http://pstsby.sos.sutindo.net:8056', label: 'PST SBY' },  
    { value: 'http://pstsbyjkt.sos.sutindo.net:8056', label: 'PST SBY JKT' },      
    { value: 'http://rrasby.sos.sutindo.net:8056', label: 'RRA SBY' },
    { value: 'http://rrapg24.sos.sutindo.net:8056', label: 'RRA PEGIRIAN 24' },
    { value: 'http://rrapg38.sos.sutindo.net:8056', label: 'RRA PEGIRIAN 38' },
    { value: 'http://scickr.sos.sutindo.net:8056', label: 'SCI CKR' },
    { value: 'http://scisby.sos.sutindo.net:8056', label: 'SCI SBY' },
    { value: 'http://smisby.sos.sutindo.net:8056', label: 'SMI SBY' },
    { value: 'http://smidpk.sos.sutindo.net:8056', label: 'SMI DUPAK' },
    { value: 'http://smiksm.sos.sutindo.net:8056', label: 'SMI KOSAMBI' },
    { value: 'http://smsnbr.sos.sutindo.net:8056', label: 'SMS NBR' },
    { value: 'http://smssrg.sos.sutindo.net:8056', label: 'SMS SRG' },
    { value: 'http://spijkt.sos.sutindo.net:8056', label: 'SPI JKT' },
    { value: 'http://srmbpn.sos.sutindo.net:8056', label: 'SRM BPN' },
    { value: 'http://srmjkt.sos.sutindo.net:8056', label: 'SRM JKT' },
    { value: 'http://srmsby.sos.sutindo.net:8056', label: 'SRM SBY' },
    { value: 'http://srmsmg.sos.sutindo.net:8056', label: 'SRM SMG' },
    { value: 'http://srmsmgs.sos.sutindo.net:8056', label: 'SRM SMGS' },
    { value: 'http://ssosby.sos.sutindo.net:8056', label: 'SSO SBY' },
    { value: 'http://ssosmd.sos.sutindo.net:8056', label: 'SSO SMD' },
    { value: 'http://sssjkt.sos.sutindo.net:8056', label: 'SSS JKT' },
    { value: 'http://ssssby.sos.sutindo.net:8056', label: 'SSS SBY' },
    { value: 'http://stinox.sos.sutindo.net:8056', label: 'STINOX' },
    { value: 'http://trial.sos.sutindo.net:8056', label: 'TRIAL' },
    { value: 'http://dev.sos.sutindo.net:8056', label: 'DEV' },
    { value: 'http://devrtg.sos.sutindo.net:8056', label: 'DEV REALTING' },
    { value: 'http://devsap.sos.sutindo.net:8056', label: 'DEV SAP' },
    { value: 'http://192.168.100.147:8000', label: 'DEV LOCAL NIGEL' }    
  ]);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);
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
              {/* <Input
                labelStyle={styles.textInputLabel}
                label='Host'
                textInputStyle={styles.textInput}
                autoCapitalize='none'
                setter={setServer}
                placeHolder="Isikan Username Anda"
                value={server}
              /> */}
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
                textInputStyle={[styles.textInput,{width: '90%'}]}
                autoCapitalize='none'
                setter={setPassword}
                placeHolder="Isikan Password Anda"
                value={password}
                secureText={showPassword}  
                isPassword={true}              
                showPassword={
                  <MaterialCommunityIcons
                    name={showPassword ? 'eye-off' : 'eye'}
                    size={22}
                    style={{marginLeft: 5}}
                    color="#aaa"
                    onPress={() => setShowPassword(!showPassword)}
                />
                }
              />

              <ProcessButton
                buttonStyle={styles.buttonAccount}
                onButtonPressed={handleLogin}
                additionalComponent={<Text style={styles.buttonAccountText}>Login</Text>}
              />
              <Text style={styles.appVersionLabel}>Version {AppVersion}</Text>
            </View>
            {/* )} */}
            {/* </Formik> */}
          </View>
        </View>
      </View>
    </AvoidingWrapper>
  )
}
