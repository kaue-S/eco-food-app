import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CadastroUsuario from "./src/screens/CadastroUsuario";
import Inicial from "./src/screens/Inicial";
import LoginUsuario from "./src/screens/LoginUsuario";
import Home from "./src/screens/Home";
import Carrinho from "./src/screens/Carrinho";
import AddCarrinho from "./src/screens/AddCarrinho";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import EsqueciSenha from "./src/screens/EsqueciSenha";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
      console.log(isUserLoggedIn);
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <NavigationContainer>
        {!isUserLoggedIn ? <AuthStack /> : <MainTabNavigator />}
      </NavigationContainer>
    </>
  );
}

const AuthStack = () => {
  return (
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
          headerStyle: { backgroundColor: "#a8cf45" },
          headerTintColor: "#466060",
          fontFamily: "Comfortaa",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="LoginUsuario"
        component={LoginUsuario}
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "#eca457" },
          headerTintColor: "#466060",
          fontFamily: "Comfortaa",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="EsqueciSenha"
        component={EsqueciSenha}
        options={{
          title: "Redefinir Senha",
          headerStyle: { backgroundColor: "#eca457" },
          headerTintColor: "#466060",
          fontFamily: "Comfortaa",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
