import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
// import { Link } from "expo-router";
export function DayliCard({ children, onPress }) {
  const [isChecked, setChecked] = useState(false);
  // const onButtonPress = () => {}; onPress={onButtonPress}
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#c7c7c7" : undefined}
        />
        <View style={styles.containerText}>
          <Text style={isChecked ? styles.textMarket : styles.text}>
            {children}
          </Text>

          <Text style={styles.textDescription}>Descripcion</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    margin: 10,
    padding: 5,
    borderRadius: 8,
    borderColor: "#000",

    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
    width: 25,
    height: 25,
  },
  text: {
    fontSize: 17,
  },
  //No es necesario usar esto porque se va a borrar el elemento
  textMarket: {
    opacity: 0.2,
    textDecorationLine: "line-through",
    fontSize: 17,
  },
  textDescription: {
    opacity: 0.6,
  },
});
