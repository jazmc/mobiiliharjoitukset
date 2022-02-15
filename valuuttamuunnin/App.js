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
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [muunnettava, setMuunnettava] = useState("");
  const [vastaus, setVastaus] = useState("");
  const [haluttuvaluutta, setHaluttuvaluutta] = useState(0);
  const [valuutat, setValuutat] = useState([]);

  useEffect(() => {
    haeValuutat();
  }, []);

  const hae = () => {
    const summa = muunnettava / haluttuvaluutta;
    setVastaus(summa.toFixed(2));
  };

  const tyhjenna = () => {
    setMuunnettava("");
    setVastaus("");
    setHaluttuvaluutta(0);
  };

  const haeValuutat = () => {
    fetch(
      `http://api.exchangeratesapi.io/v1/latest?access_key=30ea4d1b3cc2cae1e3b4959972e62ea4`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success != true) {
          alert("Something went wrong! :(");
        } else {
          setValuutat(data.rates);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{vastaus} €</Text>
      <TextInput
        returnKeyType="done"
        style={styles.input}
        name="muunnettava"
        onChangeText={(text) => setMuunnettava(text)}
        value={muunnettava}
        keyboardType={"numeric"}
        placeholder="Muunnettava summa"
      />
      <Picker
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setHaluttuvaluutta(itemValue)}
      >
        {Object.entries(valuutat).map(([key, value], index) => (
          <Picker.Item label={key} value={value} key={index} />
        ))}
      </Picker>
      <View style={styles.hori}>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={hae}
          title="hae"
        >
          <Text>Muunna</Text>
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
