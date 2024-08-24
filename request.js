import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

class Request {

    async checkVersion() {
        const [isCurrentVersion, setIsCurrentVersion] = useState(true);
        const payload = {
            method: "GET",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            }
        };
        fetch(`${value[10]}/version-check`, payload).then((response) => response.json()).then((responseData) => {
            if (responseData['version'] != '2.0.0') {
                setIsCurrentVersion(false);
            }
        });
        return fetch(`${value[10]}/version-check`, payload).then((response) => response.json());
    }

    async login(credential, persistLogin) {
        if (credential[2] == null || credential[2] == "null") {
            return Alert.alert('Login Gagal', 'Pilih Host Server yang tepat', [
                { text: 'OK' },
            ]);
        } else {
            const payload = {
                method: "POST",
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    username: credential[0],
                    password: credential[1]
                })
            };
            return fetch(`${credential[2]}/api/login`, payload)
                .then((response) => response.json()).then((responseData) => {
                    if (JSON.stringify(responseData['result']) == 1) {
                        persistLogin([
                            responseData['username'],
                            responseData['name'],
                            responseData['level'],
                            responseData['csoiditem'],
                            responseData['userid'],
                            responseData['csoidavalan'],
                            responseData['trsiditem'],
                            responseData['trsidavalan'],
                            responseData['token'],
                            responseData['type'],
                            `${credential[2]}/api`
                        ]);
                    } else {
                        Alert.alert('Login Gagal', 'Pastikan Username atau Password anda benar', [
                            { text: 'OK' },
                        ]);
                    }
                });

        }
    }

    async post(route, body) {

        const keys = await AsyncStorage.getItem("sosCredentials");
        const value = JSON.parse(keys);

        const payload = {
            method: "POST",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `${value[9]} ${value[8]}`
            },
            body: JSON.stringify(body ?? {})
        };
        return fetch(`${value[10]}/${route}`, payload).then((response) => response.json());
    }

    async get(route) {
        const keys = await AsyncStorage.getItem("sosCredentials");
        const value = JSON.parse(keys);
        const payload = {
            method: "GET",
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `${value[9]} ${value[8]}`
            }
        };
        return fetch(`${value[10]}/${route}`, payload).then((response) => response.json());
    }
}

export default new Request();