import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";

export default function App() {
  const [nr1, setNr1] = useState(null);
  const [nr2, setNr2] = useState(null);
  const [result, setResult] = useState();

  const summaa = () => {
    setResult(parseInt(nr1) + parseInt(nr2));
  };

  const vahenna = () => {
    setResult(parseInt(nr1) - parseInt(nr2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Laskin</Text>
      <Text>Vastaus: {result}</Text>
      <TextInput
        keyboardType="numeric"
        returnKeyType="done"
        style={styles.input}
        name="nr1"
        onChangeText={(text) => setNr1(text)}
        value={nr1}
        placeholder="Luku 1"
      />
      <TextInput
        keyboardType="numeric"
        returnKeyType="done"
        style={styles.input}
        name="nr2"
        onChangeText={(text) => setNr2(text)}
        value={nr2}
        placeholder="Luku 2"
      />
      <View style={styles.hori}>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={summaa}
          title="+"
        >
          <Text>+</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={vahenna}
          title="-"
        >
          <Text>-</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2196f3",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    fontSize: 15,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  hori: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleText: {
    fontSize: 20,
  },
});
