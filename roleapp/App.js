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
import * as SQLite from "expo-sqlite";
import { useEffect } from "react";
export default function App() {
  const Tab = createBottomTabNavigator();

  const CustomTabBarButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity style={styles.tabBarButton} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  };

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tab.Screen
          name="Daylies"
          component={Daylies}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconContainer}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={focused ? "green" : "gray"}
                />
                <Text
                  style={{ fontSize: 14, color: focused ? "green" : "gray" }}
                >
                  Dayli
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Create"
          component={CreateTask}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.createTabIconContainer}>
                <Ionicons name="add-outline" size={35} color="white" />
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />

        <Tab.Screen
          name="To Do's"
          component={ToDos}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconContainer}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={focused ? "green" : "gray"}
                />
                <Text
                  style={[
                    styles.tabBarText,
                    { color: focused ? "green" : "gray" },
                  ]}
                >
                  ToDo's
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={MyTabs} />
        <Drawer.Screen name="Statistics" component={Statistics} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 15,
    backgroundColor: "#faf",
    borderRadius: 10,
    height: 70,
  },
  tabBarButton: {
    top: -30,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBarIconContainer: {
    alignItems: "center",
    width: 70,
  },
  createTabIconContainer: {
    alignItems: "center",
    width: 70,
    backgroundColor: "#e32f45",
    borderRadius: 40,
    height: 70,
    justifyContent: "center",
  },
  tabBarText: {
    fontSize: 14,
    marginTop: 5,
  },
});
