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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";

export default function LoginUsuario({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const Logar = async () => {
    try {
      if (!email || !senha) {
        Alert.alert("Atenção!", "Preencha corretamente o e-mail e a senha!");
        return;
      }

      // Após o login bem-sucedido, você pode navegar para outra tela, por exemplo:
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      Alert.alert(
        "Erro",
        "Não foi possível fazer login. Verifique suas credenciais e tente novamente."
      );
    }
  };

  return (
    <SafeContainer>
      <View style={styles.formulario}>
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
          style={styles.botaoLogin}
          onPress={Logar}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>Login</Text>
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

  botaoLogin: {
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
