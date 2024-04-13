import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import arrayProdutos from "../api/arrayDeProdutos";
import Produto from "../components/Produto";
// importação dos recursos de importação

import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";

export default function Home({ navigation }) {
  /*  recuperando e-mail e displayName: apelido para uso  */
  const { email, displayName: nome } = auth.currentUser;
  console.log(email);

  // Função logout para sair da conta
  const logout = async () => {
    try {
      /* Utilizamos a função signOut para remover os dados do auth 
        no momento e enviamos para a tela inicial */
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Bem-vindo à página Home!</Text>
        <TouchableOpacity style={styles.button} onPress={logout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>Tudo</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.viewProdutos}
          >
            {arrayProdutos.map((itemProduto) => {
              return <Produto key={itemProduto.id} produto={itemProduto} />;
            })}
          </ScrollView>
        </View>
        <View>
          <Text style={styles.text}>Destaques</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.viewProdutos}
          >
            {arrayProdutos
              .filter((itemProduto) => {
                return itemProduto.destaque == "sim";
              })
              .map((itemProduto) => {
                return <Produto key={itemProduto.id} produto={itemProduto} />;
              })}
          </ScrollView>
        </View>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("Carrinho")}
        >
          <Text style={styles.buttonText}>Carrinho</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    padding: 12,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  viewProdutos: {
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 18,
    padding: 30,
  },
});
