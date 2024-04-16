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

export default function Resultados({ route, navigation }) {
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [nomeDaBusca, setNomedaBusca] = useState("");
  const [pesquisar, setPesquisar] = useState("");
  const [listaDeComerciantes, setListaDeComerciantes] = useState([]);

  if (route.params) {
    const { pesquisar: letraPesquisada } = route.params;
    console.log(letraPesquisada);
    useEffect(() => {
      async function buscarProduto() {
        try {
          const filtro = arrayProdutos.filter(
            (produto) =>
              produto.categoria
                .toLowerCase()
                .includes(letraPesquisada.toLowerCase()) ||
              produto.nome.toLowerCase().includes(letraPesquisada.toLowerCase())
          );
          console.log(filtro);

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

          setListaDeComerciantes(comerciantes);
          setResultados(filtro);
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
    }, [letraPesquisada]);

    console.log(listaDeComerciantes);
  } else {
    useEffect(() => {
      async function buscarProduto() {
        console.log("vazio");
      }

      buscarProduto();
    }, []);

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
    <View style={estilosPesquisar.container}>
      <ScrollView>
        <View>
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
              onPress={() => {}}
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
                  <Text style={estilosPesquisar.titulo}>
                    Pesquisando Por: {nomeDaBusca}
                  </Text>
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
                  <Text style={estilosPesquisar.titulo}>Alguns Comercios</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={estilosPesquisar.menu}>
                      {listaDeComerciantes.map((itemComercio) => {
                        return (
                          <Pressable
                            key={itemComercio.id}
                            style={{ width: 100, height: 100, margin: 12 }}
                          >
                            <Image
                              resizeMode="contain"
                              source={{ uri: `${itemComercio.icone}` }}
                              style={{
                                width: 50,
                                height: 50,
                                backgroundColor: "#a8cf45",
                                borderRadius: 15,
                              }}
                            />
                            <Text>{itemComercio.nome}</Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </ScrollView>
                </>
              ) : (
                <>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={estilosPesquisar.menu}>
                      {listaDeComerciantes.map((itemComercio) => {
                        return (
                          <Pressable
                            key={itemComercio.id}
                            style={{ width: 100, height: 100, margin: 12 }}
                          >
                            <Image
                              resizeMode="contain"
                              source={{ uri: `${itemComercio.icone}` }}
                              style={{
                                width: 50,
                                height: 50,
                                backgroundColor: "#a8cf45",
                                borderRadius: 15,
                              }}
                            />
                            <Text>{itemComercio.nome}</Text>
                          </Pressable>
                        );
                      })}
                    </View>
                  </ScrollView>
                </>
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
    marginHorizontal: 15,
    padding: 12,
  },
  viewProdutos: {
    justifyContent: "space-around",
    gap: 5,
    marginBottom: 18,
  },
  areaPesquisar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 4,
    padding: 12,
    borderRadius: 30,
    borderColor: "#ECA457",
    marginVertical: 8,
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
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 230,
    width: 610,
  },
});
