import { useContext, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import MyMainTabs from "./mainTabsNav";
import { AuthContext } from "../context/AuthContext";
import { getValueFor } from "../helpers/secureStore";
import Invoice from "../screens/invoice";
import DetailBarber from "../screens/detailBarber";

import Midtrans from "../screens/midtrans";

import Paid from "../screens/paid";


const Stack = createNativeStackNavigator();

export default function MainStack() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    getValueFor("access_token").then((result) => {
      if (result) {
        authContext.setIsSignedIn(false);
      }
    });
  }, []);
  return (
    <>
      {authContext.isSignedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MyMainTabs}
            options={{ headerShown: false }} // Hide the header for the tab navigator
          />
          <Stack.Screen
            name="Invoice"
            component={Invoice}
            options={{ title: "Invoice" }} // Customize the title as needed
          />
          <Stack.Screen name="DetailBarber" component={DetailBarber} />
          <Stack.Screen 
            name="Midtrans"
            component={Midtrans} />
          <Stack.Screen name="Paid" component={Paid} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Login", headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ title: "Register", headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}
