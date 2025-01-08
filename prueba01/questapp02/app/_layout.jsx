import { Drawer } from "expo-router/drawer";
export default function RootLayout() {
  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen
        name="tabs"
        options={{
          drawerLabel: "Tareas",
          title: "Tareas",
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          headerShown: true,
        }}
      />
    </Drawer>
  );
}
