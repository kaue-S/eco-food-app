import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SafeContainer from "../components/SafeContainer";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {getDatabase, ref, set } from "firebase/database";
import { auth, db } from "../../firebase.config";

export default function CadastroUsuario({ navigation }) {
  const [cpf, setCpf] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  const cadastrar = async () => {
    if (!email || !senha || !nome) {  
      Alert.alert("Atenção!", "Preencha nome, e-mail e senha!");
      return;
    }

    try {
      const contaUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );
      
      setLoading(true);

      if (contaUsuario.user) {
        await updateProfile(auth.currentUser, { displayName: nome });
        console.log(contaUsuario.user.displayName);

        const db = getDatabase();
        const userRef = ref(db, 'usuarios/' + contaUsuario.user.uid);

        const endereco = {
          Rua: rua,
          numero: numero
        };

        await set(userRef, {
            nome: nome,
            email: email,
            cpf: cpf,
            endereco: endereco
            // outros dados que você deseja salvar
        });


      }

      Alert.alert("Cadastro", "Seu cadastro foi concluído com sucesso!");
      navigation.replace("Home");
      
    } catch (error) {
      // console.error(error.code);
      let mensagem;
      switch (error.code) {
        case "auth/email-already-in-use":
          mensagem = "E-mail já cadastrado!";
          break;
        case "auth/weak-password":
          mensagem = "Senha fraca (mínimo de 6 caracteres)";
          break;
        case "auth/invalid-email":
          mensagem = "Endereço de e-mail inválido!";
          break;
        default:
          mensagem = "Houve um erro, tente mais tarde!";
          break;
      }
      Alert.alert("Ops!", mensagem);

    } finally {setLoading(false)}
    
  };

  return (
    <SafeContainer>
      <View style={styles.formulario}>
        <View>
          <Text style={styles.tituloInput}>Nome:</Text>
          <View style={styles.campoCadastro}>
            <TextInput
              placeholder="Nome Completo"
              placeholderTextColor={"#a0a0a0"}
              style={styles.input}
              keyboardType="default"
              onChangeText={(valor) => setNome(valor)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.tituloInput}>CPF:</Text>
          <View style={styles.campoCadastro}>
            <TextInput
              placeholder="Numeros aleatórios"
              placeholderTextColor={"#a0a0a0"}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(valor) => setCpf(valor)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.tituloInput}>Endereço:</Text>
          <View style={styles.campoCadastro}>
            <TextInput
              placeholder="Ex: Rua coatá"
              placeholderTextColor={"#a0a0a0"}
              style={styles.input}
              keyboardType="default"
              onChangeText={(valor) => setRua(valor)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.tituloInput}>numero:</Text>
          <View style={styles.campoCadastro}>
            <TextInput
              placeholder="Ex: Rua coatá"
              placeholderTextColor={"#a0a0a0"}
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(valor) => setNumero(valor)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.tituloInput}>E-mail:</Text>
        <View style={styles.campoCadastro}>
          <TextInput
            placeholder="E-mail"
            placeholderTextColor={"#a0a0a0"}
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(valor) => setEmail(valor)}
          />
        </View>
        </View>
        
        <View>
          <Text style={styles.tituloInput}>Senha:</Text>
        <View style={styles.campoCadastro}>
          <TextInput
            placeholder="Senha"
            placeholderTextColor={"#a0a0a0"}
            style={styles.input}
            keyboardType="default"
            secureTextEntry
            onChangeText={(valor) => setSenha(valor)}
          />
        </View>
        </View>

        <Pressable
          style={styles.botaoCadastro}
          onPress={cadastrar}
          activeOpacity={0.8}
        >
          {loading ? (<ActivityIndicator size="small" color="#fff"/>) : (
             <Text style={styles.textoBotao}>cadastrar</Text>
          )}
         
        </Pressable>
      </View>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  formulario: {
    gap: 20,
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


  tituloInput: {
    marginLeft: 10,
    fontSize: 18,
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
