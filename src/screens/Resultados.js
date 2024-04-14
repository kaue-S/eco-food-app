import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import arrayProdutos from "../api/arrayDeProdutos";
import Produto from "../components/Produto";
import { FontAwesome } from "@expo/vector-icons";

export default function Resultados({ route }) {
  const [loading, setLoading] = useState(true);
  const [resultados, setResultados] = useState([]);
  const [nomeDaBusca, setNomedaBusca] = useState("");
  if (route.params) {
    const { pesquisar } = route.params;
    console.log(pesquisar);
    useEffect(() => {
      async function buscarProduto() {
        try {
          const filtro = arrayProdutos.filter((produto) =>
            produto.nome.toLowerCase().includes(pesquisar.toLowerCase())
          );
          console.log(filtro);
          setResultados(filtro);
          setNomedaBusca(pesquisar);
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
    }, [pesquisar]);
  } else {
    console.log("vazio");
    useEffect(() => {
      async function buscarProduto() {
        setResultados([]);
        setLoading(false);
      }

      buscarProduto();
    }, []);
  }

  return (
    <View style={estilosPesquisar.container}>
      <ScrollView>
        <View>
          <Text style={estilosPesquisar.titulo}>Pesquisar</Text>
          <View style={estilosPesquisar.areaPesquisar}>
            <TextInput
              placeholder="Pesquisar"
              onSubmitEditing={() => {}}
              onChangeText={() => {}}
              enterKeyHint="search"
            />

            <Pressable
              style={estilosPesquisar.botaoPesquisar}
              onPress={() => {}}
            >
              <FontAwesome name="search" color="#a8c458" size={24} />
            </Pressable>
          </View>
          {loading && <ActivityIndicator size="large" color="#a471f9" />}
          {!loading && (
            <>
              {route.params ? (
                <>
                  <Text style={estilosPesquisar.titulo}>
                    Pesquisando Por: {nomeDaBusca}
                  </Text>
                  <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={estilosPesquisar.viewProdutos}
                  >
                    {resultados.map((itemProduto) => {
                      return (
                        <Produto key={itemProduto.id} produto={itemProduto} />
                      );
                    })}
                  </ScrollView>
                </>
              ) : (
                <Text>Vazio</Text>
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
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 18,
    padding: 30,
  },
  areaPesquisar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 4,
    padding: 16,
    borderRadius: 30,
    borderColor: "#a8c458",
    marginVertical: 8,
  },
  titulo: {
    fontSize: 20,
    marginBottom: 20,
  },
});
