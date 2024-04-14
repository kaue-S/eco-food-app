import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
} from "react-native";
import arrayProdutos from "../api/arrayDeProdutos";
import Produto from "../components/Produto";

export default function Home({ navigation }) {
  const [pesquisar, setPesquisar] = useState("");
  const [produtoFiltrado, setProdutoFiltrado] = useState([]);

  const pesquisarItem = (produto) => {
    setPesquisar(produto);
    const filtro = arrayProdutos.filter(
      (Itemproduto) => Itemproduto.nome == produto
    );

    setProdutoFiltrado(filtro);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.text}>Bem-vindo à página Home!</Text>

        <TextInput
          placeholder="Pesquisar"
          onSubmitEditing={pesquisarItem}
          onChangeText={pesquisarItem}
          value={pesquisar}
        />

        <View>
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
