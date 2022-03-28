import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Keyboard } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header, Input, Button, Icon, ListItem } from "react-native-elements";
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
    if (ostos == "") {
      return false;
    }

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
    <SafeAreaProvider>
      <Header
        centerComponent={{ text: "OSTOSLISTA", style: { color: "#fff" } }}
      />
      <View style={styles.container}>
        <Input
          placeholder="Kirjoita ostos..."
          label="OSTOS"
          onChangeText={(text) => setOstos(text)}
          value={ostos}
        />
        <Input
          returnKeyType="done"
          placeholder="Kirjoita määrä..."
          label="MÄÄRÄ"
          onChangeText={(text) => setMaara(text)}
          value={maara}
        />
        <View style={styles.hori}>
          <Button
            standard
            icon={{ name: "add" }}
            onPress={lisaaOstos}
            buttonStyle={styles.button}
            title="LISÄÄ"
          />
        </View>
        <FlatList
          data={ostokset}
          renderItem={({ item }) => (
            <ListItem bottomDivider style={styles.kesk}>
              <ListItem.Content>
                <ListItem.Title>{item.nimi}</ListItem.Title>
                <ListItem.Subtitle style={styles.grey}>
                  {item.maara}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Icon
                type="material"
                reverse
                color="red"
                name="delete"
                onPress={() => poistaOstos(item.id)}
              />
            </ListItem>
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatList}
        />
      </View>
    </SafeAreaProvider>
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
