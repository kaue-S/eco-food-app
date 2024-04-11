import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemNoCarrinho from "../components/ItemNoCarrinho";
import { formataPreco, somarValores } from "../functions/funcoes";

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
              <View style={estilosCarrinho.cardDoCarrinho}>
                <ItemNoCarrinho
                  produto={itemProduto.produto}
                  valor={itemProduto.totalCompra}
                  quantidade={itemProduto.quantidadeNoCarrinho}
                  key={itemProduto.index}
                />
                <Pressable>
                  <Text> Excluir </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      )}
      <View style={estilosCarrinho.areaComprar}>
        <Text>a</Text>
        <Text>Items No Carrinho</Text>
        <Pressable style={estilosCarrinho.button}>
          <Text style={estilosCarrinho.buttonText}>Comprar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const estilosCarrinho = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    marginHorizontal: 15,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 18,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  cardDoCarrinho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  areaComprar: {
    padding: 18,
    elevation: 5,
  },
});
