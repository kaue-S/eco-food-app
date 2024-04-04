import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SafeContainer({ children }) {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    width: "100%",
  },
});
