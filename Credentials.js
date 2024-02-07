import { createContext } from "react";

export const CredentialContext = createContext({storedCredentials: {}, setStoredCredentials: ()=>{}})
export const BaseURL = "https://3c69-103-12-31-66.ngrok-free.app/api";