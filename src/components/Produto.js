import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Produto({ produto }) {
  return (
    <View>
      <Pressable>
        <Text>Produto</Text>
        <Text>Foto do Produto</Text>
        <Text>Nome do Produto</Text>
        <Text>Preço do Produto</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
