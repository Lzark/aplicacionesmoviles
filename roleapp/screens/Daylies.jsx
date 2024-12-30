import React, { useEffect, useState } from "react";
import { Text, View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DayliTask } from "../components/DayliTask";
import * as SQLite from "expo-sqlite";

//Pantalla Daylies

export function Daylies({ navigation }) {
  return <View style={styles.container}></View>;

  // <DayliTask>Esta es una tarea</DayliTask>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
