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

  const CustomTabBarButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity
        style={{ top: -30, justifyContent: "center", alignItems: "center" }}
        onPress={onPress}
      >
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#FFCB77",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };

  function MyTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            // padding: 20,
            paddingTop: 25,
            position: "absolute",
            bottom: 15,
            left: 15,
            right: 15,
            elevation: 0,
            backgroundColor: "#faf",
            borderRadius: 10,
            height: "auto",
          },
        }}
      >
        <Tab.Screen
          name="Daylies"
          component={Daylies}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  // justifyContent: "center",
                  // margin: 10,
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={32}
                  color={focused ? "green" : "gray"}
                />
                <Text
                  style={{ fontSize: 20, color: focused ? "green" : "gray" }}
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
            tabBarIcon: ({ focused }) => {
              return <Ionicons name="add-outline" size={60} color="white" />;
            },
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        ></Tab.Screen>

        <Tab.Screen
          name="To Do's"
          component={ToDos}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  // margin: 10,
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={32}
                  color={focused ? "green" : "gray"}
                />
                <Text
                  style={{ fontSize: 20, color: focused ? "green" : "gray" }}
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
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
