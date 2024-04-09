import React, { useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import SafeContainer from "../components/SafeContainer";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function Inicial({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({
    Comfortaa: require("../../assets/fonts/Comfortaa-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded || fontError) {
    return null;
  }

  return (
    <SafeContainer onLayout={onLayoutRootView}>
      <View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require("../../assets/images/LogoECOFOOD.png")}
            />
            <View style={styles.frase}>
              <Text style={styles.textofrase}>Que bom ter você conosco</Text>
              <Text style={styles.textofrase}> Vamos poupar alimentos!</Text>
            </View>

            <Pressable
              style={styles.botaoCadastrar}
              onPress={() => {
                navigation.navigate("Cadastro");
              }}
            >
              <Text style={styles.textoBotao}>Cadastrar</Text>
            </Pressable>
            <Pressable
              style={styles.botaoLogin}
              onPress={() => {
                navigation.navigate("LoginUsuario");
              }}
            >
              <Text style={styles.textoBotao}>Entrar</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 25,
  },
  frase: {
    marginBottom: "15%",
  },
  textofrase: {
    fontFamily: "Comfortaa",
    fontSize: 18,
    fontWeight: "600",
    color: "#466060",
  },

  logo: {
    marginTop: "30%",
    width: 300,
    height: 300,
    resizeMode: "contain",
  },

  botaoCadastrar: {
    height: 50,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a8cf45",
    marginBottom: 10,
  },

  botaoLogin: {
    height: 50,
    width: "65%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eca457",
    marginBottom: 10,
  },

  textoBotao: {
    fontSize: 18,
    color: "#466060",
    fontFamily: "Comfortaa",
  },
});
