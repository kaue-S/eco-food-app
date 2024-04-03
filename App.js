import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CadastroUsuario from "./src/screens/CadastroUsuario";

export default function App() {
  return (
    <View style={styles.container}>
      <CadastroUsuario />
    </View>
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
