import "react-native-get-random-values";
import { nanoid } from "nanoid";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { MY_HISTORY } from "./history";
import { useNavigation } from "@react-navigation/native";
const SAVE_INV = gql`
  mutation Mutation($invoiceSave: Invoice) {
    saveInvoice(invoiceSave: $invoiceSave) {
      invoice
      date
      price
      queue
      userID
    }
  }
`;

export default function Invoice({ route }) {
  const navigation = useNavigation();
  let dateNew = new Date();
  dateNew = dateNew.toISOString().substring(0, 10);
  const random = "INV-" + nanoid();
  const { data } = route.params;
  const [invoiceData, setInvoiceData] = useState({
    invoice: random,
    queue: data.queue,
    name: data.name,
    date: dateNew,
    price: data.price,
  });

  // console.log(data, "<-----------------invoice");
  // console.log(random, "<-----------");
  const [saveInv, { data2, loading, error }] = useMutation(SAVE_INV, {
    refetchQueries: [MY_HISTORY],
  });
  console.log(invoiceData);

  const handleInvoice = async () => {
    try {
      const invoiceSave = {
        invoice: invoiceData.invoice,
        queue: invoiceData.queue,
        name: invoiceData.name,
        date: dateNew,
        price: invoiceData.price,
        status: "paid",
      };
      const result = await saveInv({ variables: { invoiceSave } });
      // navigation.navigate("History");
      // console.log(result);
      navigation.navigate("Midtrans", {
        invoiceId: random,
        price: invoiceSave.price,
        name: invoiceSave.name,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(nanoid(),'<--nanoid');
    setInvoiceData({
      invoice: random,
      queue: data.queue,
      name: data.name,
      date: dateNew,
      price: data.price,
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice</Text>
      <View style={styles.invoiceDetails}>
        <Text style={styles.invoiceText}>Invoice Number:</Text>
        <Text style={styles.invoiceValue}>{random}</Text>

        <Text style={styles.invoiceText}>Queue Number:</Text>
        <Text style={styles.invoiceValue}>{data.queue}</Text>

        <Text style={styles.invoiceText}>Customer Name:</Text>
        <Text style={styles.invoiceValue}>{data.name}</Text>

        <Text style={styles.invoiceText}>Date:</Text>
        <Text style={styles.invoiceValue}>{dateNew}</Text>

        <Text style={styles.invoiceText}>Price:</Text>
        <Text style={styles.invoiceValue}>{data.price}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleInvoice}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F8FF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#5142AA",
  },
  invoiceDetails: {
    marginBottom: 16,
  },
  invoiceText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  invoiceValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#5142AA",
  },
  button: {
    backgroundColor: "#5142AA",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
