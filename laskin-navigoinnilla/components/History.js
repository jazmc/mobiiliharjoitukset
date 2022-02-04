import React from "react";
import "react-native-gesture-handler";

import { View, Text, FlatList } from "react-native";

export default function CalculationHistory({ route, navigation }) {
  const history = route.params.history;
  const styles = route.params.styles;

  return (
    <View style={styles.container}>
      <FlatList
        data={history.sort((a, b) => (a.id > b.id ? -1 : 1))}
        renderItem={({ item }) => (
          <View style={styles.kesk}>
            <Text>{item.lasku}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
}
