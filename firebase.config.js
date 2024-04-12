import { initializeApp } from "firebase/app";

// Importando recursos da biblioteca de Autenticação
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhIXdDG9fcfFN3oDCXcLQe9E0SQLataT4",
  authDomain: "eco-food-db.firebaseapp.com",
  projectId: "eco-food-db",
  storageBucket: "eco-food-db.appspot.com",
  messagingSenderId: "905163517071",
  appId: "1:905163517071:web:7d78cd7a2deef0e93e54fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Configurando o recurso de autenticação para uso em outras partes
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
