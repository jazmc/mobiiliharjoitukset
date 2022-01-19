import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, Pressable } from "react-native";

export default function App() {
  const [arvattava, setArvattava] = useState(
    Math.floor(
      Math.random() * (Math.floor(100) - Math.ceil(1) + 1) + Math.ceil(1)
    )
  );
  const [arvaus, setArvaus] = useState("");
  const [laatu, setLaatu] = useState("");
  const [lkm, setLkm] = useState(0);

  const arvaa = () => {
    setLkm(lkm + 1);
    if (arvattava == parseInt(arvaus)) {
      alert("Arvasit oikein " + lkm + " yrityksellä!");
      setLaatu("Arvaus oli oikein!!! Uusi luku arvottu.");
      setArvattava(
        Math.floor(
          Math.random() * (Math.floor(100) - Math.ceil(1) + 1) + Math.ceil(1)
        )
      );
      setArvaus("");
      setLkm(0);
    } else if (parseInt(arvaus) < arvattava) {
      setLaatu("Arvaus oli liian pieni.");
      setArvaus("");
    } else {
      setLaatu("Arvaus oli liian suuri.");
      setArvaus("");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Arvaa luku väliltä 1-100</Text>
      <TextInput
        keyboardType="numeric"
        returnKeyType="done"
        style={styles.input}
        onChangeText={(text) => setArvaus(text)}
        value={arvaus}
        placeholder="Arvaus"
      />
      <Text>{laatu}</Text>
      <Pressable
        style={styles.button}
        color="#2196f3"
        onPress={arvaa}
        title="Arvaa"
      >
        <Text>Arvaa</Text>
      </Pressable>
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
