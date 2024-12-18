import React, { useEffect, useState } from "react";
import { Text, View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DayliTask } from "../components/DayliTask";
import { getTasks } from "../database";
import * as SQLite from "expo-sqlite";
//Pantalla Daylies

export function Daylies({ navigation }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);
  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <DayliTask key={task.id}>{task.name}</DayliTask>
      ))}
    </View>
  );

  // <DayliTask>Esta es una tarea</DayliTask>;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
