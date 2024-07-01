import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CardBarber({ barberId, alamat, image, name }) {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View
        style={{
          width: windowWidth / 1.05,
          borderWidth: 1,
          marginBottom: 16,
          borderRadius: 10,
          padding: 10,
          borderColor: "#ccc",
          backgroundColor: "#F6F8FF", // Set background color to white
        }}
      >
        <View
          style={{
            flex: 1,
            marginBottom: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            {name}
          </Text>
        </View>
        <View style={{ flex: 4, marginBottom: 10 }}>
          <Image
            style={{
              height: 200,
              borderRadius: 10,
            }}
            source={{
              uri: `${image}`,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold" }}>{alamat}</Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              height: 45,
              width: 80,
              backgroundColor: "#5142AA",
              marginTop: 10,
            }}
            onPress={() => {
              console.log("Detail di click");
              navigation.navigate("DetailBarber", {
                barberId,
              });
            }}
          >
            <Text style={{ color: "white" }}>Detail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
