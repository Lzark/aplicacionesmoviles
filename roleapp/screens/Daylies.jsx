import { Text, View, Alert, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function Daylies({ navigation }) {
  const onButtonPress = () => {
    Alert.alert("Mensaje", "El boton ha sido presionado");
  };
  return (
    <View style={styles.container}>
      <Text>Daylies</Text>
      <TouchableOpacity style={styles.floatingButton} onPress={onButtonPress}>
        <Ionicons name="add-circle" size={70} color="black" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  floatingButton: {
    position: "absolute",
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    right: 30,
    bottom: 30,
  },
});
