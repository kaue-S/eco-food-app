import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Produto({ produto }) {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.navigate("AddCarrinho", { produto })}>
      <Image
        style={estilos.imagemProduto}
        source={{ uri: `${produto.foto}` }}
      />
      <Text>{produto.nome}</Text>
      <Text>Preço: {produto.preco}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  imagemProduto: {
    width: 100,
    height: 100,
  },
});
