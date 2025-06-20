import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const { setUser } = useAuth();

  const handleLogin = () => {
    if (login === "admin" && senha === "123456") {
      setUser(login);
      navigation.navigate("Área do Usuário");
    } else {
      Alert.alert("Erro", "Login ou senha incorretos");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema Health</Text>
      <TextInput
        placeholder="Login"
        onChangeText={setLogin}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        onChangeText={setSenha}
        style={styles.input}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
});
