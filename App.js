
import { StyleSheet, Text, View, SafeAreaView, StatusBar  } from "react-native";
import CadastroUsuario from "./src/screens/CadastroUsuario";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Inicial from "./src/screens/Inicial";
// import {  } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"light-content"}/>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicial">
          <Stack.Screen name="Inicial" component={Inicial} options={{headerShown: false}}/>
          <Stack.Screen name="Cadastro" component={CadastroUsuario} options={{
            title: "Crie sua conta",
            headerStyle: {backgroundColor: "green"},
            headerTintColor: "#fff",
          }}/>
          
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
