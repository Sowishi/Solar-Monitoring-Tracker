import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";
import Energy from "./screens/Energy";
import Main from "./screens/Main";
import About from "./screens/About";
import { SimpleLineIcons } from "@expo/vector-icons";
import Battery from "./screens/Battery";

const Tab = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

function TopTab() {
  return (
    <Top.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: "#6AD0F5",
      }}
      style={{ marginTop: Constants.statusBarHeight }}
    >
      <Tab.Screen name="solar" component={Energy} />
      <Tab.Screen name="battery" component={Battery} />
    </Top.Navigator>
  );
}

function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const routeName = route.name;
            let icon;

            if (routeName === "Home") {
              icon = "home";
            } else if (route.name === "Energy") {
              icon = "energy";
            } else if (route.name === "About") {
              icon = "info";
            }
            return (
              <SimpleLineIcons
                name={icon}
                size={focused ? 28 : 24}
                color={focused ? "#6AD0F5" : "black"}
              />
            );
          },
          headerShown: false,
          tabBarStyle: {
            borderRadius: 10,
          },
          tabBarActiveTintColor: "#6AD0F5",
        })}
      >
        <Tab.Screen name="Energy" component={TopTab}></Tab.Screen>
        <Tab.Screen name="Home" component={Main}></Tab.Screen>
        <Tab.Screen name="About" component={About}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <MyTabs />
    </SafeAreaProvider>
  );
}
