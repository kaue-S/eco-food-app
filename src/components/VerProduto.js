import {
  ActivityIndicator,
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
import React, { useEffect, useState } from "react";
import arrayComerciante from "../api/arrayDeComerciante";
import { api } from "../api/api_firebase";
import { formataPreco } from "../functions/funcoes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function VerProduto({ produto }) {
  const [quantidadeNoCarrinho, setQuantidadeNoCarrinho] = useState(0);
  const [totalCompra, setTotalCompra] = useState(0);
  const [verDetalhes, setVerDetalhes] = useState(false);
  const [btnAddQtd, setBtnaddQtd] = useState(false);
  const [btntirarQtd, setBtntirarQtd] = useState(true);
  const [btnPressionado, setBtnPressionado] = useState(false);
  const [comercianteDoProduto, setComercianteDoProduto] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function buscarComerciante() {
      try {
        const respostaApi = await api.get("/comerciantes.json");

        // console.log("Data:");
        // console.log(respostaApi.data);
        const comerciantes = Object.keys(respostaApi.data).map((comercio) => {
          return {
            ...respostaApi.data[comercio],
            id: comercio,
          };
        });

        // console.log("Comerciantes: ");
        // console.log(comerciantes);

        const filtrandoComercio = comerciantes.filter(
          (comerciante) => produto.mercado_id === comerciante.id
        );

        setComercianteDoProduto(filtrandoComercio);
        setLoading(false);
      } catch (error) {
        console.error("Deu Ruim: " + error.message);
      }
    }

    buscarComerciante();
  }, []);

  console.log("Filtrado:");
  console.log(comercianteDoProduto);

  const estaPressionado = () => {
    setBtnPressionado(true);
  };

  const naoEstaPressionado = () => {
    setBtnPressionado(false);
  };

  const tirarQuantidade = () => {
    if (quantidadeNoCarrinho <= 0) {
      setTotalCompra(0);
      setBtntirarQtd(true);
      return;
    } else {
      let novaQuantidade = quantidadeNoCarrinho - 1;
      setQuantidadeNoCarrinho(novaQuantidade);
      setTotalCompra(novaQuantidade * produto.preco);
      setBtnaddQtd(false);
    }
  };
  const addQuantidade = () => {
    if (quantidadeNoCarrinho >= produto.quantidade) {
      setBtnaddQtd(true);
      return;
    } else {
      let novaQuantidade = quantidadeNoCarrinho + 1;
      setQuantidadeNoCarrinho(novaQuantidade);
      setTotalCompra(novaQuantidade * produto.preco);
      setBtntirarQtd(false);
    }
  };

  // console.log(comercianteDoProduto);

  /*   const comerciante = arrayComerciante.filter((comercio) => {
    return comercio.id === produto.mercado_id;
  });
 */
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
      Alert.alert("Parabéns", "Produto adicionado com sucesso!", [
        {
          text: "Poupei",
          style: "default",
        },
      ]);
      Vibration.vibrate(300);

      console.log(listaProdutos);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <View style={estilosAddProdutos.viewModal}>
      {loading && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 2 }}
        >
          <ActivityIndicator size="large" color="#a8cf45" />
        </View>
      )}

      {!loading && (
        <>
          <Text
            style={[
              estilosAddProdutos.subTitulo,
              estilosAddProdutos.nomeProduto,
            ]}
          >
            {produto.nome}
          </Text>
          <View
            style={[
              estilosAddProdutos.viewBotoes,
              estilosAddProdutos.areaPrecoEqtd,
            ]}
          >
            <Text style={[estilosAddProdutos.subTitulo]}>
              Preço: {formataPreco(produto.preco)}
            </Text>
            <Text
              style={[
                estilosAddProdutos.subTitulo,
                estilosAddProdutos.mostrarQtdEstoque,
              ]}
            >
              Estoque: {produto.quantidade}
            </Text>
          </View>
          <View style={estilosAddProdutos.viewBotoes}>
            <Image
              style={estilosAddProdutos.imagemProduto}
              source={{ uri: `${produto.foto}` }}
            />
            <View style={estilosAddProdutos.areaQtdETotal}>
              <View
                style={[
                  estilosAddProdutos.viewBotoes,
                  estilosAddProdutos.areaQtd,
                ]}
              >
                <Text style={estilosAddProdutos.tituloInfos}>Qtde:</Text>
                <View style={[estilosAddProdutos.viewBotoes]}>
                  <Pressable
                    onPressIn={estaPressionado}
                    onPressOut={naoEstaPressionado}
                    style={({ pressed }) => [
                      estilosAddProdutos.btnQuantidade,
                      btntirarQtd
                        ? { opacity: 0.5 }
                        : {
                            opacity: pressed ? 0.8 : 1,
                          },
                    ]}
                    onPress={tirarQuantidade}
                    disabled={btntirarQtd}
                  >
                    <Text style={estilosAddProdutos.txtQuantidade}>-</Text>
                  </Pressable>

                  <Text style={estilosAddProdutos.txtQuantidade}>
                    {quantidadeNoCarrinho}
                  </Text>

                  <Pressable
                    onPressIn={estaPressionado}
                    onPressOut={naoEstaPressionado}
                    style={({ pressed }) => [
                      estilosAddProdutos.btnQuantidade,
                      btnAddQtd
                        ? { opacity: 0.5 }
                        : {
                            opacity: pressed ? 0.8 : 1,
                          },
                    ]}
                    onPress={addQuantidade}
                    disabled={btnAddQtd}
                  >
                    <Text style={estilosAddProdutos.txtQuantidade}>+</Text>
                  </Pressable>
                </View>
              </View>
              <View style={estilosAddProdutos.viewBotoes}>
                <Text style={estilosAddProdutos.tituloInfos}>Total:</Text>
                <Text style={estilosAddProdutos.totalPreco}>
                  {formataPreco(totalCompra)}
                </Text>
              </View>
            </View>
          </View>

          <Text style={estilosAddProdutos.tituloInfos}>
            fornecedor: {comercianteDoProduto && comercianteDoProduto[0].nome}
          </Text>

          {/* Area mais detalhes */}
          {verDetalhes && (
            <Pressable
              onPressIn={estaPressionado}
              onPressOut={naoEstaPressionado}
              style={({ pressed }) => [
                estilosAddProdutos.btnInfos,
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={esconderInformascoes}
            >
              <Text style={estilosAddProdutos.txtDetalhes}>menos detalhes</Text>
            </Pressable>
          )}

          {!verDetalhes && (
            <Pressable
              onPressIn={estaPressionado}
              onPressOut={naoEstaPressionado}
              style={({ pressed }) => [
                estilosAddProdutos.btnInfos,
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
              onPress={verInformascoes}
            >
              <Text style={estilosAddProdutos.txtDetalhes}>mais detalhes</Text>
            </Pressable>
          )}

          {verDetalhes && (
            <View style={estilosAddProdutos.maisDetalhes}>
              <ScrollView>
                <Text style={estilosAddProdutos.textoDescricao}>
                  Contém: {produto.descricao}
                </Text>
              </ScrollView>
            </View>
          )}
          {/*fim da Area mais detalhes */}

          <View>
            <Pressable
              onPress={adicionarAoCarrinho}
              onPressIn={estaPressionado}
              onPressOut={naoEstaPressionado}
              style={({ pressed }) => [
                estilosAddProdutos.btnAddCarrinho,
                {
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <Text style={estilosAddProdutos.txtAddCarrino}>
                adicionar na cesta
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const estilosAddProdutos = StyleSheet.create({
  imagemProduto: {
    width: 120,
    height: 120,
    borderRadius: 15,
  },
  btnAddCarrinho: {
    backgroundColor: "#ECA457",
    padding: 18,
    margin: 12,
    marginVertical: 32,
    borderRadius: 10,
  },
  txtAddCarrino: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Comfortaa",
    fontWeight: "400",
    color: "#466060",
  },
  btnInfos: {
    backgroundColor: "#466060",
    padding: 18,
    margin: 16,
    borderRadius: 10,
  },
  txtDetalhes: {
    color: "#A8C458",
    fontFamily: "Barlow",
    fontWeight: "500",
    textAlign: "center",
  },
  btnQuantidade: {
    backgroundColor: "#A8C458",
    padding: 16,
    margin: 12,
    borderRadius: 20,
  },
  txtQuantidade: {
    color: "#466060",
    fontFamily: "Barlow",
    fontSize: 18,
    fontWeight: "bold",
  },
  viewModal: {
    justifyContent: "center",
    backgroundColor: "#f7f7f7",
  },
  modal: {
    flex: 1,
  },
  viewBotoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 2.5,
  },
  fecharModal: {
    margin: 12,
    padding: 12,
  },
  maisDetalhes: {
    flex: 1,
    marginVertical: 8,
  },
  tituloInfos: {
    fontFamily: "Comfortaa",
    fontSize: 16,
    fontWeight: "bold",
    color: "#466060",
    marginVertical: 8,
  },
  subTitulo: {
    fontFamily: "Comfortaa",
    fontSize: 18,
    fontWeight: "bold",
    color: "#466060",
    marginVertical: 4,
  },
  totalPreco: {
    backgroundColor: "#a8c458",
    padding: 10,
    fontFamily: "Comfortaa",
    fontSize: 24,
    fontWeight: "bold",
    color: "#466060",
    marginVertical: 4,
    borderRadius: 15,
  },

  nomeProduto: {
    margin: 8,
    backgroundColor: "#A8C458",
    padding: 20,
    borderRadius: 15,
    textAlign: "center",
  },
  areaPrecoEqtd: {
    marginVertical: 18,
    justifyContent: "space-between",

    borderWidth: 4,
    padding: 15,
    borderColor: "#ECA457",
    borderRadius: 15,
  },
  mostrarQtdEstoque: {
    color: "#a8c458",
  },
  textoDescricao: {
    fontFamily: "Barlow",
    fontSize: 16,
  },
  areaQtdETotal: {
    alignItems: "center",
  },
});
