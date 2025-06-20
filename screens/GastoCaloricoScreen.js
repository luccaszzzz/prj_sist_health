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
import { Picker } from "@react-native-picker/picker";
import { useAuth } from "../contexts/AuthContext";

export default function GastoCaloricoScreen() {
  const { user } = useAuth();
  const [sexo, setSexo] = useState("Masculino");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [atividadeTrabalho, setAtividadeTrabalho] = useState("Leve");
  const [exercicioSemanal, setExercicioSemanal] = useState("0");
  const [gastoBasal, setGastoBasal] = useState("");
  const [gastoTotal, setGastoTotal] = useState("");

  const calcularGasto = () => {
    const pesoNum = parseFloat(peso);
    if (!pesoNum) return;

    let fator = 1.2;

    if (atividadeTrabalho === "Leve") {
      fator += 0.35;
    } else if (atividadeTrabalho === "Moderada") {
      fator += 0.64;
    } else if (atividadeTrabalho === "Intensa") {
      fator += 1.0;
    } else if (atividadeTrabalho === "Atleta") {
      fator += 1.2;
    }

    const exercicioHoras = parseInt(exercicioSemanal);
    if (exercicioHoras >= 1 && exercicioHoras <= 2) fator += 0.1;
    else if (exercicioHoras <= 4) fator += 0.2;
    else fator += 0.4;

    const basal =
      sexo === "Feminino" ? 8.126 * pesoNum + 845.6 : 13.75 * pesoNum + 5;

    const total = basal * fator;
    setGastoBasal(basal.toFixed(2));
    setGastoTotal(total.toFixed(2));
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.header}>Gasto Calórico</Text>
        <Text style={styles.label}>Usuário: {user}</Text>

        <Text style={styles.label}>Sexo:</Text>
        <Pressable onPress={() => setSexo("Masculino")} style={styles.radio}>
          <Text>{sexo === "Masculino" ? "🔘" : "⚪"} Masculino</Text>
        </Pressable>
        <Pressable onPress={() => setSexo("Feminino")} style={styles.radio}>
          <Text>{sexo === "Feminino" ? "🔘" : "⚪"} Feminino</Text>
        </Pressable>

        <Text style={styles.label}>Idade:</Text>
        <TextInput
          placeholder="Ex: 22"
          keyboardType="numeric"
          value={idade}
          onChangeText={setIdade}
          style={styles.input}
        />

        <Text style={styles.label}>Peso:</Text>
        <TextInput
          placeholder="Ex: 63"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
          style={styles.input}
        />

        <Text style={styles.label}>Atividade Física no Trabalho:</Text>
        <Picker
          selectedValue={atividadeTrabalho}
          onValueChange={(itemValue) => setAtividadeTrabalho(itemValue)}
          style={styles.input}
        >
          <Picker.Item
            label="Trabalho com pouco esforço físico"
            value="Leve"
          />
          <Picker.Item
            label="Trabalho com esforço físico moderado"
            value="Moderada"
          />
          <Picker.Item
            label="Trabalho com esforço físico intenso"
            value="Intensa"
          />
          <Picker.Item label="Atleta Profissional" value="Atleta" />
        </Picker>

        <Text style={styles.label}>Exercício Físico Semanal:</Text>
        <Picker
          selectedValue={exercicioSemanal}
          onValueChange={(itemValue) => setExercicioSemanal(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Pouco ou nada" value="0" />
          <Picker.Item label="1 Hora" value="1" />
          <Picker.Item label="2 Horas" value="2" />
          <Picker.Item label="3 Horas" value="3" />
          <Picker.Item label="5 Horas" value="5" />
          <Picker.Item label="7 Horas" value="7" />
        </Picker>

        <View style={{ marginVertical: 10 }}>
          <Button title="Calcular" onPress={calcularGasto} />
        </View>

        <Text style={styles.label}>Gasto Basal:</Text>
        <TextInput value={gastoBasal} editable={false} style={styles.input} />

        <Text style={styles.label}>Gasto Total Diário:</Text>
        <TextInput
          value={gastoTotal}
          editable={false}
          style={styles.input}
        />
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
  radio: {
    marginTop: 5,
  },
});
