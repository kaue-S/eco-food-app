import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { formataPreco } from "../functions/funcoes";
import arrayComerciante from "../api/arrayDeComerciante";
import { api } from "../api/api_firebase";
import { useFocusEffect } from "@react-navigation/native";

export default function LerProdutoNoCarrinho({ produto, valor, quantidade }) {
  const [comercianteDoProduto, setComercianteDoProduto] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   async function buscarComerciante() {
  //     try {
  //       const respostaApi = await api.get("/comerciantes.json");

  //       // console.log("Data:");
  //       // console.log(respostaApi.data);
  //       const comerciantes = Object.keys(respostaApi.data).map((comercio) => {
  //         return {
  //           ...respostaApi.data[comercio],
  //           id: comercio,
  //         };
  //       });

  //       // console.log("Comerciantes: ");
  //       // console.log(comerciantes);

  //       const filtrandoComercio = comerciantes.filter(
  //         (comerciante) => produto.mercado_id === comerciante.id
  //       );

  //       setComercianteDoProduto(filtrandoComercio);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Deu Ruim: " + error.message);
  //     }
  //   }

  //   buscarComerciante();
  // }, [produto]);

  const carregandoComerciantes = useCallback(async () => {
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

      console.log("Comerciantes: ");
      console.log(comerciantes);
      const filtrandoComercio = comerciantes.filter(
        (comerciante) => produto.mercado_id === comerciante.id
      );

      setComercianteDoProduto(filtrandoComercio);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao carregar os dados:  " + error);
      Alert.alert(
        "Erro",
        "Erro ao carregar os dados tente novamente mais tarde"
      );
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregandoComerciantes();
    }, [carregandoComerciantes])
  );

  return (
    <>
      {loading && (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 2,
          }}
        >
          <Text>
            <ActivityIndicator size="large" color="#a8cf45" />
          </Text>
        </View>
      )}

      {!loading && (
        <>
          <View>
            <View style={estilosItemProduto.areaProduto}>
              <Text
                style={[
                  estilosItemProduto.subTitulo,
                  estilosItemProduto.nomeProduto,
                ]}
              >
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
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={estilosItemProduto.textoCard}>Total:</Text>

                  <Text
                    style={[
                      estilosItemProduto.textoCard,
                      estilosItemProduto.txtCardDestaque,
                    ]}
                  >
                    {formataPreco(valor)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={estilosItemProduto.fornecedor}>
              <Text style={estilosItemProduto.tituloProduto}>Fornecedor</Text>

              <View style={estilosItemProduto.infos}>
                <Image
                  resizeMode="contain"
                  style={estilosItemProduto.imagemComerciante}
                  source={{
                    uri: `${comercianteDoProduto[0].icone}`,
                  }}
                />
                <View>
                  <Text style={estilosItemProduto.textoValores}>
                    Nome: {comercianteDoProduto[0].nome}
                  </Text>
                  <Text style={estilosItemProduto.textoValores}>
                    Estabelecimento: {comercianteDoProduto[0].filtro}
                  </Text>
                  <Text style={estilosItemProduto.textoValores}>
                    Local: {comercianteDoProduto[0].local}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
}

const estilosItemProduto = StyleSheet.create({
  imagemProduto: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  imagemComerciante: {
    width: 100,
    height: 100,
  },
  botaoCancelar: {
    backgroundColor: "red",
    padding: 18,
    margin: 12,
  },
  viewModal: {
    backgroundColor: "#f7f7f7",
    padding: 20,
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
    fontFamily: "Comfortaa",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 24,
    color: "#466060",
  },
  tituloProduto: {
    fontWeight: "600",
    fontSize: 24,
    fontFamily: "Comfortaa",
    textAlign: "center",
    color: "#EF7E06",
  },
  infos: {
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
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 4,
  },
  infosCardProduto: {
    padding: 8,
  },
  cardProduto: {
    flexDirection: "row",
    padding: 24,
    marginBottom: 12,
    justifyContent: "space-evenly",
    gap: 12,
    alignItems: "center",
  },
  tituloCard: {
    fontWeight: "600",
    fontFamily: "Comfortaa",
    fontSize: 18,
    color: "#A8C458",
    textAlign: "center",
    borderWidth: 4,
    padding: 4,
    borderRadius: 15,
    borderColor: "#A8C458",
  },
  cardCarrinho: {
    marginVertical: 12,
    padding: 4,
  },
  textoCard: {
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "400",
    marginVertical: 4,
  },
  txtCardDestaque: {
    fontSize: 20,
    backgroundColor: "#A8C458",
    padding: 8,
    borderRadius: 15,
    fontWeight: "600",
  },
  subTitulo: {
    fontFamily: "Comfortaa",
    fontSize: 18,
    fontWeight: "bold",
    color: "#466060",
    marginVertical: 4,
  },
  nomeProduto: {
    margin: 8,
    backgroundColor: "#A8C458",
    padding: 20,
    borderRadius: 15,
    textAlign: "center",
  },
  fornecedor: {
    borderWidth: 4,
    padding: 8,
    borderRadius: 15,
    borderColor: "#EF7E06",
    marginVertical: 8,
  },
  areaProduto: {
    padding: 8,
    borderWidth: 4,
    borderColor: "#7FA324",
    borderRadius: 15,
  },
});
