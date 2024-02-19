import { createContext } from "react";

export const CredentialContext = createContext({storedCredentials: {}, setStoredCredentials: ()=>{}})
export const BaseURL = "http://sos.local.sutindo.net/api";