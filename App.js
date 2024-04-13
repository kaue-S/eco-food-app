import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import CadastroUsuario from "./src/screens/CadastroUsuario";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "./src/screens/Inicial";
import LoginUsuario from "./src/screens/LoginUsuario";
import Home from "./src/screens/Home";
import Carrinho from "./src/screens/Carrinho";
import AddCarrinho from "./src/screens/AddCarrinho";
import EsqueciSenha from "./src/screens/EsqueciSenha";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial">
          <Stack.Screen
            name="Inicial"
            component={Inicial}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroUsuario}
            options={{
              title: "Cadastro",
              headerStyle: { backgroundColor: "#a8cf45"},
              headerTintColor: "#466060",
              fontFamily: "Comfortaa",
              headerTitleAlign: "center"
            }}
          />
          <Stack.Screen
            name="LoginUsuario"
            component={LoginUsuario}
            options={{
              title: "Login",
              headerStyle: { backgroundColor: "#eca457"},
              headerTintColor: "#466060",
              fontFamily: "Comfortaa",
              headerTitleAlign: "center"
            }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Carrinho"
            component={Carrinho}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCarrinho"
            component={AddCarrinho}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="EsqueciSenha"
            component={EsqueciSenha}
            options={{
              title: "Redefinir Senha",
              headerStyle: { backgroundColor: "#eca457"},
              headerTintColor: "#466060",
              fontFamily: "Comfortaa",
              headerTitleAlign: "center"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
