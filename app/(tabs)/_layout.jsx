import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
const _layout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs screenOptions={{ headerShown: false }}>
        <StatusBar style="light" />
        <Tabs.Screen
          name="index"
          options={{
            title: "Recipes",
            tabBarIcon: ({ color }) => (
              <Ionicons name="restaurant" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <Ionicons name="search" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Favorite"
          options={{
            title: "Favorite",
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default _layout;
