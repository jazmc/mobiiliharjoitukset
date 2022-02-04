import React, { useState } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Calculator from "./components/Calculator";
import CalculationHistory from "./components/History";

import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Laskin" component={Calculator} />
      <Stack.Screen name="Historia" component={CalculationHistory} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
