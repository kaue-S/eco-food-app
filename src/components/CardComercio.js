import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import VerComercio from "./VerComercio";

export default function CardComercio({ comerciante }) {
  const [verModal, setVerModal] = useState(false);

  const abrirModal = () => {
    setVerModal(true);
  };

  const fecharModal = () => {
    setVerModal(false);
  };

  return (
    <>
      <Pressable
        key={comerciante.id}
        style={estilosIconeComercio.btnComercio}
        onPress={abrirModal}
      >
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
      <Modal animationType="slide" visible={verModal}>
        <View>
          <Pressable
            onPress={fecharModal}
            style={estilosIconeComercio.barraInicial}
          >
            <Text style={estilosIconeComercio.titulo}>Comerciante</Text>
            <Text style={[estilosIconeComercio.titulo, { fontWeight: "bold" }]}>
              Voltar
            </Text>
          </Pressable>
        </View>
        <VerComercio pgComercio={comerciante} />
      </Modal>
    </>
  );
}

const estilosIconeComercio = StyleSheet.create({
  btnComercio: {
    backgroundColor: "#a8cf45",
    borderRadius: 15,
    elevation: 2,
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
  barraInicial: {
    backgroundColor: "#a8cf45",
    padding: 10,
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
  },

  titulo: {
    fontSize: 20,
    color: "#f7f7f7",
    margin: 8,
  },
});
