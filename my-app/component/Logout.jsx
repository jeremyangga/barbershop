import * as SecureStore from "expo-secure-store";

import { Button, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
export default function Logout() {
  const authContext = useContext(AuthContext);
  return (
    <>
      <Button
        title="Logout"
        onPress={() => {
          authContext.setIsSignedIn(false);
        }}
      ></Button>
    </>
  );
}
