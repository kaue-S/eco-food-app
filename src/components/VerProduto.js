import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import arrayComerciante from "../api/arrayDeComerciante";

export default function VerProduto({ produto }) {
  const [quantidadeNoCarrinho, setQuantidadeNoCarrinho] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);

  const tirarQuantidade = () => {
    if (quantidadeNoCarrinho < 1) {
      return setTotalCompra(0);
    } else {
      let novaQuantidade = quantidadeNoCarrinho - 1;
      setQuantidadeNoCarrinho(novaQuantidade);

      setTotalCompra(novaQuantidade * produto.preco);
    }
  };
  const addQuantidade = () => {
    if (quantidadeNoCarrinho >= produto.quantidade) {
      return;
    } else {
      let novaQuantidade = quantidadeNoCarrinho + 1;
      setQuantidadeNoCarrinho(novaQuantidade);
      setTotalCompra(novaQuantidade * produto.preco);
    }
  };

  const comerciante = arrayComerciante.filter((comercio) => {
    return comercio.id === produto.mercado_id;
  });

  console.log(comerciante[0]);
  return (
    <View style={estilos.viewModal}>
      <Image
        style={estilos.imagemProduto}
        source={{ uri: `${produto.foto}` }}
      />
      <Text>{produto.nome}</Text>
      <Text>Preço: R$ {produto.preco} </Text>
      <Text>mercado: {comerciante[0].nome}</Text>

      <View style={estilos.viewBotoes}>
        <Text>quantidade:</Text>
        <View style={estilos.viewBotoes}>
          <Pressable style={estilos.botaoCancelar} onPress={tirarQuantidade}>
            <Text>-</Text>
          </Pressable>

          <Text>{quantidadeNoCarrinho}</Text>

          <Pressable style={estilos.botaoCancelar} onPress={addQuantidade}>
            <Text>+</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text>Total: {totalCompra} </Text>
      </View>
      <View>
        <Pressable style={estilos.botaoCancelar}>
          <Text>Adicionar ao Carrinho</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  imagemProduto: {
    width: 100,
    height: 100,
  },
  botaoCancelar: {
    backgroundColor: "red",
    padding: 18,
    margin: 12,
  },
  viewModal: {
    backgroundColor: "#F29199",
    justifyContent: "center",
  },
  modal: {
    flex: 1,
  },
  viewBotoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  fecharModal: {
    margin: 12,
    padding: 12,
  },
});
