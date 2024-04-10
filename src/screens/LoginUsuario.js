import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
} from "react-native";
import SafeContainer from "../components/SafeContainer";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export default function LoginUsuario({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const Logar = async () => {
    try {
      if (!email || !senha) {
        Alert.alert("Atenção!", "Preencha corretamente o e-mail e a senha!");
        return;
      }

      setLoading(true);

      const authInstance = getAuth();
      await signInWithEmailAndPassword(authInstance, email, senha);
      navigation.navigate("Home");
    } catch (error) {
      let errorMessage = "O e-mail ou a senha está incorreto.";
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        errorMessage = "O e-mail ou a senha está incorreto.";
      }
      Alert.alert("Erro", errorMessage);
    } finally {
      setLoading(false);
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
        <Pressable
          style={styles.botaoLogin}
          onPress={Logar}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>Login</Text>
          )}
        </Pressable>
        <Pressable
          style={styles.esqueciSenha}
          onPress={() => navigation.navigate("EsqueciSenha")}
        >
          <Text style={styles.textoSenha}>Esqueci minha senha!</Text>
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

  input: {
    borderWidth: 1,
    height: 50,
    padding: 8,
    borderRadius: 10,
    width: "80%",
  },

  botaoLogin: {
    height: 50,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eca457",
  },

  textoBotao: {
    fontSize: 14,
    color: "#466060",
    fontFamily: "Comfortaa",
  },
  textoSenha: {
    fontSize: 14,
    color: "#466060",
    fontFamily: "Comfortaa",
    textDecorationLine: "underline",
  },
  esqueciSenha: {
    height: 30,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
