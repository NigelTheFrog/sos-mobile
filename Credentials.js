import { createContext } from "react";

export const CredentialContext = createContext({storedCredentials: {}, setStoredCredentials: ()=>{}})
export const BaseURL = "http://pstjktr.sos.sutindo.net:8056/api";
export const AppVersion = '4.4.3';
// export const BaseURL = "http://192.168.88.56/sos-dev/public/api";