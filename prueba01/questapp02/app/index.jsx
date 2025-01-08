import { StyleSheet, Text, View } from "react-native";
import { Redirect } from "expo-router";
export default function DayliPage() {
  return (
    // <View>
    //   <Text>Index</Text>
    // </View>
    <Redirect href="/tabs" />
  );
}
