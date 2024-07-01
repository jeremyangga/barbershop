import { View, Button } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Midtrans({ route, navigation }) {
  const { invoiceId, price, name } = route.params;
  const [url, setUrl] = useState("");
  const checkPayment = async () => {
    try {
      const { data } = await axios.post("http://93.127.217.205:3000/payment", {
        invoiceId: invoiceId,
        price: price,
        name: name,
      });
      console.log(data);
      setUrl(data.redirect_url);
      // if (true) {
      //   navigation.navigate("Success");
      // }
    } catch (error) {
      console.log(error, "<<<");
    }
  };
  useEffect(() => {
    checkPayment();
    console.log(invoiceId, "<--invoiceId", price, "<-- price");
  }, []);

  const handleOnSuccess = (result) => {
    if (result.canGoBack && result.url.includes("backtohome")) {
      navigation.navigate("Home");
    }
  };
  //   const { url } = route.params;
  return (
    <View style={{ flex: 1, paddingBottom: 100 }}>
      <WebView
        source={{ uri: url || "" }}
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
      {/* <Button title="check payment" onPress={checkPayment} /> */}
    </View>
  );
}
