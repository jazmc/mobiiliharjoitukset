import React, { useState, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";

export default function Map({ route }) {
  const osoite = route.params.osoite;
  const [tappa, setTappa] = useState({ latitude: 0, longitude: 0 });
  const [koordinaatit, setKoordinaatit] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const haeOsoite = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=aPC5UDMmDVmFpGzB7pYF5azEyzHAvWSI&location=${osoite}`
    )
      .then((response) => response.json())
      .then((json) => json.results[0].locations[0].latLng)
      .then((latLng) => {
        setKoordinaatit({
          ...koordinaatit,
          latitude: latLng.lat,
          longitude: latLng.lng,
        });
        setTappa({ latitude: latLng.lat, longitude: latLng.lng });
      })
      .catch((error) => {
        Alert.alert("Error: ", error.message);
      });
  };

  useEffect(() => {
    haeOsoite();
  }, []);

  return (
    <View styles={styles.container}>
      <MapView style={{ minHeight: 90 + "%" }} region={koordinaatit}>
        <Marker coordinate={tappa} />
      </MapView>
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
