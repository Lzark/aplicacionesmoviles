import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Dimensions,
} from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

export function ToDoCard({ information }) {
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  const showToast = () => {
    ToastAndroid.show(
      "Has creado una tarea",
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  const onDescriptionPress = () => {};
  const onPseudoRadioPress = () => {
    navigation.navigate("viewtodo", {
      data: { name: information.name, description: information.description },
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPseudoRadioPress}>
        <View style={styles.radioContainer}>
          <View style={styles.pseudoRadio}></View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDescriptionPress} style={styles.color}>
        <View style={styles.containerTextName}>
          <Text style={isChecked ? styles.textMarket : styles.text}>
            {information.name}
          </Text>
        </View>
        <View style={styles.containerTextDescription}>
          <Text style={styles.textDescription}>{information.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    margin: 10,
    borderRadius: 8,
    borderColor: "#000",
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
    backgroundColor: "#ff9197",
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
