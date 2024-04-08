import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import arrayProdutos from "../api/arrayDeProdutos";
import Produto from "../components/Produto";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo à página Home!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Carrinho")}
      >
        <Text style={styles.buttonText}>Carrinho</Text>
      </Pressable>

      <View style={styles.viewProdutos}>
        {arrayProdutos.map((itemProduto) => {
          return <Produto produto={itemProduto} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
});
