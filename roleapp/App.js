import "./gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Daylies } from "./screens/Daylies";
import { ToDos } from "./screens/ToDos";
import { CreateTask } from "./screens/CreateTask";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Statistics } from "./screens/Statistics";

export default function App() {
  const Tab = createBottomTabNavigator();
  function MyTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Daylies" component={Daylies} />
        {/* <Tab.Screen name="Create" component={CreateTask} /> */}
        <Tab.Screen name="To Do's" component={ToDos} />
      </Tab.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();

  function SettingsDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Statistics" component={Statistics} />
        {/* <Drawer.Screen name="Account" component={AccountScreen} /> */}
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Hsome" component={Daylies} />
        <Tab.Screen name="Settings" component={ToDos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
