import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Logout from "../component/Logout";
import Booking from "../screens/booking";
import Maps from "../screens/maps";
import ExtraStack from "./extraStack";
import History from "../screens/history";
const Tab = createBottomTabNavigator();

export default function MyMainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home" // tab yang pertama kali di load
      screenOptions={{
        tabBarActiveTintColor: "#F6F8FF",
        tabBarActiveBackgroundColor: "#5142AA",
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="history" // Replace with the actual icon name you choose
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Booking"
        component={ExtraStack}
        options={{
          tabBarLabel: "Booking",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="wallet-plus"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
