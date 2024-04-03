import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import SafeContainer from "../components/SafeContainer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from "../../firebase.config"; // Importe sua configuração do Firebase
import { Auth } from "firebase/auth";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const cadastrar = async () => {
    if (!nome || !email || !senha) {
      Alert.alert("Atenção", "Preencha nome, email e senha");
      return;
    }

    try {
      const auth = getAuth(); // Obter uma instância de autenticação do Firebase
      const contaUsuario = await createUserWithEmailAndPassword(
        // Criar usuário com email e senha
        auth,
        email,
        senha
      );
      console.log("Conta criada:", contaUsuario);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
    }
  };

  return (
    <SafeContainer>
      <View style={styles.formulario}>
        <TextInput
          placeholder="Nome Completo"
          style={styles.input}
          keyboardType="default"
          onChangeText={(valor) => setNome(valor)}
        />
        <TextInput
          placeholder="E-mail"
          style={styles.input}
          keyboardType="email-address"
          onChangeText={(valor) => setEmail(valor)}
        />
        <TextInput
          placeholder="Senha"
          style={styles.input}
          keyboardType="default"
          secureTextEntry
          onChangeText={(valor) => setSenha(valor)}
        />
        <TouchableOpacity
          style={styles.botaoCadastro}
          onPress={cadastrar}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  formulario: {
    gap: 15,
  },

  input: {
    borderWidth: 1,
    height: 50,
    padding: 8,
    borderRadius: 10,
  },

  botaoCadastro: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    borderRadius: 10,
    height: 50,
  },

  textoBotao: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
