import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

export default function PerfilUsuario() {
  const { email, displayName: nome, endereco, telefone } = auth.currentUser;
  console.log(auth.currentUser);
  const logout = async () => {
    Alert.alert("Deslogar", "Tem certeza que quer sair do app?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagem}>
        <View style={styles.foto}>
          <Image
            source={require("../../assets/images/LogoECOFOOD.png")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.nome}>{nome}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Dados do Perfil</Text>
      </View>
      <View style={styles.dados}>
        <View style={styles.input}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.profileText}>{nome}</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.profileText}>{email}</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.profileText}>1195660-6737</Text>
        </View>
        <View style={styles.input}>
          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.profileText}>R.Francisco coimbra, 403</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Editar Perfil</Text>
        </Pressable>
        <Pressable style={styles.buttonSair} onPress={logout}>
          <Text style={styles.buttonTextS}>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Alinha os itens no início do container
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  imagem: {
    backgroundColor: "#a8cf45",
    marginBottom: 20,
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center", // Alinha os itens verticalmente no centro
  },
  dados: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#a8cf45",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    width: "90%",
    height: 50,
    paddingHorizontal: 10,
  },
  foto: {
    backgroundColor: "#ccc", // Cor de fundo temporária
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 18,
    flex: 1, // Para garantir que o texto se ajuste corretamente
    color: "#466060",
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  nome: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: "Comfortaa",
    fontWeight: "700",
    color: "#466060",
  },
  button: {
    backgroundColor: "#a8cf45",
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: "45%", // Ajuste conforme necessário
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#466060",
    fontSize: 18,
  },
  header: {
    marginBottom: 20, // Adiciona margem inferior para espaçamento
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#466060",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  buttonSair: {
    backgroundColor: "#466060",
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: "45%", // Ajuste conforme necessário
    borderRadius: 10,
    alignItems: "center",
  },
  buttonTextS: {
    color: "#eca457",
    fontSize: 18,
  },
});
``;
