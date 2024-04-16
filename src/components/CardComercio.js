import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function CardComercio({ comerciante }) {
  return (
    <>
      <Pressable key={comerciante.id} style={estilosIconeComercio.btnComercio}>
        <View style={estilosIconeComercio.conteudoBtn}>
          <Image
            resizeMode="contain"
            source={{ uri: `${comerciante.icone}` }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#a8cf45",
              borderRadius: 15,
            }}
          />
          <Text style={estilosIconeComercio.nomComercio}>
            {comerciante.nome}
          </Text>
        </View>
      </Pressable>
    </>
  );
}

const estilosIconeComercio = StyleSheet.create({
  btnComercio: {
    backgroundColor: "#a8cf45",
    borderRadius: 15,
  },
  conteudoBtn: {
    alignItems: "center",
    width: 120,
    margin: 12,
    padding: 8,
  },
  nomComercio: {
    textAlign: "center",
  },
});
