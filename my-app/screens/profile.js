import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_NAME = gql`
  query GetUserByID {
    getUserByID {
      _id
      name
      username
      email
      password
    }
  }
`;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Profile({ navigation }) {
  const authContext = useContext(AuthContext);
  const { data } = useQuery(GET_NAME);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={styles.container}>
              <MaterialCommunityIcons
                style={{
                  borderRadius: 100,
                  backgroundColor: "#5142AA",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                name="account"
                size={50}
                color={"white"}
              />
            </View>
            <View style={{ ...styles.container }}>
              <Text style={styles.username}>
                {(data?.getUserByID?.name || "").toUpperCase()}
              </Text>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "row", gap: 2 }}>
            {/* <Text>AI Rekomendasi Gaya Rambut</Text> */}
          </View>

          <TouchableOpacity onPress={() => authContext.setIsSignedIn(false)}>
            <View style={styles.buttonLogout}>
              <Text style={{ color: "white" }}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonLogout: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 10,
    height: 45,
    width: windowWidth / 1.1,
    marginBottom: 25,
  },
  logo: {
    height: 150,
    width: 150,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
