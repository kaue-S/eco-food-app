import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function TabelaNutricional({ tabela }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tabela Nutricional</Text>
      {Object.keys(tabela).map((key) => (
        <View key={key} style={styles.row}>
          <Text style={styles.cell}>{tabela[key].nome}</Text>
          <Text style={styles.cell}>{tabela[key].quantidade}</Text>
          <Text style={styles.cell}>{tabela[key].vd}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#404040",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  titulo: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
