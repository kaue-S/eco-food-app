import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setEnviado(true);
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição de senha:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao enviar o e-mail de redefinição de senha."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Esqueceu sua senha?</Text>
      <Text style={styles.descricao}>
        Por favor, insira o endereço de e-mail associado à sua conta para
        receber as instruções de redefinição de senha.
      </Text>
      <View >
      <Text style={styles.tituloInput}>E-mail:</Text>
      <View style={styles.campoEmail}>
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={(valor) => setEmail(valor)}
      />
      </View>
      </View>
      <Pressable style={styles.botao} onPress={handleResetPassword}>
        <Text style={styles.textoBotao}>Redefinir Senha</Text>
      </Pressable>
      {enviado && (
        <Text style={styles.mensagem}>
          Um e-mail com instruções de redefinição de senha foi enviado para o
          seu endereço de e-mail.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
  },
  descricao: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 10,
    width: "80%",
  },
  botao: {
    backgroundColor: "#eca457",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  textoBotao: {
    color: "#466060",
    fontSize: 16,
  },
  mensagem: {
    marginTop: 20,
    textAlign: "center",
  },

  tituloInput: {
    marginLeft: 10,
    fontSize: 18,
    color: "#466060",
  },

  campoEmail: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#eca457",
    shadowColor: "black",
    borderRadius: 10,
    marginBottom: 20,
  },
});
