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
  FlatList,
} from "react-native";

import { auth } from "../../firebase.config";
import PerfilUsuario from "./PerfilUsuario";
import { FontAwesome } from "@expo/vector-icons";
import arrayFiltros from "../api/arrayDeFiltros";
import { Database, getDatabase, ref, set } from "firebase/database";

export default function Home({ navigation }) {
  const { displayName: nomeUsuario } = auth.currentUser;

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
        {/* <Text style={estilosHome.text}>Bem-vindo à página Home!</Text> */}
        <View style={estilosHome.barraInicial}>
          <FontAwesome name="user" size={34} color="#1E3939" />
          <Text style={estilosHome.titulo}>
            {" "}
            Olá,{" "}
            <Text style={{ fontWeight: "bold", color: "#1E3939" }}>
              {" "}
              {nomeUsuario}
            </Text>
          </Text>
        </View>

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
          <Image
            style={estilosHome.banner}
            source={require("../../assets/images/banner_HOME.png")}
          />
        </View>

        <Text style={estilosHome.text}>Buscar por:</Text>
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
                    style={{ alignItems: "center", width: 100, padding: 10 }}
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

        <View>
          <Text style={estilosHome.text}>Destaques: </Text>
          <Text></Text>
        </View>
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

  banner: {
    marginLeft: 50,
    marginVertical: 20,
    borderRadius: 10,
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
  text: {
    fontSize: 20,
    marginHorizontal: 16,
    marginVertical: 16,
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
    borderRadius: 30,
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
});
