import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import CadastroUsuario from "./src/screens/CadastroUsuario";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "./src/screens/Inicial";
import LoginUsuario from "./src/screens/LoginUsuario";
import Home from "./src/screens/Home";
import { ScreenStackHeaderLeftView } from "react-native-screens";
import Carrinho from "./src/screens/Carrinho";
import AddCarrinho from "./src/screens/AddCarrinho";
// import {  } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
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
              title: "Crie sua conta",
              headerStyle: { backgroundColor: "green" },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="LoginUsuario"
            component={LoginUsuario}
            options={{
              title: "Faça seu Login",
              headerStyle: { backgroundColor: "green" },
              headerTintColor: "#fff",
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
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
