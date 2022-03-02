import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [sijainti, setSijainti] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const initial = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  useEffect(
    () =>
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          let sij = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
          });
          setSijainti({
            ...sijainti,
            latitude: sij.coords.latitude,
            longitude: sij.coords.longitude,
          });
          alert("Paikannus onnistui!");
        } else {
          alert("Et ole sallinut sijaintitietojen käyttöä");
        }
      })(),
    []
  );

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={sijainti} initialRegion={initial}>
        <Marker coordinate={sijainti} title="Sijaintisi" />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
