import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import SafeContainer from "../components/SafeContainer";

export default function Inicial({ navigation }) {
  return (
    <SafeContainer>
      <View style={styles.container}>
        <Text style={styles.titulo}>Seja Bem-Vindo</Text>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.botaoCadastrar}
            onPress={() => {
              navigation.navigate("Cadastro");
            }}
          >
            <Text style={styles.textoBotao}>cadastrar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoLogin} activeOpacity={0.8}>
            <Text style={styles.textoBotao}>login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    flex: 1,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 40,
  },

  botaoCadastrar: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green",
  },

  botaoLogin: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },

  textoBotao: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
