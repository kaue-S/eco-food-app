import {
  ActivityIndicator,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Produto from "./Produto";
import { api } from "../api/api_firebase";

export default function VerComercio({ pgComercio }) {
  const [loading, setLoading] = useState(true);
  const [produtosDoComerciante, setProdutosDoComerciante] = useState([]);

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={estilosVerComercio.container}>
        <ImageBackground
          resizeMode="contain"
          style={estilosVerComercio.banner}
          source={{ uri: `${pgComercio.imagemUrl}` }}
        />
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
            <Text>Produtos</Text>
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
});
