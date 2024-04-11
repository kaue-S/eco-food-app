import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SafeContainer from "../components/SafeContainer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {push, ref, set } from "firebase/database";
import { auth, db } from "../../firebase.config";

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");


    function cadastrar() {
      const usuarioRef = push(ref(db, 'usuarios')); // Gera um novo ID único
      const usuarioKey = usuarioRef.key; // Obtém o ID único gerado

      set(ref(db, 'usuarios/' + usuarioKey), {
        nome: nome,
        email: email,
        senha: senha,
      }); 

  } 
      

  return (
    <SafeContainer>
      <View style={styles.formulario}>
        <View style={styles.campoCadastro}>
          <TextInput
          value={nome}
            placeholder="Nome Completo"
            style={styles.input}
            keyboardType="default"
            onChangeText={(nome) => {setNome(nome)}}
          />
        </View>
        <View style={styles.campoCadastro}>
          <TextInput
          value={email}
            placeholder="E-mail"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(email) => {setEmail(email)}}
          />
        </View>

        <View style={styles.campoCadastro}>
          <TextInput
          value={senha}
            placeholder="Senha"
            style={styles.input}
            keyboardType="default"
            secureTextEntry
            onChangeText={(senha) => {setSenha(senha)}}
          />
        </View>

        <Pressable
          style={styles.botaoCadastro}
          onPress={cadastrar}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>cadastrar</Text>
        </Pressable>
      </View>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  formulario: {
    gap: 30,
    alignItems: "center",
  },

  campoCadastro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
  },

  input: {
    height: 50,
    padding: 8,
    width: "80%",
  },

  iconeInput: {
    marginRight: 10,
  },

  botaoCadastro: {
    height: 50,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a8cf45",
  },

  textoBotao: {
    fontSize: 18,
    color: "#466060",
    fontFamily: "Comfortaa",
  },
});
