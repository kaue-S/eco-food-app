import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { db, auth } from "../../firebase.config";
import { getDatabase, ref } from "firebase/database";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const buscarDadosUsuario = async () => {
  //     const db = getDatabase();
  //     /* const reference = ref(db, `usuarios/${usuarioAtual.uid}`); */

  //     try {
  //       const usuarioAtual = auth.currentUser;
  //       if (usuarioAtual) {
  //         const usuarioRef = ref(db, `usuarios/${usuarioAtual.uid}`);
  //         usuarioRef.on("value", (snapshot) => {
  //           const dadosUsuario = snapshot.val();
  //           setUsuario(dadosUsuario);
  //           setLoading(false);
  //         });
  //       } else {
  //         Alert.alert("Erro", "Usuário não está autenticado.");
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error("Erro ao buscar dados do usuário:", error);
  //       Alert.alert("Erro", "Ocorreu um erro ao buscar os dados do usuário.");
  //       setLoading(false);
  //     }
  //   };

  //   buscarDadosUsuario();
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  return (
    <View style={styles.container}>
      {usuario ? (
        <View>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.texto}>{usuario.nome}</Text>

          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.texto}>{usuario.email}</Text>

          <Text style={styles.label}>CPF:</Text>
          <Text style={styles.texto}>{usuario.cpf}</Text>

          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.texto}>
            {usuario.endereco
              ? `${usuario.endereco.rua}, ${usuario.endereco.numero}`
              : "Endereço não especificado"}
          </Text>
        </View>
      ) : (
        <Text>Não foi possível carregar os dados do usuário.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  texto: {
    fontSize: 16,
  },
});
