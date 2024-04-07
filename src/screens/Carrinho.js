import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Carrinho({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Carrinho</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
