import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Vibration,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemNoCarrinho from "../components/ItemNoCarrinho";
import { formataPreco } from "../functions/funcoes";
import { FontAwesome6 } from "@expo/vector-icons";
import { set } from "firebase/database";

export default function Carrinho({ navigation }) {
  /* Criando lista de produtos no carrinho para poder 
  obter os dados vindos do async storage */

  const [listaProdutosNoCarrinho, setListaProdutosNoCarrinho] = useState([]);
  const [totalNoCarrinho, setTotalNoCarrinho] = useState(0);

  /* Quando o usuário entrar nesta tela o useEffect() será acionado
  apenas uma vez */
  useEffect(() => {
    async function produtos_no_carrinho() {
      try {
        const dados = await AsyncStorage.getItem("@listacarrinho");

        if (dados) {
          setListaProdutosNoCarrinho(JSON.parse(dados));
          // console.log(dados);
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

  useEffect(() => {
    async function calculartoltal() {
      try {
        const soma = listaProdutosNoCarrinho.reduce(
          (acumalador, itemProduto) => acumalador + itemProduto.totalCompra,
          0
        );
        setTotalNoCarrinho(soma);
      } catch (error) {
        console.log("Erro ao carregar a soma do total:  " + error);
        Alert.alert(
          "Erro",
          "Erro ao carregar os dados tente novamente mais tarde"
        );
      }
    }

    calculartoltal();
  }, [listaProdutosNoCarrinho]);

  const excluirProduto = async (produtoIndex) => {
    Alert.alert("Excluir", "Tem certeza que deseja excluir esse prodtudo", [
      { text: "cancelar", style: "cancel" },
      {
        text: "excluir produto",
        onPress: async () => {
          try {
            const novaListaDeProdutos = listaProdutosNoCarrinho.filter(
              (produto) =>
                listaProdutosNoCarrinho.indexOf(produto) !== produtoIndex
            );

            /* logs de verificação dos dados 
       console.log(produtoIndex);
      console.log(novaListaDeProdutos); */

            await AsyncStorage.setItem(
              "@listacarrinho",
              JSON.stringify(novaListaDeProdutos)
            );

            setListaProdutosNoCarrinho(novaListaDeProdutos);
          } catch (error) {
            console.log("Erro ao Excluir: ", error);
          }
        },
      },
    ]);

    Vibration.vibrate(300);
  };

  const comprarProdutos = async () => {
    Alert.alert("Finalizar Compra", "Uhul você está salvando o mundo ", [
      { text: "cancelar", style: "cancel" },
      {
        text: "comprar",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("@listacarrinho");

          setListaProdutosNoCarrinho([]);
          Vibration.vibrate(300);
          Alert.alert("Eco legado", "Uhul agora você é um combatente");
        },
      },
    ]);
    Vibration.vibrate(300);
  };

  return (
    <View style={estilosCarrinho.container}>
      <Text style={estilosCarrinho.text}>Carrinho</Text>

      {listaProdutosNoCarrinho && (
        <ScrollView>
          {listaProdutosNoCarrinho.map((itemProduto) => {
            return (
              <View
                key={listaProdutosNoCarrinho.indexOf(itemProduto)}
                style={estilosCarrinho.cardDoCarrinho}
              >
                <ItemNoCarrinho
                  produto={itemProduto.produto}
                  valor={itemProduto.totalCompra}
                  quantidade={itemProduto.quantidadeNoCarrinho}
                />
                <Pressable
                  onPress={() =>
                    excluirProduto(listaProdutosNoCarrinho.indexOf(itemProduto))
                  }
                  style={estilosCarrinho.btnExcluir}
                >
                  <Text>
                    <FontAwesome6 name="trash" size={16} color="#f7f7f7" />
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </ScrollView>
      )}
      <View style={estilosCarrinho.areaComprar}>
        <Text>Quantidade: {listaProdutosNoCarrinho.length} </Text>
        <Text>Total: {formataPreco(totalNoCarrinho)}</Text>
        <Pressable onPress={comprarProdutos} style={estilosCarrinho.button}>
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
    marginHorizontal: 12,
  },
  areaComprar: {
    padding: 18,
    elevation: 5,
  },
  btnExcluir: {
    backgroundColor: "red",
    padding: 16,
    borderRadius: 50,
  },
});
