import { Tabs } from "expo-router";
import { StyleSheet, Text, View, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStateProvider } from "../../contexts/GlobalContexts";
export default function TabsLayout() {
  const CustomTabBarButton = ({ children, onPress }) => {
    return (
      <TouchableOpacity style={styles.tabBarButton} onPress={onPress}>
        {children}
      </TouchableOpacity>
    );
  };
  return (
    <GlobalStateProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconContainer}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={25}
                  color={focused ? "#ffffff" : "#ffd269"}
                />
                <Text
                  style={{
                    fontSize: 14,
                    color: focused ? "#ffffff" : "#ffd269",
                  }}
                >
                  Dayli
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="createTask"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.createTabIconContainer}>
                <Ionicons name="add-outline" size={35} color="white" />
              </View>
            ),
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tabs.Screen
          name="todo"
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarIconContainer}>
                <Ionicons
                  name="clipboard-outline"
                  size={25}
                  color={focused ? "#ffffff" : "#ffd269"}
                />
                <Text
                  style={[
                    styles.tabBarText,
                    { color: focused ? "#ffffff" : "#ffd269" },
                  ]}
                >
                  ToDo's
                </Text>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="viewtodo"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="viewdayli"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </GlobalStateProvider>
  );
}
const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 15,
    backgroundColor: "#ffb300",
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
    backgroundColor: "#f5061d",
    borderRadius: 40,
    height: 70,
    justifyContent: "center",
  },
  tabBarText: {
    fontSize: 14,
    marginTop: 5,
  },
});
