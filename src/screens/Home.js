import React, { useEffect, useState } from "react";
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
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import arrayFiltros from "../api/arrayDeFiltros";

export default function Home({ navigation }) {
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
        <Text style={estilosHome.text}>Bem-vindo à página Home!</Text>

        <View style={estilosHome.areaPesquisar}>
          <TextInput
            style={estilosHome.inputPesquisa}
            placeholder="Pesquisar"
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={estilosHome.text}>Buscar por:</Text>
            <View style={estilosHome.viewProdutos}>
              {arrayFiltros.map((itemProduto) => {
                return (
                  <Pressable
                    key={itemProduto.id}
                    onPressIn={() => setPesquisar(itemProduto.nome)}
                    onPress={() => buscarPorFiltro(itemProduto.nome)}
                  >
                    <View style={{ alignItems: "center", padding: 4 }}>
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
        </View>
        {/* <View>
          <Text style={estilosHome.text}>Destaques</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilosHome.viewProdutos}
          >
            {arrayProdutos
              .filter((itemProduto) => {
                return itemProduto.destaque == "sim";
              })
              .map((itemProduto) => {
                return <Produto key={itemProduto.id} produto={itemProduto} />;
              })}
          </ScrollView>
        </View> */}
        {/* <Pressable
          style={estilosHome.button}
          onPress={() => navigation.navigate("Carrinho")}
        >
          <Text style={estilosHome.buttonText}>Carrinho</Text>
        </Pressable> */}
      </ScrollView>
    </View>
  );
}

const estilosHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    marginTop: 10,
    marginHorizontal: 15,
    padding: 12,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
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
});
