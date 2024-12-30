import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
export function DayliTask({ children, onPress }) {
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
        <Text style={isChecked ? styles.textMarket : undefined}>
          {children}
        </Text>
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
  },
  textMarket: {
    opacity: 0.2,
    textDecorationLine: "line-through",
  },
});
