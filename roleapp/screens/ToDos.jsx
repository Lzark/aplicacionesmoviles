import React, { useEffect, useState, useCallback } from "react";
import { Text, View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { setupDatabase, readTodos, addTodo } from "../database";
import { DayliTask } from "../components/DayliTask";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
export function ToDos() {
  const [rows, setRows] = useState("");

  useFocusEffect(
    useCallback(() => {
      async function initializeDatabase() {
        await setupDatabase();
        const fetchedRows = await readTodos();
        setRows(fetchedRows);
      }
      initializeDatabase();
      return () => {
        console.log("Pantalla desenfocada");
      };
    }, [])
  );

  useEffect(() => {
    async function initializeDatabase() {
      await setupDatabase();
      const fetchedRows = await readTodos();
      setRows(fetchedRows);
    }
    initializeDatabase();
  }, []);
  return (
    <View style={styles.container}>
      {Array.isArray(rows) && rows.length > 0 ? (
        rows.map((row) => <DayliTask key={row.id}>{row.name}</DayliTask>)
      ) : (
        <Text>No hay Tareas</Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
