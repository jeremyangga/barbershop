import React from "react";
import { View, Text, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { WebView } from "react-native-webview";

import { useNavigation } from "@react-navigation/native";

const Paid = ({ route }) => {
  const { invoiceId } = route.params;
  const navigation = useNavigation();
  const handleOnSuccess = (result) => {
    if (result.canGoBack && result.url.includes("backtohome")) {
      navigation.navigate("Home");
    }
  };
  return (
    <View style={{ flex: 1, paddingBottom: 0 }}>
      {/* <Text style={styles.title}>Payment QR Code</Text>
      <Text style={styles.subtitle}>Invoice ID: {invoiceId}</Text>
      <QRCode
        value={`Payment for Invoice ID: ${invoiceId}`}
        size={200}
        color="black"
        backgroundColor="white"
      /> */}
      <WebView
        source={{
          uri:
            `https://ee2b-103-165-209-194.ngrok-free.app/?order_id=${invoiceId}&status_code=200&transaction_status=capture` ||
            "",
        }}
        // onLoad={() => setLoading(false)}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        cacheEnabled={true}
        allowFileAccessFromFileURLs={true}
        allowFileAccess={true}
        cacheMode="LOAD_NO_CACHE"
        onNavigationStateChange={handleOnSuccess}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F8FF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    color: "#666",
  },
});

export default Paid;
