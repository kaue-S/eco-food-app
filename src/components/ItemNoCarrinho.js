import {
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
import { formataPreco } from "../functions/funcoes";
import arrayComerciante from "../api/arrayDeComerciante";

export default function ItemNoCarrinho({ produto, valor, quantidade }) {
  const [aparecerModal, setAparecerModal] = useState(false);

  const verProduto = () => {
    setAparecerModal(true);
  };
  const cancelar = () => {
    setAparecerModal(false);
    return;
  };

  const comerciante = arrayComerciante.filter((comercio) => {
    return comercio.id === produto.mercado_id;
  });

  console.log(comerciante);

  return (
    <>
      <Pressable
        style={estilosItemProduto.cardCarrinho}
        key={produto.id}
        onPress={verProduto}
      >
        <View style={estilosItemProduto.cardProduto}>
          <Image
            style={estilosItemProduto.imagemProduto}
            source={{ uri: `${produto.foto}` }}
          />
          <View style={estilosItemProduto.infosCardProduto}>
            <Text>{produto.nome}</Text>
            <Text>quantidade: {quantidade} </Text>
            <Text>total: {formataPreco(valor)} </Text>
          </View>
        </View>
      </Pressable>
      <Modal
        style={estilosItemProduto.modal}
        animationType="slide"
        visible={aparecerModal}
        transparent={true}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={estilosItemProduto.viewModal}>
            <Pressable
              onPress={cancelar}
              style={estilosItemProduto.BtnFecharModal}
            >
              <View style={estilosItemProduto.fecharModal}>
                <AntDesign name="closecircle" size={24} color="black" />
                <Text style={estilosItemProduto.tituloModal}>
                  Produto No Carrinho
                </Text>
              </View>
            </Pressable>
            <View>
              <Text style={estilosItemProduto.tituloProduto}>
                {produto.nome}
              </Text>
              <View style={estilosItemProduto.infos}>
                <Image
                  style={estilosItemProduto.imagemProduto}
                  source={{ uri: `${produto.foto}` }}
                />
                <View style={estilosItemProduto.infoProduto}>
                  <Text style={estilosItemProduto.textoValores}>
                    Valor: {formataPreco(produto.preco)}
                  </Text>
                  <Text style={estilosItemProduto.textoValores}>
                    Quantidade: {quantidade}
                  </Text>
                  <Text style={estilosItemProduto.textoValores}>
                    Total: {formataPreco(valor)}
                  </Text>
                </View>
              </View>

              <Text style={estilosItemProduto.tituloProduto}>Fornecedor</Text>

              <View style={estilosItemProduto.infos}>
                <Image
                  style={estilosItemProduto.imagemComerciante}
                  source={{ uri: `${comerciante[0].logo}` }}
                />
                <View>
                  <Text style={estilosItemProduto.textoValores}>
                    Nome: {comerciante[0].nome}
                  </Text>
                  <Text style={estilosItemProduto.textoValores}>
                    Estabelecimento: {comerciante[0].filtro}
                  </Text>
                  <Text style={estilosItemProduto.textoValores}>
                    Local: {comerciante[0].local}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
}

const estilosItemProduto = StyleSheet.create({
  imagemProduto: {
    width: 100,
    height: 100,
  },
  imagemComerciante: {
    width: 45,
    height: 45,
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
    marginVertical: 8,
    padding: 12,
    justifyContent: "space-around",
  },
  BtnFecharModal: {
    borderBottomWidth: 1,
    marginBottom: 18,
  },
  tituloModal: {
    textAlign: "center",
    fontWeight: "bold",
  },
  tituloProduto: {
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "Comfortaa",
  },
  infos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 16,
    gap: 10,
  },
  infoProduto: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    width: 250,
  },
  textoValores: {
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 4,
  },
  infosCardProduto: {},
  cardProduto: {
    flexDirection: "row",
    backgroundColor: "#F29",
    padding: 24,
    marginVertical: 12,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    gap: 12,
    alignItems: "center",
  },
});
