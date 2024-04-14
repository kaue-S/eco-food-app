import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import React from "react";
// importação dos recursos de importação
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

export default function PerfilUsuario() {
  /*  recuperando e-mail e displayName: apelido para uso  */
  const { email, displayName: nome } = auth.currentUser;
  console.log(email, nome);
  // Função logout para sair da conta
  const logout = async () => {
    Vibration.vibrate(300);

    Alert.alert("Deslogar", "Tem certeza que quer sair do app?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          try {
            /* Utilizamos a função signOut para remover os dados do auth 
          no momento e enviamos para a tela inicial */
            await signOut(auth);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };
  return (
    <View>
      <Text style={estilosPerfil.text}>PerfilUsuario</Text>
      <Text style={estilosPerfil.text}>{nome}</Text>
      <Text style={estilosPerfil.text}>{email}</Text>
      <Pressable style={estilosPerfil.button} onPress={logout}>
        <Text style={estilosPerfil.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const estilosPerfil = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    marginVertical: 12,
  },
});
