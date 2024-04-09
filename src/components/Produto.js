import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

export default function Produto({ produto }) {
  const [aparecerModal, setAparecerModal] = useState(false);
  const [quantidadeNoCarrinho, setQuantidadeNoCarrinho] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);

  const navigation = useNavigation();
  const verProduto = () => {
    setAparecerModal(true);
  };
  const cancelar = () => {
    setAparecerModal(false);
    setQuantidadeNoCarrinho(0);
    setTotalCompra(0);
    return;
  };

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

  return (
    <>
      <Pressable key={produto.id} onPress={verProduto}>
        <Image
          style={estilos.imagemProduto}
          source={{ uri: `${produto.foto}` }}
        />
        <Text>{produto.nome}</Text>
        <Text>Preço: R$ {produto.preco} </Text>
      </Pressable>
      <Modal
        style={estilos.modal}
        animationType="slide"
        visible={aparecerModal}
        transparent={true}
      >
        <View style={estilos.viewModal}>
          <Pressable onPress={cancelar} style={estilos.fecharModal}>
            <AntDesign name="closecircle" size={24} color="black" />
          </Pressable>
          <Image
            style={estilos.imagemProduto}
            source={{ uri: `${produto.foto}` }}
          />
          <Text>{produto.nome}</Text>
          <Text>Preço: R$ {produto.preco} </Text>
          <Text>mercado: {produto.mercado}</Text>

          <View style={estilos.viewBotoes}>
            <Text>quantidade:</Text>
            <View style={estilos.viewBotoes}>
              <Pressable
                style={estilos.botaoCancelar}
                onPress={tirarQuantidade}
              >
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
            <Pressable style={estilos.botaoCancelar} onPress={cancelar}>
              <Text>Adicionar ao Carrinho</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
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
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 5,
    marginTop: 200,
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
