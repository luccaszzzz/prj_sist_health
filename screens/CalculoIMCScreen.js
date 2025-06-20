import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function CalculoIMCScreen() {
  const { user } = useAuth();
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [sexo, setSexo] = useState("Masculino");
  const [imc, setImc] = useState("");
  const [condicao, setCondicao] = useState("");

  const calcularIMC = () => {
    const p = parseFloat(peso);
    const a = parseFloat(altura);
    if (!p || !a) return;

    const resultado = p / (a * a);
    setImc(resultado.toFixed(2));

    if (resultado < 16) setCondicao("Magreza grave");
    else if (resultado < 17) setCondicao("Magreza moderada");
    else if (resultado <= 18.5) setCondicao("Magreza leve");
    else if (resultado <= 24.9) setCondicao("Peso ideal");
    else if (resultado <= 29.9) setCondicao("Sobrepeso");
    else if (resultado <= 34.9) setCondicao("Obesidade grau I");
    else if (resultado <= 39.9) setCondicao("Obesidade grau II");
    else setCondicao("Obesidade grau III");
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.header}>Cálculo IMC</Text>
        <Text style={styles.label}>Usuário: {user}</Text>

        <Text style={styles.label}>Peso:</Text>
        <TextInput
          placeholder="Ex: 63"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
          style={styles.input}
        />

        <Text style={styles.label}>Altura:</Text>
        <TextInput
          placeholder="Ex: 1.71"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
          style={styles.input}
        />

        <Text style={styles.label}>Sexo:</Text>
        <View style={styles.radioContainer}>
          <Pressable
            onPress={() => setSexo("Masculino")}
            style={styles.radioOption}
          >
            <Text>{sexo === "Masculino" ? "🔘" : "⚪"} Masculino</Text>
          </Pressable>
          <Pressable
            onPress={() => setSexo("Feminino")}
            style={styles.radioOption}
          >
            <Text>{sexo === "Feminino" ? "🔘" : "⚪"} Feminino</Text>
          </Pressable>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Button title="Calcular" onPress={calcularIMC} />
        </View>

        <Text style={styles.label}>IMC:</Text>
        <TextInput value={imc} editable={false} style={styles.input} />

        <Text style={styles.label}>Condição:</Text>
        <TextInput value={condicao} editable={false} style={styles.input} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    padding: 10,
  },
  container: {
    borderWidth: 1,
    borderColor: "black",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    width: "100%",
  },
  radioContainer: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: "column",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
});
