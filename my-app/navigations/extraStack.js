import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Booking from "../screens/booking";
import DetailBarber from "../screens/detailBarber";

const Stack = createNativeStackNavigator();

export default function ExtraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ExtraStack"
        component={Booking}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
