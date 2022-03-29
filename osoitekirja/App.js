import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Kartta from "./Kartta";
import Osoitteet from "./Osoitteet";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Osoitteet" component={Osoitteet} />
        <Stack.Screen name="Kartta" component={Kartta} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  grey: {
    color: "grey",
  },
  kesk: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#2196f3",
    borderRadius: 10,
    margin: 10,
  },
  delete: {
    backgroundColor: "#F2413A",
    borderRadius: 10,
    margin: 10,
  },
  input: {
    height: 40,
    width: 60 + "%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    fontSize: 15,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  hori: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleText: {
    fontSize: 20,
  },
  flatList: {
    width: 80 + "%",
    flex: 1,
  },
});
