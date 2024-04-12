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

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Bem-vindo a página Home!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>Destaques</Text>
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
    marginBottom: 50,
    marginTop:20,
    marginLeft: 15,
    fontFamily: "Comfortaa",
  },
  button: {
    backgroundColor: "#a8cf45",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#466060",
    //fontFamily: "Comfortaa",
    fontSize: 22,
    fontWeight: "bold",
    
  },
  viewProdutos: {
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 18,
    padding: 30,
  },
});
