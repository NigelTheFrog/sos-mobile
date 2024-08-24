import { Alert } from "react-native";
import request from "../request";
import AsyncStorage from "@react-native-async-storage/async-storage";

class HomeController {

    displayData(route, username, csoid, setter) {
        request.post(route, { username: username, csoid: csoid }).then((responseData) => {
            setter(responseData['data']);
        }); 
    }
    
    startCSO(route, credentialData, type, credentialSetter) {
        request.post(route, { username: credentialData[0] }).then((responseData) => {
            if (responseData['result'] == 1) {
                let storedData = [];
                if (type == 'R') {
                    storedData = [
                        credentialData[0],
                        credentialData[1],
                        credentialData[2],
                        responseData['csoid'],
                        credentialData[4],
                        credentialData[5],
                        responseData['trsid'],
                        credentialData[7],
                        credentialData[8],
                        credentialData[9],
                        credentialData[10]
                    ];
                } else {
                    storedData = [
                        credentialData[0],
                        credentialData[1],
                        credentialData[2],
                        credentialData[3],
                        credentialData[4],
                        responseData['csoid'],
                        credentialData[6],
                        responseData['trsid'],
                        credentialData[8],
                        credentialData[9],
                        credentialData[10]
                    ];
                }
                AsyncStorage.setItem('sosCredentials', JSON.stringify(storedData))
                    .then(() => {
                        credentialSetter(storedData);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                Alert.alert('Start CSO Gagal', 'Harap lakukan CSO', [
                    { text: 'OK' },
                ]);
            }
        });
    }

    submitItem(csoid, setter) {
        request.post('submit-item', { csoid: csoid }).then((responseData) => {
            let arrayData = [];
            for (var i = 0; i < Object.keys(responseData['data']).length; i++) {
                arrayData.push(responseData['data']);
            }
            setter(responseData['data']);
        });
    }

    checkCsoActive(route, username, setCsoActive, setTrsId) {
        request.post(route, { username: username }).then((responseData) => {
            if (responseData['result'] == 1) {
                setCsoActive(true);
                setTrsId(responseData['trsid']);
            }
            else setCsoActive(false)
        });
    }
}

export default new HomeController();