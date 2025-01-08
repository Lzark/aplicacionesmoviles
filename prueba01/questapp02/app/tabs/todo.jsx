import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import globalStyles from "../../globalStyles";
import {
  setupDatabase,
  readTodos,
  addTodo,
  deleteToDoById,
} from "../../database";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useFocusEffect, useRoute } from "@react-navigation/native";

import { useRoutes } from "../../contexts/GlobalContexts";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
//===============================================================
const { width } = Dimensions.get("window");

const showToast = (text) => {
  ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
};

function ToDoCard({ information, onTaskDeleted }) {
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  const onPseudoRadioPress = async () => {
    try {
      await deleteToDoById(information.id);
      showToast("Se eliminó correctamente la tarea");
      onTaskDeleted();
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  return (
    <View style={stylesToDoCard.container}>
      <TouchableOpacity onPress={onPseudoRadioPress}>
        <View style={stylesToDoCard.radioContainer}>
          <View style={stylesToDoCard.pseudoRadio}></View>
        </View>
      </TouchableOpacity>
      <Link
        asChild
        href={{
          pathname: "./viewtodo",
          params: { id: information.id },
        }}
      >
        <TouchableOpacity style={stylesToDoCard.color}>
          <View style={stylesToDoCard.containerTextName}>
            <Text
              style={
                isChecked ? stylesToDoCard.textMarket : stylesToDoCard.text
              }
            >
              {information.name}
            </Text>
          </View>
          <View style={stylesToDoCard.containerTextDescription}>
            <Text style={stylesToDoCard.textDescription}>
              {information.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const stylesToDoCard = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
    borderColor: "#ff903b",
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    width: width - 40,
    overflow: "hidden",
  },
  text: { fontSize: 17 },
  textMarket: {
    opacity: 0.2,
    textDecorationLine: "line-through",
    fontSize: 17,
  },

  radioContainer: {
    backgroundColor: "#ff903b",
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pseudoRadio: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000",
    margin: 3,
  },
  containerTextName: {
    padding: 7,
  },
  textDescription: {
    opacity: 0.6,
    fontSize: 12,
    lineHeight: 16,
    flexWrap: "wrap",
    overflow: "visible",
  },
  containerTextDescription: {
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 7,
    width: width - 90,
  },
  color: {},
});

//===============================================================

export default function Todo() {
  const { Routes, setRoutes } = useRoutes();
  const route = useRoute();

  const [rows, setRows] = useState([]);

  useFocusEffect(
    useCallback(() => {
      if (Routes.length === 0) {
        setRoutes(["todo", "todo"]);
      } else {
        const newRoutes = ["todo", Routes[0]];
        setRoutes(newRoutes);
      }
    }, [route.name])
  );

  const loadTodos = useCallback(async () => {
    await setupDatabase();
    const fetchedRows = await readTodos();
    setRows(fetchedRows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodos();
    }, [loadTodos])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.container}>
        {Array.isArray(rows) && rows.length > 0 ? (
          <FlatList
            data={rows}
            renderItem={({ item }) => (
              <ToDoCard
                key={item.id}
                information={{
                  id: item.id,
                  name: item.name,
                  description: item.description,
                }}
                onTaskDeleted={loadTodos}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text>No hay Tareas</Text>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
