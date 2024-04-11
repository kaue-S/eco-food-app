import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";
import React, { useState } from "react";
import arrayComerciante from "../api/arrayDeComerciante";
import TabelaNutricional from "./TabelaNutricional";
import { formataPreco } from "../functions/funcoes";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerProduto({ produto }) {
  const [quantidadeNoCarrinho, setQuantidadeNoCarrinho] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);
  const [verDetalhes, setVerDetalhes] = useState(false);

  const tirarQuantidade = () => {
    if (quantidadeNoCarrinho < 1) {
      setTotalCompra(0);
      return;
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

  /* Analisando o que vem do filter */
  // console.log(comerciante);

  const verInformascoes = () => {
    return setVerDetalhes(true);
  };
  const esconderInformascoes = () => {
    return setVerDetalhes(false);
  };

  const adicionarAoCarrinho = async () => {
    if (quantidadeNoCarrinho <= 0) {
      Alert.alert("Ops!", "Você não colocou os produtos no carrinho");
      Vibration.vibrate(300);
      return;
    }

    try {
      const ListaCarrinho = await AsyncStorage.getItem("@listacarrinho");
      console.log(ListaCarrinho);

      const listaProdutos = ListaCarrinho ? JSON.parse(ListaCarrinho) : [];
      listaProdutos.push({
        produto,
        totalCompra,
        quantidadeNoCarrinho,
      });

      await AsyncStorage.setItem(
        "@listacarrinho",
        JSON.stringify(listaProdutos)
      );

      console.log(ListaCarrinho);
      Alert.alert("Parabens", "Produto adicionado com sucesso");
      Vibration.vibrate(300);

      console.log(listaProdutos);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={estilos.viewModal}>
      <Image
        style={estilos.imagemProduto}
        source={{ uri: `${produto.foto}` }}
      />
      <Text>{produto.nome}</Text>
      <Text>
        Preço:
        {formataPreco(produto.preco)}
      </Text>
      <Text>fornecedor: {comerciante[0].nome}</Text>
      <Text>estabelecimento: {comerciante[0].tipoComercio}</Text>

      {/* Area mais detalhes */}
      {verDetalhes && (
        <Pressable style={estilos.botaoCancelar} onPress={esconderInformascoes}>
          <Text>Menos Detalhes</Text>
        </Pressable>
      )}

      {!verDetalhes && (
        <Pressable style={estilos.botaoCancelar} onPress={verInformascoes}>
          <Text>Mais Detalhes</Text>
        </Pressable>
      )}

      {verDetalhes && (
        <View style={estilos.maisDetalhes}>
          <ScrollView>
            <Text>Contém: {produto.descricao}</Text>
            <TabelaNutricional tabela={produto.tabelaNutricional} />
          </ScrollView>
        </View>
      )}
      {/*fim da Area mais detalhes */}

      <View style={estilos.viewBotoes}>
        <Text>quantidade:</Text>
        <View style={estilos.viewBotoes}>
          <Pressable style={[estilos.botaoCancelar]} onPress={tirarQuantidade}>
            <Text>-</Text>
          </Pressable>

          <Text>{quantidadeNoCarrinho}</Text>

          <Pressable style={[estilos.botaoCancelar]} onPress={addQuantidade}>
            <Text>+</Text>
          </Pressable>
        </View>
      </View>
      <View>
        <Text>estoque: {produto.quantidade}</Text>
        <Text>
          Total:
          {formataPreco(totalCompra)}
        </Text>
      </View>
      <View>
        <Pressable onPress={adicionarAoCarrinho} style={estilos.botaoCancelar}>
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
  maisDetalhes: {
    flex: 1,
  },
});
