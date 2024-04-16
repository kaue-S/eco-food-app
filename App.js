import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CadastroUsuario from "./src/screens/CadastroUsuario";
import Inicial from "./src/screens/Inicial";
import LoginUsuario from "./src/screens/LoginUsuario";
import Home from "./src/screens/Home";
import Carrinho from "./src/screens/Carrinho";
import Resultados from "./src/screens/Resultados";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import EsqueciSenha from "./src/screens/EsqueciSenha";
import PerfilUsuario from "./src/screens/PerfilUsuario";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);
  // console.log(isUserLoggedIn);
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
          fontSize: 20,
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
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: route.name === route.name ? "#1E3939" : "#0000",
        tabBarInactiveTintColor: "#1E3939",
        tabBarActiveBackgroundColor:
          route.name === route.name ? "#f7f7f7" : null,
        tabBarStyle: {
          backgroundColor: "#a8c458",
          elevation: 5,
          height: 55,
        },
        tabBarLabelStyle: {
          fontSize: 14, // Ajuste o tamanho da fonte conforme necessário
        },
        

      })}

    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Carrinho"
        component={Carrinho}
        options={{
          headerShown: false,
          tabBarLabel: "Cesta",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="shopping-basket" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Resultados"
        component={Resultados}
        options={{
          headerShown: false,
          tabBarLabel: "Pesquisar",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="PerfilUsuario"
        component={PerfilUsuario}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-circle-o" color={color} size={size} />
          ),
          headerStyle: { backgroundColor: "#a8cf45" },
          headerTintColor: "#466060",
          fontFamily: "Comfortaa",
          headerTitleAlign: "center",
        }}
      />
    </Tab.Navigator>
  );
};
