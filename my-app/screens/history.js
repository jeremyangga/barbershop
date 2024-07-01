import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
export const MY_HISTORY = gql`
  query GetHistory {
    getHistory {
      _id
      invoice
      name
      date
      price
      queue
      userID
      orderBy
      status
    }
  }
`;

const History = () => {
  const { loading, error, data } = useQuery(MY_HISTORY);
  const navigation = useNavigation();
  const handleItemPress = (item) => {
    // Navigate to the "Paid" page or any other page you desire
    navigation.navigate("Paid", { invoiceId: item._id });
  };

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <Text style={{ ...styles.cardText, fontWeight: "bold" }}>
        {item.invoice}
      </Text>
      <Text style={styles.cardText}>{item.name}</Text>
      <Text style={styles.cardText}>Order By: {item.orderBy}</Text>
      <Text style={styles.cardText}>Antrian: {item.queue}</Text>
      <Text style={styles.cardText}>Tanggal: {item.date}</Text>
      <Text style={styles.cardText}>
        Price:{" "}
        {Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(item.price)}
      </Text>
      <Text style={styles.cardText}>Status: {item.status}</Text>
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          height: 45,
          width: "50%",
          backgroundColor: "#5142AA",
        }}
        onPress={() => handleItemPress(item)}
      >
        <Text style={{ ...styles.buttonText, color: "white" }}>Show QR</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}> History</Text>
      <FlatList
        data={data.getHistory}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F6F8FF", // Use a background color or gradient
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  cardContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    padding: 16,
    marginBottom: 16,
    backgroundColor: "white", // Set background color to white
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default History;
