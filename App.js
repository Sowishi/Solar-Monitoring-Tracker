import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Energy from "./screens/Energy";
import Main from "./screens/Main";
import Settings from "./screens/Settings";
import { SimpleLineIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

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
            } else if (route.name === "Settings") {
              icon = "settings";
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
            position: "absolute",
            bottom: 13,
            marginHorizontal: 10,
            borderRadius: 10,
          },
          tabBarActiveTintColor: "#6AD0F5",
        })}
      >
        <Tab.Screen name="Energy" component={Energy}></Tab.Screen>
        <Tab.Screen name="Home" component={Main}></Tab.Screen>
        <Tab.Screen name="Settings" component={Settings}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return <MyTabs />;
}
