import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import globalStyles from "../../globalStyles";
import { useRoutes } from "../../contexts/GlobalContexts";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Route } from "expo-router/build/Route";
import { useNavigation } from "@react-navigation/native";
import { Link } from "expo-router";
import {
  setupDatabase,
  readDayli,
  addTodo,
  deleteToDoById,
  updateStateDayliById,
} from "../../database";
import Checkbox from "expo-checkbox";

const { width } = Dimensions.get("window");

function DayliCard({ information, onTaskDeleted }) {
  const [checked, setChecked] = useState(information.state);

  const navigation = useNavigation();

  const onPseudoRadioPress = async () => {
    // try {
    //   // await deleteToDoById(information.id);
    //   showToast("Se eliminó correctamente la tarea");
    //   onTaskDeleted();
    // } catch (error) {
    //   console.error("Error al eliminar la tarea:", error);
    // }
  };
  //usar efectos con el isChecked comprobando
  useEffect(() => {
    const updateState = async () => {
      console.log(checked);
      try {
        if (checked) {
          await updateStateDayliById(information.id, 1);
        } else {
          await updateStateDayliById(information.id, 0);
        }
      } catch (error) {
        console.error("Error al actualizar el estado:", error);
      }
    };
    updateState();
  }, [checked]);
  return (
    <View style={stylesToDoCard.container}>
      <TouchableOpacity onPress={onPseudoRadioPress}>
        <View style={stylesToDoCard.radioContainer}>
          <Checkbox
            style={styles.checkbox}
            value={checked}
            onValueChange={setChecked}
            color={checked ? "#4630EB" : undefined}
          />
        </View>
      </TouchableOpacity>
      <Link
        asChild
        href={{
          pathname: "/tabs/viewdayli",
          params: { id: information.id },
        }}
      >
        <TouchableOpacity style={stylesToDoCard.color}>
          <View style={stylesToDoCard.containerTextName}>
            <Text
              style={checked ? stylesToDoCard.textMarket : stylesToDoCard.text}
            >
              {information.name}
            </Text>
          </View>
          <View style={stylesToDoCard.containerTextDescription}>
            <Text
              style={
                checked
                  ? stylesToDoCard.textDescriptionMarket
                  : stylesToDoCard.textDescription
              }
            >
              {information.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export default function Daylies() {
  // Cosas para el estado global
  const { Routes, setRoutes } = useRoutes();
  const route = useRoute();
  useFocusEffect(
    React.useCallback(() => {
      if (Routes.length === 0) {
        setRoutes(["dayli", "dayli"]);
      } else {
        const newRoutes = ["dayli", Routes[0]];
        setRoutes(newRoutes);
      }
    }, [route.name])
  );
  //- - - - - - - - -

  const [rows, setRows] = useState([]);

  const loadDayli = useCallback(async () => {
    await setupDatabase();
    const fetchedRows = await readDayli();
    setRows(fetchedRows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDayli();
    }, [loadDayli])
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.container}>
        {Array.isArray(rows) && rows.length > 0 ? (
          <FlatList
            data={rows}
            renderItem={({ item }) => (
              <DayliCard
                key={item.id}
                information={{
                  id: item.id,
                  name: item.name,
                  description: item.description,
                  state: item.state,
                }}
                onTaskDeleted={loadDayli}
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
const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
    width: 30,
    height: 30,
  },
});
const stylesToDoCard = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
    borderColor: "#ffc43b",
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
  textDescriptionMarket: {
    opacity: 0.2,
    textDecorationLine: "line-through",
    fontSize: 12,
  },
  textDescription: {
    opacity: 0.6,
    fontSize: 12,
    lineHeight: 16,
    flexWrap: "wrap",
    overflow: "visible",
  },

  radioContainer: {
    backgroundColor: "#ffc43b",
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pseudoRadio: {
    // backgroundColor: "blue",
    width: 26,
    height: 26,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#ffc43b",
    margin: 3,
  },
  containerTextName: {
    padding: 7,
  },

  containerTextDescription: {
    flex: 1,
    paddingVertical: 0,
    paddingLeft: 7,
    width: width - 90,
  },
  color: {},
});
