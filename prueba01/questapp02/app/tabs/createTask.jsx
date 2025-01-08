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
import React, { createContext, useContext, useState, useEffect } from "react";
import { setupDatabase, readTodos, addTodo, addDayli } from "../../database";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { useRoutes } from "../../contexts/GlobalContexts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
export default function CreateTask() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [days, setDays] = useState([]);

  const [inputHeight, setInputHeight] = useState(40);
  const { Routes, setRoutes } = useRoutes();
  const [showPicker, setShowPicker] = useState(false);

  const [date, setDate] = useState(new Date(1598051730000));

  const showToast = (text) => {
    ToastAndroid.show(text, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
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
  }

  const handleDateChange = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      // Extraer horas y minutos del objeto Date
      const selectedHour = currentDate.getHours();
      const selectedMinute = currentDate.getMinutes();

      // Actualizar los estados
      setHour(selectedHour);
      setMinute(selectedMinute);

      console.log(`Hora seleccionada: ${selectedHour}:${selectedMinute}`);
    }
    setShowPicker(false);
  };

  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

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
  const [dateCreate, setDateCreate] = useState(new Date());
  const setManualTime = () => {
    const manualDate = new Date();
    manualDate.setHours(19);
    manualDate.setMinutes(33);
    setDateCreate(manualDate);
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
    //     monday
    // tuesday
    // wednesday
    // thursday
    // friday
    // saturday
    // sunday
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

  if (Routes[0] == "dayli") {
    return (
      <View>
        {/* <Button title="Set Manual Time (15:30)" onPress={setManualTime} /> */}
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
        <SafeAreaView>
          <View style={styles.containerButton}>
            <TouchableOpacity
              onPress={() => {
                setShowPicker(true);
              }}
              style={styles.buttonTimePicker}
            >
              <Text style={styles.textTimePicker}>
                Seleccionar Recordatorio
              </Text>
            </TouchableOpacity>
          </View>
          {showPicker && (
            <DateTimePicker
              mode={"time"}
              is24Hour={false}
              // value={date || new Date()}
              value={dateCreate}
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.textTime}>
            {date.toLocaleString().slice(10, 15) +
              " " +
              date.toLocaleString().slice(18, 24)}
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
              style={
                tuesday ? styles.buttonDayActive : styles.buttonDayDisabled
              }
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
              style={
                thursday ? styles.buttonDayActive : styles.buttonDayDisabled
              }
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
              style={
                saturday ? styles.buttonDayActive : styles.buttonDayDisabled
              }
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
          <TouchableOpacity style={styles.button} onPress={agregarDayli}>
            <Text style={styles.textButton}>Crear Tarea</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.titleToDo}>Crear Tarea</Text>
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
          <TouchableOpacity style={styles.button} onPress={agregarTodo}>
            <Text style={styles.textButton}>Crear Tarea</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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
});
