import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Produto from "./Produto";
import { api } from "../api/api_firebase";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function VerComercio({ pgComercio }) {
  const [loading, setLoading] = useState(true);
  const [produtosDoComerciante, setProdutosDoComerciante] = useState([]);
  const [favoritado, setFavoritado] = useState(false);

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

        const verificaProdutos = listaDeProdutos.filter(
          (produto) => produto.mercado_id === pgComercio.id
        );
        const ListaDeFavorito = await AsyncStorage.getItem("@listafavoritos");
        console.log(ListaDeFavorito);

        const listaDeFav = ListaDeFavorito ? JSON.parse(ListaDeFavorito) : [];

        const jaFavoritou = listaDeFav.some((comercioNaLista) => {
          return comercioNaLista.id === pgComercio.id;
        });

        if (jaFavoritou) {
          setFavoritado(true);
        }

        setProdutosDoComerciante(verificaProdutos);
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
  }, []);

  const favoritarMercado = async () => {
    try {
      const ListaDeFavorito = await AsyncStorage.getItem("@listafavoritos");
      console.log(ListaDeFavorito);

      const listaDeFav = ListaDeFavorito ? JSON.parse(ListaDeFavorito) : [];

      const jaFavoritou = listaDeFav.some((comercioNaLista) => {
        return comercioNaLista.id === pgComercio.id;
      });

      if (jaFavoritou) {
        Alert.alert("Opa", "Parece que você ja favoritou esse comércio");
        Vibration.vibrate(300);
        setFavoritado(true);
        return;
      }

      listaDeFav.push(pgComercio);

      await AsyncStorage.setItem("@listafavoritos", JSON.stringify(listaDeFav));

      Alert.alert("Parabéns", "Comerciante Favoritado com sucesso", [
        {
          text: "Amei",
          style: "default",
        },
      ]);
      Vibration.vibrate(300);
      setFavoritado(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={estilosVerComercio.container}>
        <ImageBackground
          resizeMode="contain"
          style={estilosVerComercio.banner}
          source={{ uri: `${pgComercio.imagemUrl}` }}
        >
          <View style={estilosVerComercio.areaFavoritar}>
            <Pressable
              style={[
                estilosVerComercio.btnFavoritar,
                {
                  borderColor: !favoritado ? "#f7f7f7" : "#A8Cf45",
                  backgroundColor: favoritado && "#A8Cf45",
                },
              ]}
              onPress={favoritarMercado}
            >
              <View style={[estilosVerComercio.areaBtnFavoritar]}>
                <Entypo
                  name="heart"
                  size={24}
                  color={!favoritado ? "#f7f7f7" : "#EF7E06"}
                />
              </View>
            </Pressable>
          </View>
        </ImageBackground>

        <View style={estilosVerComercio.containerRow}>
          <Image
            style={estilosVerComercio.icone}
            source={{ uri: `${pgComercio.icone}` }}
          />
          <View style={estilosVerComercio.nomeElocal}>
            <Text style={estilosVerComercio.nomeDoLocal}>
              {pgComercio.nome}
            </Text>
            <Text style={estilosVerComercio.tipo}>
              {pgComercio.tipoComercio}
            </Text>
            <Text style={estilosVerComercio.local}>{pgComercio.endereco}</Text>
          </View>
        </View>

        {loading && <ActivityIndicator size="large" color="#466060" />}

        {!loading && (
          <>
            <Text style={estilosVerComercio.tituloAreaProdutos}>Produtos</Text>
            <View
              style={[
                estilosVerComercio.containerProdutos,
                produtosDoComerciante.length >= 1 && {
                  justifyContent: "center",
                },
              ]}
            >
              {produtosDoComerciante.length >= 1 ? (
                <>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {produtosDoComerciante.map((itemProduto) => {
                      return (
                        <Produto key={itemProduto.id} produto={itemProduto} />
                      );
                    })}
                  </ScrollView>
                </>
              ) : (
                <Text style={{ textAlign: "center" }}>
                  Esse Comerciante ainda não Cadstrou nenhum produto
                </Text>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const estilosVerComercio = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 115,
    flex: 0.8,
    marginBottom: 8,
  },
  icone: {
    width: 80,
    height: 80,
    backgroundColor: "#a8cf45",
    borderRadius: 50,
  },
  containerRow: {
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 8,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 8,
  },
  containerProdutos: {
    flexDirection: "row",
    marginVertical: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tituloAreaProdutos: {
    fontSize: 24,
    fontFamily: "Comfortaa",
    fontWeight: "500",
    marginHorizontal: 15,
    color: "#466060",
  },
  nomeDoLocal: {
    fontSize: 18,
    fontFamily: "Comfortaa",
    fontWeight: "600",
    color: "#7FA324",
  },
  local: {
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "400",
  },
  tipo: {
    color: "#EF7E06",
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "400",
  },
  areaFavoritar: {
    justifyContent: "center",
    alignItems: "flex-end",
    margin: 15,
  },
  btnFavoritar: {
    padding: 8,
    borderWidth: 3,
    borderRadius: 15,
    borderColor: "#466060",
  },
  areaBtnFavoritar: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  textoBtn: {
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "400",
  },
});
