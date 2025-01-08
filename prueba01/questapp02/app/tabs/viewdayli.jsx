import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  SafeAreaView,
  Button,
} from "react-native";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  setupDatabase,
  readTodos,
  addTodo,
  addDayli,
  getDayliById,
  updateDayliById,
  deleteDayliyId,
} from "../../database";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { useRoutes } from "../../contexts/GlobalContexts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function viewdayli() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [inputHeight, setInputHeight] = useState(40);

  const [rows, setRows] = useState("");
  const params = useLocalSearchParams();
  const { id } = params;

  const navigation = useNavigation();

  const [showPicker, setShowPicker] = useState(false);

  // const [date, setDate] = useState(new Date(1598051730000));

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const [date, setDate] = useState(new Date());
  const toggleMonday = () => {
    setMonday((prev) => !prev);
  };
  const toggleTuesday = () => {
    setTuesday((prev) => !prev);
  };
  const toggleWednesday = () => {
    setWednesday((prev) => !prev);
  };
  const toggleThursday = () => {
    setThursday((prev) => !prev);
  };
  const toggleFriday = () => {
    setFriday((prev) => !prev);
  };
  const toggleSaturday = () => {
    setSaturday((prev) => !prev);
  };
  const toggleSunday = () => {
    setSunday((prev) => !prev);
  };

  async function agregarDayli() {
    setDays({
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
    });

    if (name && description && hour && minute) {
      try {
        await addDayli(name, description, hour, minute, days);
        setName("");
        setDescription("");

        showToast("Creado con exito");
      } catch (error) {
        console.error("Error al insertar tarea: ", error);
        showToast("ERROR");
      }
    } else {
      Alert.alert("Ingrese todos los datos");
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function initializeDatabase() {
        await setupDatabase();
        const fetchedRows = await getDayliById(params.id);
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

      // Inicializar la fecha con hour y minute de la base de datos
      if (rows.hour !== undefined && rows.minute !== undefined) {
        const currentDate = new Date();
        currentDate.setHours(rows.hour);
        currentDate.setMinutes(rows.minute);
        setDate(currentDate);
      }
    }
  }, [rows]);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
  };

  const modificarDayli = async () => {
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (name && description) {
      try {
        await updateDayliById(params.id, name, description, hour, minute);
        setName("");
        setDescription("");
        ToastAndroid.show("Modificado con éxito", ToastAndroid.SHORT);
        navigation.goBack();
      } catch (error) {
        console.error("Error al modificar tarea: ", error);
        ToastAndroid.show("Error", ToastAndroid.SHORT);
      }
    } else {
      Alert.alert("Ingrese todos los datos");
    }
  };

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
  const eliminarDayli = async () => {
    try {
      await deleteDayliyId(params.id);
      setName("");
      setDescription("");
      ToastAndroid.show("Se ha eliminado con éxito", ToastAndroid.SHORT);
      navigation.goBack();
    } catch (error) {
      console.error("Error al eliminar la tarea: ", error);
      ToastAndroid.show("Error", ToastAndroid.SHORT);
    }
  };

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  };
  return (
    <View>
      <View style={styles.containerButtonDelete}>
        <TouchableOpacity onPress={eliminarDayli} style={styles.deleteButton}>
          {/* <Text style={styles.textDeleteButton}>Borrar</Text> */}
          <Ionicons name="trash-outline" size={25} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Nombre del habito"
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
        placeholder="Descripcion del habito"
        style={[styles.input, { height: Math.max(40, inputHeight) }]}
        onContentSizeChange={(event) =>
          setInputHeight(event.nativeEvent.contentSize.height)
        }
      />
      {/* <Text>{rows.hour}</Text>
      <Text>{rows.minute}</Text> */}
      <SafeAreaView>
        <View style={styles.containerButton}>
          <TouchableOpacity
            onPress={() => setShowPicker(true)}
            style={styles.buttonTimePicker}
          >
            <Text style={styles.textTimePicker}>Seleccionar Recordatorio</Text>
          </TouchableOpacity>
        </View>
        {showPicker && (
          <DateTimePicker
            mode="time"
            is24Hour={true}
            value={date}
            onChange={handleDateChange}
          />
        )}
        <Text style={styles.textTime}>
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </SafeAreaView>
      <View>
        <Text style={styles.textContainerButtonDay}>
          Seleccione los dias a repetir
        </Text>
        <View style={styles.containerButtonDay}>
          <TouchableOpacity
            style={monday ? styles.buttonDayActive : styles.buttonDayDisabled}
            onPress={toggleMonday}
          >
            <Text style={styles.textButtonDay}>L</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tuesday ? styles.buttonDayActive : styles.buttonDayDisabled}
            onPress={toggleTuesday}
          >
            <Text style={styles.textButtonDay}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={
              wednesday ? styles.buttonDayActive : styles.buttonDayDisabled
            }
            onPress={toggleWednesday}
          >
            <Text style={styles.textButtonDay}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={thursday ? styles.buttonDayActive : styles.buttonDayDisabled}
            onPress={toggleThursday}
          >
            <Text style={styles.textButtonDay}>J</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={friday ? styles.buttonDayActive : styles.buttonDayDisabled}
            onPress={toggleFriday}
          >
            <Text style={styles.textButtonDay}>V</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={saturday ? styles.buttonDayActive : styles.buttonDayDisabled}
            onPress={toggleSaturday}
          >
            <Text style={styles.textButtonDay}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={sunday ? styles.buttonDayActive : styles.buttonDayDisabled}
            onPress={toggleSunday}
          >
            <Text style={styles.textButtonDay}>D</Text>
          </TouchableOpacity>
        </View>
      </View>
      ;
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={modificarDayli}>
          <Text style={styles.textButton}>Modificar Habito</Text>
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
  buttonTimePicker: {
    backgroundColor: "#007bff",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20,
  },
  textTimePicker: {
    color: "#fff",
    fontSize: 15,
  },
  textTime: {
    fontSize: 22,
    textAlign: "center",
    marginVertical: 10,
  },
  buttonDayActive: {
    borderRadius: 20,
    borderColor: "#000",
    backgroundColor: "#007bff",
    marginVertical: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDayDisabled: {
    borderRadius: 20,
    borderColor: "#000",
    backgroundColor: "#fff",
    marginVertical: 20,
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  textButtonDay: {
    fontSize: 15,
    color: "#000",
  },
  containerButtonDay: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  textContainerButtonDay: {
    fontSize: 18,
    textAlign: "left",
    marginTop: 10,
    marginHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: "#ff3838",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 45,
    height: 45,
    margin: 10,
  },
  textDeleteButton: { color: "#fff" },
  containerButtonDelete: {
    alignItems: "flex-end",
  },
});
