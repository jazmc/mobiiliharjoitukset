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
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, remove, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcjCJ_zZL17O9Bxc4nwoTzetNVnDqf4tc",
  authDomain: "ostoslista-899c5.firebaseapp.com",
  projectId: "ostoslista-899c5",
  storageBucket: "ostoslista-899c5.appspot.com",
  messagingSenderId: "760824784390",
  appId: "1:760824784390:web:0fc52522396fe940018587",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  // ostoksen constit
  const [ostos, setOstos] = useState(""); // nimi text
  const [maara, setMaara] = useState(""); // määrä text
  // listaconst
  const [ostokset, setOstokset] = useState([]);

  // alusta tietokantataulu
  useEffect(() => {
    const itemsRef = ref(database, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null) {
        setOstokset(Object.entries(data));
        setOstos("");
        setMaara("");
        Keyboard.dismiss();
      }
    });
  }, []);

  const lisaaOstos = () => {
    push(ref(database, "items/"), { ostos: ostos, maara: maara });
  };

  const poistaOstos = (id) => {
    remove(ref(database, "items/" + id));
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
              {item[1].ostos}, {item[1].maara}
            </Text>
            <Text
              style={{ color: "red", marginLeft: 10 }}
              onPress={() => poistaOstos(item[0])}
            >
              OK
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
