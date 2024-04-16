import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Vibration,
  ActivityIndicator,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import ItemNoCarrinho from "../components/ItemNoCarrinho";
import { formataPreco } from "../functions/funcoes";
import { FontAwesome6, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import Produto from "../components/Produto";
import sacola from "../../assets/images/sacolaKraft.png";

export default function Carrinho({ navigation }) {
  /* Criando lista de produtos no carrinho para poder 
  obter os dados vindos do async storage */

  const [listaProdutosNoCarrinho, setListaProdutosNoCarrinho] = useState([]);
  const [totalNoCarrinho, setTotalNoCarrinho] = useState(0);
  const [loading, setLoading] = useState(true);
  const [verModal, setVerModal] = useState(false);

  /* Função produtos_no_carrinho para fazer um fetch no AsynStorage */
  const produtos_no_carrinho = useCallback(async () => {
    try {
      const dados = await AsyncStorage.getItem("@listacarrinho");

      if (dados) {
        setListaProdutosNoCarrinho(JSON.parse(dados));
        setLoading(false);
        // console.log(dados);
        return;
      }

      setLoading(false);
    } catch (error) {
      console.log("Erro ao carregar os dados:  " + error);
      Alert.alert(
        "Erro",
        "Erro ao carregar os dados tente novamente mais tarde"
      );
    }
  }, []);

  /* Usando o useFocusEffect para sempre que usuário entrar
  nesta tela acionar a função produto_no_carrinho */
  useFocusEffect(
    useCallback(() => {
      produtos_no_carrinho();
    }, [produtos_no_carrinho])
  );

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
    Alert.alert("Excluir", "Tem certeza que deseja excluir esse produto?", [
      { text: "cancelar", style: "cancel" },
      {
        text: "Sim, excluir!",
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
    Alert.alert(
      "Finalizar Compra",
      "Você vai impedir que este alimento vá para o lixo!",
      [
        { text: "cancelar", style: "cancel" },
        {
          text: "comprar",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("@listacarrinho");

            setListaProdutosNoCarrinho([]);
            Vibration.vibrate(300);
            Alert.alert(
              "EcoFood Legado",
              "Nosso muito obrigado por você ajudar a combater o desperdício."
            );
          },
        },
      ]
    );
    Vibration.vibrate(300);
  };

  return (
    <View style={estilosCarrinho.container}>
      {loading && <ActivityIndicator size="large" color="#466060" />}

      {!loading && (
        <>
          <Text
            style={[
              estilosCarrinho.text,
              listaProdutosNoCarrinho.length <= 0 && estilosCarrinho.titulo,
            ]}
          >
            Cesta
            {listaProdutosNoCarrinho.length >= 1 && (
              <FontAwesome name="shopping-basket" color="#466060" size={24} />
            )}
          </Text>
          {listaProdutosNoCarrinho.length <= 0 && (
            <>
              <Text style={[estilosCarrinho.text, estilosCarrinho.titulo]}>
                está vazia
              </Text>
              <Image
                style={{ width: 200, height: 300, alignSelf: "center" }}
                source={sacola}
              />
              <Pressable
                onPress={() => navigation.navigate("Home")}
                style={[estilosCarrinho.button, { borderRadius: 15 }]}
              >
                <Text
                  style={[estilosCarrinho.buttonText, estilosCarrinho.titulo]}
                >
                  Ir poupar
                </Text>
              </Pressable>
            </>
          )}
          {listaProdutosNoCarrinho.length >= 1 && (
            <>
              {listaProdutosNoCarrinho && (
                <ScrollView showsVerticalScrollIndicator={false}>
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
                            excluirProduto(
                              listaProdutosNoCarrinho.indexOf(itemProduto)
                            )
                          }
                          style={estilosCarrinho.btnExcluir}
                        >
                          <Text>
                            <FontAwesome6 name="trash" size={16} color="red" />
                          </Text>
                        </Pressable>
                      </View>
                    );
                  })}
                </ScrollView>
              )}
              <View style={estilosCarrinho.areaComprar}>
                <View style={estilosCarrinho.areaInfos}>
                  <View style={[estilosCarrinho.areaInfos, { gap: 5 }]}>
                    <Text style={estilosCarrinho.txtInfos}>Quantidade:</Text>
                    <Text
                      style={[
                        estilosCarrinho.txtInfos,
                        estilosCarrinho.txtDestaque,
                      ]}
                    >
                      {listaProdutosNoCarrinho.length}
                    </Text>
                  </View>
                  <View style={[estilosCarrinho.areaInfos, { gap: 5 }]}>
                    <Text style={estilosCarrinho.txtInfos}>Total:</Text>
                    <Text
                      style={[
                        estilosCarrinho.txtInfos,
                        estilosCarrinho.txtDestaque,
                      ]}
                    >
                      {formataPreco(totalNoCarrinho)}
                    </Text>
                  </View>
                </View>

                <Pressable
                  onPress={comprarProdutos}
                  style={estilosCarrinho.button}
                >
                  <Text style={estilosCarrinho.buttonText}>Comprar</Text>
                </Pressable>
              </View>
            </>
          )}
        </>
      )}
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
    fontSize: 24,
    marginVertical: 8,
    fontFamily: "Comfortaa",
    fontWeight: "600",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#466060",
    padding: 12,
    borderRadius: 50,
    marginVertical: 18,
  },
  buttonText: {
    color: "#ECA457",
    fontSize: 18,
    fontFamily: "Comfortaa",
    fontWeight: "600",
    textAlign: "center",
  },
  cardDoCarrinho: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 4,
    padding: 8,
  },
  areaComprar: {
    padding: 18,
    elevation: 5,
  },
  btnExcluir: {
    borderWidth: 4,
    borderColor: "red",
    padding: 16,
    borderRadius: 50,
  },
  titulo: {
    textAlign: "center",
  },
  areaInfos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  txtInfos: {
    fontFamily: "Barlow",
    fontWeight: "600",
    fontSize: 16,
    color: "#466060",
  },
  txtDestaque: {
    backgroundColor: "#A8Cf45",
    padding: 10,
    borderRadius: 15,
    fontSize: 18,
    fontWeight: "bold",
  },
});
