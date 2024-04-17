import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  Vibration,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { auth } from "../../firebase.config";
import { signOut } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import VerComercio from "../components/VerComercio";
import CardComercio from "../components/CardComercio";
import { FontAwesome6 } from "@expo/vector-icons";

export default function PerfilUsuario() {
  const [listaDeFavoritos, setListaDeFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [areaTela, setAreaTela] = useState(true);
  const { email, displayName: nome, endereco, telefone } = auth.currentUser;
  console.log(auth.currentUser);
  /* Função produtos_no_carrinho para fazer um fetch no AsynStorage */
  const BuscaDeFavoritos = useCallback(async () => {
    try {
      const dados = await AsyncStorage.getItem("@listafavoritos");

      if (dados) {
        setListaDeFavoritos(JSON.parse(dados));
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
      BuscaDeFavoritos();
    }, [BuscaDeFavoritos])
  );

  const logout = async () => {
    Alert.alert("Deslogar", "Tem certeza que quer sair do app?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const verFavoritos = () => {
    setAreaTela(true);
  };
  const verConfig = () => {
    setAreaTela(false);
  };

  const excluirFavorito = async (itemExcluido) => {
    console.log(itemExcluido);
    Vibration.vibrate(300);
    Alert.alert(
      "Excluir",
      "Tem certeza que deseja remover esse comerciante dos favoritos?",
      [
        { text: "cancelar", style: "cancel" },
        {
          text: "Sim, excluir!",
          onPress: async () => {
            try {
              const novaListaDeFavoritos = listaDeFavoritos.filter(
                (itemFavorito) =>
                  listaDeFavoritos.indexOf(itemFavorito) !== itemExcluido
              );

              await AsyncStorage.setItem(
                "@listafavoritos",
                JSON.stringify(novaListaDeFavoritos)
              );

              setListaDeFavoritos(novaListaDeFavoritos);
              Vibration.vibrate(300);
            } catch (error) {
              console.log("Erro ao Excluir: ", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagem}>
        <View style={styles.foto}>
          <Image
            source={require("../../assets/images/LogoECOFOOD.png")}
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.nome}>{nome}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        <Pressable
          style={[areaTela && { borderBottomWidth: 1, borderColor: "#ECA457" }]}
          onPress={verFavoritos}
        >
          <Text style={styles.buttonTextS}>Favoritos</Text>
        </Pressable>
        <Pressable
          style={[
            !areaTela && { borderBottomWidth: 1, borderColor: "#ECA457" },
          ]}
          onPress={verConfig}
        >
          <Text style={styles.buttonTextS}>Configurações</Text>
        </Pressable>
      </View>

      {loading && <ActivityIndicator size="large" color="#466060" />}

      {!loading && (
        <>
          {!areaTela ? (
            <>
              <View style={styles.header}>
                <Text style={styles.headerText}>Dados do Perfil</Text>
              </View>
              <View style={styles.dados}>
                <View style={styles.input}>
                  <Text style={styles.label}>Nome:</Text>
                  <Text style={styles.profileText}>{nome}</Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.label}>Email:</Text>
                  <Text style={styles.profileText}>{email}</Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.label}>Telefone:</Text>
                  <Text style={styles.profileText}>1195660-6737</Text>
                </View>
                <View style={styles.input}>
                  <Text style={styles.label}>Endereço:</Text>
                  <Text style={styles.profileText}>
                    R.Francisco coimbra, 403
                  </Text>
                </View>
              </View>
              <View style={styles.footer}>
                <Pressable style={styles.button}>
                  <Text style={styles.buttonText}>Editar Perfil</Text>
                </Pressable>
                <Pressable style={styles.buttonSair} onPress={logout}>
                  <Text style={styles.buttonTextS}>Sair</Text>
                </Pressable>
              </View>
            </>
          ) : (
            <>
              {listaDeFavoritos.length >= 1 ? (
                <View style={styles.menuComercio}>
                  {listaDeFavoritos.map((itemFavorito) => (
                    <View key={itemFavorito.id}>
                      <CardComercio comerciante={itemFavorito} />
                      <Pressable
                        style={styles.btnExcluir}
                        onPress={() =>
                          excluirFavorito(
                            listaDeFavoritos.indexOf(itemFavorito)
                          )
                        }
                      >
                        <View style={styles.areaBtnExcluir}>
                          <FontAwesome6 name="trash" size={16} color="red" />
                          <Text style={styles.textoExcluir}>Excluir</Text>
                        </View>
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text>Você ainda não tem favoritos</Text>
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Alinha os itens no início do container
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  imagem: {
    backgroundColor: "#a8cf45",
    marginBottom: 20,
    width: "100%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center", // Alinha os itens verticalmente no centro
  },
  dados: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#a8cf45",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    width: "90%",
    height: 50,
    paddingHorizontal: 10,
  },
  foto: {
    backgroundColor: "#ccc", // Cor de fundo temporária
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileText: {
    fontSize: 18,
    flex: 1, // Para garantir que o texto se ajuste corretamente
    color: "#466060",
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  nome: {
    fontSize: 20,
    marginTop: 20,
    fontFamily: "Comfortaa",
    fontWeight: "700",
    color: "#466060",
  },
  button: {
    backgroundColor: "#a8cf45",
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: "45%", // Ajuste conforme necessário
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#466060",
    fontSize: 18,
  },
  header: {
    marginBottom: 20, // Adiciona margem inferior para espaçamento
    marginTop: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#466060",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#f0f0f0",
  },
  buttonSair: {
    backgroundColor: "#466060",
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: "45%", // Ajuste conforme necessário
    borderRadius: 10,
    alignItems: "center",
    color: "#eca457",
  },
  buttonTextS: {
    color: "#eca457",
    fontSize: 18,
  },
  menuComercio: {
    flexDirection: "row",
    flexWrap: "wrap",

    justifyContent: "space-around",
    gap: 12,
    marginHorizontal: 8,
    marginVertical: 16,
  },
  btnExcluir: {
    borderWidth: 4,
    borderColor: "red",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical: 8,
  },
  areaBtnExcluir: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-around",
    alignItems: "center",
  },
  textoExcluir: {
    fontFamily: "Barlow",
    fontSize: 16,
    fontWeight: "500",
    color: "red",
  },
});
``;
