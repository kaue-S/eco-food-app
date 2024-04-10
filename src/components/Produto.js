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
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import VerProduto from "./VerProduto";
import { formataPreco } from "../functions/funcoes";

export default function Produto({ produto }) {
  const [aparecerModal, setAparecerModal] = useState(false);

  const navigation = useNavigation();
  const verProduto = () => {
    setAparecerModal(true);
  };
  const cancelar = () => {
    setAparecerModal(false);
    return;
  };

  return (
    <>
      <Pressable key={produto.id} onPress={verProduto}>
        <Image
          style={estilos.imagemProduto}
          source={{ uri: `${produto.foto}` }}
        />
        <Text>{produto.nome}</Text>
        <Text>Preço: {formataPreco(produto.preco)} </Text>
      </Pressable>
      <Modal
        style={estilos.modal}
        animationType="slide"
        visible={aparecerModal}
        transparent={true}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={estilos.viewModal}>
            <Pressable onPress={cancelar} style={estilos.fecharModal}>
              <AntDesign name="closecircle" size={24} color="black" />
            </Pressable>
            <VerProduto produto={produto} />
          </View>
        </ScrollView>
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
