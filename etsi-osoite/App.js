import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import MapView from "react-native-maps";

export default function App() {
  const [hakusana, setHakusana] = useState("");
  const [paikka, setPaikka] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const hae = () => {
    haeKoordinaatit();
  };

  const tyhjenna = () => {
    setHakusana("");
  };

  const haeKoordinaatit = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=aPC5UDMmDVmFpGzB7pYF5azEyzHAvWSI&location=${hakusana}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results == null) {
          alert("No results found! :(");
        } else {
          setPaikka({
            ...paikka,
            latitude: data.results[0].locations[0].latLng.lat,
            longitude: data.results[0].locations[0].latLng.lng,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
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
      <View style={styles.flatList}>
        <MapView style={styles.map} region={paikka} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.7,
  },
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
    height: 70 + "%",
    width: 100 + "%",
    flexGrow: 0,
  },
  listtext: {
    marginRight: 20 + "%",
  },
});
