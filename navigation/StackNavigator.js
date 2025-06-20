import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import DesktopScreen from "../screens/DesktopScreen";
import CalculoIMCScreen from "../screens/CalculoIMCScreen";
import GastoCaloricoScreen from "../screens/GastoCaloricoScreen";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Área do Usuário" component={DesktopScreen} />
      <Stack.Screen name="Cálculo IMC" component={CalculoIMCScreen} />
      <Stack.Screen name="Gasto Calórico" component={GastoCaloricoScreen} />
    </Stack.Navigator>
  );
}
