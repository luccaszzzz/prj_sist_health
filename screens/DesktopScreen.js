import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function DesktopScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuário: {user}</Text>
      <Button
        title="Cálculo IMC"
        onPress={() => navigation.navigate("Cálculo IMC")}
      />
      <Button
        title="Gasto Calórico"
        onPress={() => navigation.navigate("Gasto Calórico")}
      />
      <Button title="Guia Nutricional" disabled />
      <Button title="Meditação" disabled />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 18, marginBottom: 20 },
});
