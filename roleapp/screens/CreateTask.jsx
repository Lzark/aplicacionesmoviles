import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import { openDataBase, setupDatabase, readTodos, addTodo } from "../database";

export function CreateTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputHeight, setInputHeight] = useState(40);

  const showToast = () => {
    ToastAndroid.show(
      "Has creado una tarea",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  useEffect(() => {
    async function initializeDatabase() {
      // await openDataBase();
      await setupDatabase();
    }
    initializeDatabase();
  }, []);

  async function agregarTodo() {
    if (name && description) {
      try {
        await addTodo(name, description);
        // Alert.alert("Tarea creada correctamente");
        setName("");
        setDescription("");
        showToast();
      } catch (error) {
        console.error("Error al insertar tarea: ", error);
        Alert.alert("Error al insertar tarea");
      }
    } else {
      Alert.alert("Ingrese todos los datos");
    }

    // if (name && description) {
    //   try {
    //     await addTodo(name, description);
    //     await fetchTodos();
    //     Alert.alert("Tarea creada correctamente");
    //   } catch (error) {
    //     console.error("Error al insertar tarea: ", error);
    //     Alert.alert("Error al insertar tarea");
    //   }
    // } else {
    //   Alert.alert("Ingrese todos los datos");
    // }
  }

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nombre de la tarea"
        multiline
        numberOfLines={2}
        maxLength={100}
      />
      <TextInput
        editable
        multiline
        numberOfLines={5}
        maxLength={180}
        onChangeText={setDescription}
        value={description}
        placeholder="Descripcion de la tarea"
        style={[styles.input, { height: Math.max(40, inputHeight) }]}
        onContentSizeChange={(event) =>
          setInputHeight(event.nativeEvent.contentSize.height)
        }
      />
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={agregarTodo}>
          <Text style={styles.textButton}>Crear Tarea</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  containerButton: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
});
