import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import SafeContainer from "../components/SafeContainer";


export default function Inicial({navigation}){
    return(
        <SafeContainer>
            <View style={styles.container}>
                <TouchableOpacity style={styles.botaoCadastrar}>
                    <Text style={styles.textoBotao}>cadastrar</Text>
                </TouchableOpacity>
            </View>

        </SafeContainer>
    )
}

const styles = StyleSheet.create({
    botaoCadastrar: {
        height: 50,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    }
})