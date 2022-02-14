import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
} from "react-native";

export default function App() {
  const [hakusana, setHakusana] = useState("");
  const [reseptit, setReseptit] = useState([]);

  const hae = () => {
    haeReseptit();
  };

  const tyhjenna = () => {
    setHakusana("");
    setReseptit([]);
  };

  const haeReseptit = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${hakusana}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals == null) {
          alert("No results found! :(");
        } else {
          setReseptit(data.meals);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Search recipes</Text>
      <TextInput
        returnKeyType="done"
        style={styles.input}
        name="hakusana"
        onChangeText={(text) => setHakusana(text)}
        value={hakusana}
        placeholder="Keyword"
      />
      <View style={styles.hori}>
        <Pressable
          style={styles.button}
          color="#2196f3"
          onPress={hae}
          title="hae"
        >
          <Text>Search</Text>
        </Pressable>
        <Pressable
          style={styles.delete}
          color="#F2413A"
          onPress={tyhjenna}
          title="tyhjennä"
        >
          <Text>Reset</Text>
        </Pressable>
      </View>
      <FlatList
        data={reseptit}
        renderItem={({ item }) => (
          <View style={styles.kesk}>
            <Image
              style={styles.image}
              source={{
                uri: item.strMealThumb,
              }}
            />
            <Text style={styles.listtext}>{item.strMeal}</Text>
          </View>
        )}
        keyExtractor={(item) => item.idMeal}
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
