import React from "react";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, FlatList, Touchable } from "react-native";
import { Input, Button, ListItem, Icon } from "react-native-elements";
import * as SQLite from "expo-sqlite";

export default function MyPlaces({ navigation }) {
  const database = SQLite.openDatabase("osoitekirja.db");
  const [osoite, setOsoite] = useState("");
  const [osoitekirja, setOsoitekirja] = useState([]);

  useEffect(() => {
    database.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists osoitekirja (id integer primary key not null, osoite text);"
        );
      },
      null,
      haeOsoitteet
    );
  }, []);

  const lisaa = () => {
    database.transaction(
      (tx) => {
        tx.executeSql("insert into osoitekirja (osoite) values (?);", [osoite]);
      },
      null,
      haeOsoitteet
    );
  };

  const haeOsoitteet = () => {
    database.transaction(
      (tx) => {
        tx.executeSql("select * from osoitekirja;", [], (_, { rows }) =>
          setOsoitekirja(rows._array)
        );
      },
      null,
      null
    );
  };

  const deleteOsoite = (id) => {
    database.transaction(
      (tx) => {
        tx.executeSql("delete from osoitekirja where id = ?;", [id]);
      },
      null,
      haeOsoitteet
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Input
        label="OSOITEHAKU"
        placeholder="Ratapihantie 13, Helsinki, Finland"
        onChangeText={(text) => setOsoite(text)}
        value={osoite}
      />
      <Button
        onPress={lisaa}
        title="Lisää osoitekirjaan"
        iconPosition="left"
        backgroundColor="grey"
        style={{ height: 100, marginTop: 10 }}
        icon={{
          type: "material",
          name: "save",
          size: 18,
          color: "white",
        }}
      ></Button>
      <FlatList
        style={{ marginLeft: "5%", marginTop: "5%", width: "100%" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onLongPress={() => {
              deleteOsoite(item.id);
            }}
          >
            <ListItem.Content>
              <ListItem.Title>{item.osoite}</ListItem.Title>
              <ListItem.Subtitle style={styles.grey}>
                näytä osoite kartalla
              </ListItem.Subtitle>
            </ListItem.Content>
            <Icon
              type="material"
              reverse
              name="map"
              onPress={() => navigation.navigate("Kartta", { osoite: osoite })}
            />
            <Icon
              type="material"
              reverse
              name="delete"
              color="red"
              onPress={() => deleteOsoite(item.id)}
            />
          </ListItem>
        )}
        data={osoitekirja}
      />
    </View>
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
