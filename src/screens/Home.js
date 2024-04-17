import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  TextInput,
  Vibration,
  Alert,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { auth } from "../../firebase.config";
import PerfilUsuario from "./PerfilUsuario";
import { FontAwesome } from "@expo/vector-icons";
import arrayFiltros from "../api/arrayDeFiltros";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "../api/api_firebase";
import CardComercio from "../components/CardComercio";
import bannerHome from "../../assets/images/banner_HOME.png";

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [listaDeComerciantes, setListaDeComerciantes] = useState([]);

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

        setListaDeComerciantes(comerciantes);
        setLoading(false);
      } catch (error) {
        console.error("Deu Ruim: " + error.message);
      }
    }

    buscarComerciante();
  }, []);

  const { displayName: nome } = auth.currentUser;

  const [pesquisar, setPesquisar] = useState("");
  console.log(pesquisar);

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

  const buscarPorFiltro = (nomeFiltro) => {
    if (pesquisar === nomeFiltro) {
      navigation.navigate("Resultados", { pesquisar });
    }
  };

  return (
    <View style={estilosHome.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text style={estilosHome.text}>Bem-vindo a página Home!</Text> */}
        <View style={estilosHome.barraInicial}>
          <FontAwesome name="user" size={34} color="#1E3939" />
          <Text style={estilosHome.titulo}>
            Olá,
            <Text style={{ fontWeight: "bold", color: "#1E3939" }}>{nome}</Text>
          </Text>
        </View>

        <View style={estilosHome.areaPesquisar}>
          <TextInput
            style={estilosHome.inputPesquisa}
            placeholder="Quer comprar o que hoje?"
            onSubmitEditing={buscarProduto}
            onChangeText={produtoDigitado}
            value={pesquisar}
            enterKeyHint="search"
          />

          <Pressable style={estilosHome.botaoPesquisar} onPress={buscarProduto}>
            <Text style={estilosHome.iconePesquisar}>
              <FontAwesome name="search" color="#466060" size={18} />
            </Text>
          </Pressable>
        </View>

        <View>
          <Image
            resizemode="contain"
            style={{
              width: 300,
              height: 100,
              alignSelf: "center",
              marginVertical: 16,
              borderRadius: 15,
            }}
            source={bannerHome}
          />
        </View>

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
            <Text style={estilosHome.text}>Pesquise nas categorias:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={estilosHome.menu}>
                {arrayFiltros.map((itemProduto) => {
                  return (
                    <Pressable
                      key={itemProduto.id}
                      onPressIn={() => setPesquisar(itemProduto.nome)}
                      onPress={() => buscarPorFiltro(itemProduto.nome)}
                    >
                      <View
                        style={{
                          alignItems: "center",
                          width: 100,
                          padding: 10,
                        }}
                      >
                        <Image
                          resizeMode="contain"
                          source={itemProduto.foto}
                          style={{ width: 70, height: 70 }}
                        />
                        <Text>{itemProduto.nome}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
            <Text style={estilosHome.text}>Pesquise nos comércios:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={estilosHome.menuComercio}>
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
        )}
      </ScrollView>
    </View>
  );
}

const estilosHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    // marginHorizontal: 15,
    // paddingHorizontal: 8,
  },

  barraInicial: {
    backgroundColor: "#a8cf45",
    padding: 10,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  titulo: {
    fontSize: 20,
  },

  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 230,
    width: 610,
  },
  menuComercio: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 610,
    gap: 12,
    marginHorizontal: 8,
    marginVertical: 12,
    marginLeft: 20,
    marginTop: 2,
  },
  text: {
    fontSize: 19,
    marginHorizontal: 16,
    marginVertical: 16,
    color: "#466060",
    fontFamily: "Comfortaa",
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  viewProdutos: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 18,
    padding: 30,
    flexWrap: "wrap",
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
    fontSize: 14,
    fontFamily: "Comfortaa",
    fontWeight: "500",
  },
  iconePesquisar: {
    padding: 4,
    marginRight: 18,
  },
});
