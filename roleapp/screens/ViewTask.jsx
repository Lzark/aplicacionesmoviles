import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ViewTask() {
  return (
    <View style={styles.container}>
      <Text>Detalles de la tarea</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
