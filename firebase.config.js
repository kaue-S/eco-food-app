import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Importando recursos da biblioteca de Autenticação
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOkjn8NPtreTkAsfTLcdcEKTZaEDlihC0",
  authDomain: "eco-food-app.firebaseapp.com",
  projectId: "eco-food-app",
  storageBucket: "eco-food-app.appspot.com",
  messagingSenderId: "93024734440",
  appId: "1:93024734440:web:4a7ca7de38e3f739404d5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Configurando o recurso de autenticação para uso em outras partes
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

//Iniciação banco de dados
const db = getDatabase(app);

export {auth, db};
