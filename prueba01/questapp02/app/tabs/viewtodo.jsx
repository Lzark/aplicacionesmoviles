import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import {
  setupDatabase,
  readTodos,
  getToDoById,
  updateToDoById,
} from "../../database";

export default function viewtodo() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputHeight, setInputHeight] = useState(40);

  const [rows, setRows] = useState("");
  const params = useLocalSearchParams();
  const { id } = params;

  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      async function initializeDatabase() {
        await setupDatabase();
        const fetchedRows = await getToDoById(params.id);
        setRows(fetchedRows);
      }

      initializeDatabase();
      return () => {};
    }, [params.id])
  );

  useEffect(() => {
    if (rows) {
      setName(rows.name || "");
      setDescription(rows.description || "");
    }
  }, [rows]);

  async function modificarToDo() {
    if (name && description) {
      try {
        await updateToDoById(name, description, id);
        setName("");
        setDescription("");
        showToast("Se modifico correctamente la tarea");
        navigation.goBack();
      } catch (error) {
        console.error("Error al moficar tarea: ", error);
      }
    } else {
      Alert.alert("Ingrese todos los datos");
    }
  }

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };
  return (
    <View>
      <Text style={styles.titleToDo}>Modificar Tarea</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nombre"
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
        placeholder="Descripcion"
        style={[styles.input, { height: Math.max(40, inputHeight) }]}
        onContentSizeChange={(event) =>
          setInputHeight(event.nativeEvent.contentSize.height)
        }
      />

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={modificarToDo}>
          <Text style={styles.textButton}>Modificar tarea Tarea</Text>
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
  titleToDo: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
  },
});
