import {
  Alert,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import VerProduto from "./VerProduto";
import { formataPreco } from "../functions/funcoes";

export default function Produto({ produto, pesquisa }) {
  const [aparecerModal, setAparecerModal] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const verProduto = () => {
    setAparecerModal(true);
  };
  const cancelar = () => {
    setAparecerModal(false);
    return;
  };

  return (
    <>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={({ pressed }) => [
          !pressed
            ? estilosProdutos.cardProduto
            : estilosProdutos.cardProdutoPressionado,
        ]}
        key={produto.id}
        onPress={verProduto}
      >
        <View style={estilosProdutos.areaImg}>
          <Image
            resizeMode="cover"
            accessibilityLabel={produto.nome}
            style={estilosProdutos.imagemProduto}
            source={{ uri: `${produto.foto}` }}
          />
        </View>
        <View style={estilosProdutos.areaInfos}>
          <Text style={estilosProdutos.nomeProduto}>{produto.nome}</Text>
          <Text style={estilosProdutos.nomePreco}>
            Preço: {formataPreco(produto.preco)}{" "}
          </Text>
        </View>
      </Pressable>
      <Modal
        style={estilosProdutos.modal}
        animationType="slide"
        visible={aparecerModal}
        transparent={true}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={estilosProdutos.viewModal}>
            <Pressable
              onPress={cancelar}
              style={estilosProdutos.BtnFecharModal}
            >
              <View style={estilosProdutos.fecharModal}>
                <AntDesign name="closecircle" size={24} color="#466060" />
                <Text style={estilosProdutos.tituloModal}>Produto</Text>
              </View>
            </Pressable>
            <VerProduto produto={produto} />
          </View>
        </ScrollView>
      </Modal>
    </>
  );
}

const estilosProdutos = StyleSheet.create({
  imagemProduto: {
    width: 95,
    height: 95,
    borderRadius: 20,
  },
  botaoCancelar: {
    backgroundColor: "red",
    padding: 18,
    margin: 12,
  },
  viewModal: {
    backgroundColor: "#f7f7f7",
    padding: 15,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: "center",
    elevation: 5,
    marginTop: 100,
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
    marginVertical: 8,
    padding: 12,
    justifyContent: "space-around",
  },
  BtnFecharModal: {
    marginBottom: 18,
  },
  tituloModal: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#466060",
    fontFamily: "Comfortaa",
    fontSize: 24,
  },
  cardProduto: {
    width: 160,
    padding: 18,
    justifyContent: "space-around",
    borderRadius: 20,
    //backgroundColor: "#a8c458",
    alignItems: "center",
  },
  cardProdutoPressionado: {
    width: 160,
    //backgroundColor: "#ECA457",
    backgroundColor: "#A8C458",
    padding: 18,
    justifyContent: "space-around",
    borderRadius: 20,
    alignItems: "center",
  },
  areaImg: {
    backgroundColor: "#a8c458",
    width: "100%",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  areaInfos: {
    //backgroundColor: "#f7f7f7",
    padding: 12,
    borderRadius: 12,
    marginVertical: 8,
    alignItems: "center",
  },
  nomeProduto: {
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "bold",
    color: "#466060",
    textAlign: "center",
    marginRight: 4,
  },
  nomePreco: {
    fontFamily: "Barlow",
    fontSize: 12,
    fontWeight: "bold",
    color: "#466060",
  },
});
