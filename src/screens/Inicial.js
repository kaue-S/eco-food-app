import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import SafeContainer from "../components/SafeContainer";

export default function Inicial({ navigation }) {
  return (
    <SafeContainer>
      <View style={styles.container}>
        <View style={styles.blocoLogo}>
          <Image
            style={styles.logo}
            source={require("../../assets/images/LogoECOFOOD.png")}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.botaoCadastrar}
          onPress={() => {
            navigation.navigate("Cadastro");
          }}
        >
          <Text style={styles.textoBotao}>cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoLogin}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("LoginUsuario");
          }}
        >
          <Text style={styles.textoBotao}>login</Text>
        </TouchableOpacity>
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

  blocoLogo: {
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
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
    color: "white",
  },
});
