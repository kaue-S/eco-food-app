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
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import arrayProdutos from "../api/arrayDeProdutos";
import Produto from "../components/Produto";
import { FontAwesome } from "@expo/vector-icons";
import { api } from "../api/api_firebase";
import CardComercio from "../components/CardComercio";

export default function Resultados({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [nomeDaBusca, setNomedaBusca] = useState("");
  const [filtroPesquisa, setFiltroPesquisa] = useState([]);
  const [pesquisar, setPesquisar] = useState("");
  const [listaDeComerciantes, setListaDeComerciantes] = useState([]);

  if (route.params) {
    const { pesquisar: letraPesquisada } = route.params;
    console.log(letraPesquisada);
    useEffect(() => {
      async function buscarProduto() {
        try {
          const produtosApi = await api.get("/produtos.json");

          //console.log("****************************");
          //console.log(listaDeProdutos.data);

          const listaDeProdutos = Object.keys(produtosApi.data).map(
            (produtoNaLista) => {
              return {
                ...produtosApi.data[produtoNaLista],

                id: produtoNaLista,
              };
            }
          );

          const filtro = listaDeProdutos.filter(
            (produto) =>
              produto.categoria
                .toLowerCase()
                .includes(letraPesquisada.toLowerCase()) ||
              produto.nome.toLowerCase().includes(letraPesquisada.toLowerCase())
          );
          //console.log(filtro);

          setResultados(filtro.length <= 0 ? listaDeProdutos : filtro);
          setFiltroPesquisa(filtro);
          setNomedaBusca(letraPesquisada);
          setLoading(false);
        } catch (error) {
          confirm.error(error);
          Alert.alert(
            "Erro ao Pesquisar",
            "Parece que não conseguimos carregar os dados"
          );
        }
      }

      buscarProduto();
    }, [route.params]);
    //console.log(resultados);
    const carregandoComerciantes = useCallback(async () => {
      setLoading(true);
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

        const comerciantesFiltrados = comerciantes.filter(
          (comercio) =>
            comercio.filtro
              .toLowerCase()
              .includes(letraPesquisada.toLowerCase()) ||
            comercio.nome
              .toLowerCase()
              .includes(letraPesquisada.toLowerCase()) ||
            comercio.tipoComercio
              .toLowerCase()
              .includes(letraPesquisada.toLowerCase())
        );

        setListaDeComerciantes(
          comerciantesFiltrados.length <= 0
            ? comerciantes
            : comerciantesFiltrados
        );
      } catch (error) {
        console.log("Erro ao carregar os dados:  " + error);
        Alert.alert(
          "Erro",
          "Erro ao carregar os dados tente novamente mais tarde"
        );
      }
    }, [resultados]);

    useFocusEffect(
      useCallback(() => {
        carregandoComerciantes();
      }, [carregandoComerciantes])
    );

    console.log(listaDeComerciantes);
  } else {
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

        setListaDeComerciantes(comerciantes);
        setResultados([]);
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
        setLoading(false);
      }, [carregandoComerciantes])
    );
  }

  const produtoDigitado = (produto) => {
    setPesquisar(produto);
  };

  const buscarProduto = () => {
    if (!pesquisar) {
      Vibration.vibrate(300);
      Alert.alert("Opa", "você precisa digitar o produto primeiro!!!");
      return;
    }
    Vibration.vibrate(300);
    navigation.navigate("Resultados", { pesquisar });
  };

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={estilosPesquisar.container}>
          <Text style={estilosPesquisar.titulo}>Pesquisar</Text>
          <View style={estilosPesquisar.areaPesquisar}>
            <TextInput
              style={estilosPesquisar.inputPesquisa}
              placeholder="Pesquisar"
              onSubmitEditing={buscarProduto}
              onChangeText={produtoDigitado}
              value={pesquisar}
              enterKeyHint="search"
            />

            <Pressable
              style={estilosPesquisar.botaoPesquisar}
              onPress={buscarProduto}
            >
              <Text style={estilosPesquisar.iconePesquisar}>
                <FontAwesome name="search" color="#466060" size={18} />
              </Text>
            </Pressable>
          </View>
          {loading && <ActivityIndicator size="large" color="#466060" />}
          {!loading && (
            <>
              {route.params ? (
                <>
                  {filtroPesquisa.length >= 1 ? (
                    <Text style={estilosPesquisar.titulo}>
                      Pesquisando por: {nomeDaBusca}
                    </Text>
                  ) : (
                    <>
                      <Text
                        style={[estilosPesquisar.titulo, { marginVertical: 8 }]}
                      >
                        Não achamos resultado para:{" "}
                        <Text
                          style={{
                            marginHorizontal: 8,
                            color: "#7FA324",
                            fontWeight: "bold",
                          }}
                        >
                          {nomeDaBusca}
                        </Text>
                      </Text>
                      <Text style={estilosPesquisar.titulo}>
                        Aqui algumas sugestões
                      </Text>
                    </>
                  )}

                  <ScrollView
                    horizontal={resultados.length >= 2 ? true : false}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={estilosPesquisar.viewProdutos}
                  >
                    {resultados.length >= 1 ? (
                      <>
                        {resultados.map((itemProduto) => {
                          return (
                            <Produto
                              key={itemProduto.id}
                              produto={itemProduto}
                            />
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <Text style={estilosPesquisar.titulo}>
                          Produtos não encontrados
                        </Text>
                      </>
                    )}
                  </ScrollView>
                  <Text
                    style={[estilosPesquisar.titulo, { marginVertical: 8 }]}
                  >
                    Comércios:
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={estilosPesquisar.menu}>
                      {listaDeComerciantes.map((itemComercio) => {
                        return (
                          <CardComercio
                            key={itemComercio.id}
                            comerciante={itemComercio}
                          />
                        );
                      })}
                    </View>
                  </ScrollView>
                </>
              ) : (
                <View style={{ alignSelf: "center", justifyContent: "center" }}>
                  <Text style={estilosPesquisar.titulo}>
                    Comércios Parceiros:
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={estilosPesquisar.menu}>
                      {listaDeComerciantes.map((itemComercio) => {
                        return (
                          <CardComercio
                            key={itemComercio.id}
                            comerciante={itemComercio}
                          />
                        );
                      })}
                    </View>
                  </ScrollView>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const estilosPesquisar = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    padding: 12,
    width: "100%",
  },
  viewProdutos: {
    justifyContent: "space-around",
    gap: 5,
    marginBottom: 18,
    marginHorizontal: 15,
  },
  areaPesquisar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 20,
    borderColor: "#ECA457",
    marginHorizontal: 16,
  },
  inputPesquisa: {
    padding: 8,
    width: "85%",
    marginRight: 8,
    fontSize: 18,
    fontFamily: "Comfortaa",
    fontWeight: "500",
  },
  iconePesquisar: {
    padding: 4,
    marginRight: 18,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "Comfortaa",
    color: "#466060",
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 610,
    gap: 8,
    marginHorizontal: 8,
    marginVertical: 12,
  },
});
