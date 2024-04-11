import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemNoCarrinho from "../components/ItemNoCarrinho";

export default function Carrinho({ navigation }) {
  /* Criando lista de produtos no carrinho para poder 
  obter os dados vindos do async storage */

  const [listaProdutosNoCarrinho, setListaProdutosNoCarrinho] = useState([]);

  /* Quando o usuário entrar nesta tela o useEffect() será acionado
  apenas uma vez */
  useEffect(() => {
    async function produtos_no_carrinho() {
      try {
        const dados = await AsyncStorage.getItem("@listacarrinho");

        if (dados) {
          setListaProdutosNoCarrinho(JSON.parse(dados));
          console.log(dados);
        }
      } catch (error) {
        console.log("Erro ao carregar os dados:  " + error);
        Alert.alert(
          "Erro",
          "Erro ao carregar os dados tente novamente mais tarde"
        );
      }
    }

    produtos_no_carrinho();
  }, []);

  return (
    <View style={estilosCarrinho.container}>
      <Text style={estilosCarrinho.text}>Carrinho</Text>

      {listaProdutosNoCarrinho && (
        <ScrollView>
          {listaProdutosNoCarrinho.map((itemProduto) => {
            return (
              <ItemNoCarrinho
                produto={itemProduto.produto}
                valor={itemProduto.totalCompra}
                quantidade={itemProduto.quantidadeNoCarrinho}
                key={itemProduto.index}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}

const estilosCarrinho = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
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
});
