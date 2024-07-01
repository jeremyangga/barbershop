import React, { useContext } from "react";
import { StyleSheet, View, Dimensions, FlatList, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import CardBarber from "../component/cardBarber";
import { gql, useQuery } from "@apollo/client";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const GET_BARBERS = gql`
  query Query {
    getBarbershop {
      _id
      alamat
      image
      name
    }
  }
`;
export default function Booking({ navigation }) {
  const authContext = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_BARBERS);

  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}` </Text>;

  const renderItem = ({ item }) => (
    <CardBarber
      barberId={item._id}
      alamat={item.alamat}
      image={item.image}
      name={item.name}
      navigation={navigation}
    />
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data.getBarbershop}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white", // Use a background color or gradient
    alignItems: "center",
    justifyContent: "center",
  },
});
