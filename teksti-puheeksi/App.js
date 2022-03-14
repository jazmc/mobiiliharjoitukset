import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
} from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [lause, setLause] = useState("");

  const speak = () => {
    Speech.speak(lause);
  };

  return (
    <View style={styles.container}>
      <TextInput
        returnKeyType="done"
        style={styles.input}
        name="lause"
        onChangeText={(text) => setLause(text)}
        value={lause}
        placeholder="Sentence to speak..."
      />
      <View style={styles.hori}>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={speak}
          title="hae"
        >
          <Text>Speak</Text>
        </Pressable>
        <Pressable
          style={styles.delete}
          color="#2196f3"
          onPress={() => setLause("")}
          title="hae"
        >
          <Text>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  kesk: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  button: {
    backgroundColor: "#2196f3",
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  delete: {
    backgroundColor: "#F2413A",
    padding: 20,
    margin: 10,
    borderRadius: 10,
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
    justifyContent: "center",
  },
  hori: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  titleText: {
    fontSize: 20,
  },
  flatList: {
    height: 60 + "%",
    width: 90 + "%",
    flexGrow: 0,
  },
  listtext: {
    marginRight: 20 + "%",
  },
});
