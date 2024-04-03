// Importar a função initializeApp do Firebase
import { initializeApp } from "firebase/app";
// Importar o módulo de autenticação do Firebase
import { getAuth } from "firebase/auth";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAhIXdDG9fcfFN3oDCXcLQe9E0SQLataT4",
  authDomain: "eco-food-db.firebaseapp.com",
  projectId: "eco-food-db",
  storageBucket: "eco-food-db.appspot.com",
  messagingSenderId: "905163517071",
  appId: "1:905163517071:web:7d78cd7a2deef0e93e54fa",
};

// Inicializar o Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obter a instância do serviço de autenticação
export default auth = getAuth(firebaseApp);
