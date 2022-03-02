import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
  Keyboard,
} from "react-native";
import * as SQLite from "expo-sqlite";

export default function App() {
  // ostoksen constit
  const [ostos, setOstos] = useState(""); // nimi text
  const [maara, setMaara] = useState(""); // määrä text
  // listaconst
  const [ostokset, setOstokset] = useState([]);

  // database alustus
  const db = SQLite.openDatabase("ostosdb.db");

  // alusta tietokantataulu
  useEffect(() => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists ostos (id integer primary key not null, nimi text, maara text);"
        );
      },
      null,
      updateOstoslista
    );
  }, []);

  const lisaaOstos = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into ostos (nimi, maara) values (?, ?);", [
          ostos,
          maara,
        ]);
      },
      null,
      updateOstoslista
    );
  };

  const updateOstoslista = () => {
    db.transaction(
      (tx) => {
        tx.executeSql("select * from ostos;", [], (_, { rows }) =>
          setOstokset(rows._array)
        );
      },
      null,
      null
    );
    setMaara("");
    setOstos("");
    Keyboard.dismiss();
  };

  const poistaOstos = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from ostos where id = ?;", [id]);
      },
      null,
      updateOstoslista
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Ostoslista</Text>
      <TextInput
        returnKeyType="done"
        style={styles.input}
        onChangeText={(text) => setOstos(text)}
        value={ostos}
        placeholder="Ostos"
      />
      <TextInput
        returnKeyType="done"
        style={styles.input}
        onChangeText={(text) => setMaara(text)}
        value={maara}
        placeholder="Määrä"
      />
      <View style={styles.hori}>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={lisaaOstos}
          title="lisää"
        >
          <Text>Lisää</Text>
        </Pressable>
      </View>
      <FlatList
        data={ostokset}
        renderItem={({ item }) => (
          <View style={styles.kesk}>
            <Text>
              {item.nimi}, {item.maara}
            </Text>
            <Text
              style={{ color: "red", marginLeft: 10 }}
              onPress={() => poistaOstos(item.id)}
            >
              OK
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  kesk: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
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
