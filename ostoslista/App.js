import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

export default function App() {
  const [ostos, setOstos] = useState("");
  const [ostokset, setOstokset] = useState([]);
  const [luku, setLuku] = useState(0);

  const lisaa = () => {
    setLuku(luku + 1);
    setOstokset([
      ...ostokset,
      {
        id: luku,
        nimi: ostos,
      },
    ]);
    setOstos("");
  };

  const tyhjenna = () => {
    setLuku(0);
    setOstos("");
    setOstokset([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Ostoslista</Text>
      <TextInput
        returnKeyType="done"
        style={styles.input}
        name="ostos"
        onChangeText={(text) => setOstos(text)}
        value={ostos}
        placeholder="Ostos"
      />
      <View style={styles.hori}>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={lisaa}
          title="lisää"
        >
          <Text>Lisää</Text>
        </Pressable>
        <Pressable
          style={styles.delete}
          color="#F2413A"
          onPress={tyhjenna}
          title="tyhjennä"
        >
          <Text>Tyhjennä</Text>
        </Pressable>
      </View>
      <FlatList
        data={ostokset.sort((a, b) => (a.id > b.id ? -1 : 1))}
        renderItem={({ item }) => (
          <View style={styles.kesk}>
            <Text>{item.nimi}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  kesk: {
    justifyContent: "center",
    alignItems: "center",
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
    height: 200,
    width: 80 + "%",
    flexGrow: 0,
  },
});
