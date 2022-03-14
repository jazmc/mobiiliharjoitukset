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
import * as Contacts from "expo-contacts";

export default function App() {
  const [kontaktit, setKontaktit] = useState([]);

  const hae = () => {
    haeKontaktit();
  };

  const haeKontaktit = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setKontaktit(data);
      console.log(data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.hori}>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={hae}
          title="hae"
        >
          <Text>Get contacts</Text>
        </Pressable>
      </View>
      <Text style={styles.titleText}>Contacts</Text>
      <FlatList
        data={kontaktit}
        renderItem={({ item }) => (
          <View style={styles.kesk}>
            <Text style={styles.listtext}>
              {item.firstName} {item.lastName} p. {item.phoneNumbers[0].number}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
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
