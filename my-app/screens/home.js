import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { gql, useQuery } from "@apollo/client";

const windowWidth = Dimensions.get("window").width;

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

const Home = () => {
  const { data } = useQuery(GET_NAME);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.cardContainer}>
            <View style={styles.header}>
              <Image
                style={styles.logo}
                source={require("../assets/logo.png")}
              />
              <View style={styles.userInfo}>
                <Text style={styles.greeting}>Selamat datang,</Text>
                <Text style={styles.username}>
                  {(data?.getUserByID?.name || "").toUpperCase()}
                </Text>
              </View>
            </View>
            {/* <Text style={styles.sectionTitle}>Transaksi terakhir</Text>
            <View
              style={{
                borderWidth: 1,
                // marginBottom: 16,
                borderRadius: 10,
                padding: 10,
                borderColor: "#ccc",
                backgroundColor: "#F6F8FF", // Set background color to white
              }}
            >
              <View style={styles.transactionContainer}>
                <Text style={styles.shopName}>
                  Tjoekoer Bawah Pohon Barbershop Embong Cerme
                </Text>
                <Image
                  style={styles.transactionImage}
                  source={{
                    uri: "https://asset.kompas.com/crops/cIsSH_ZOT8-0jM_jPWeR1aX6fsc=/0x1:741x495/1200x800/data/photo/2022/09/06/6316aab0cfbf9.jpg",
                  }}
                />
              </View>
            </View> */}
            <Text style={styles.sectionTitle}>Hanya untuk Anda</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
            >
              <Image
                style={styles.recommendedImage}
                source={{
                  uri: "https://www.persebayastore.com/cdn/shop/articles/voucher_coolio_persebaya_900x.jpg?v=1550740943",
                }}
              />
              <Image
                style={styles.recommendedImage}
                source={{
                  uri: "https://bankmega.com/media/filer_public/d2/a1/d2a1f54f-e875-47a8-b1ab-5871e94fb82a/bm_asset_-_dpax_bmnew.jpg",
                }}
              />
              <Image
                style={styles.recommendedImage}
                source={{
                  uri: "https://asset-2.tstatic.net/jabar/foto/bank/images/sambut-hut-ke-75-ri-barber-shop-milik-kim-kurniawan-gelar-promo-potong-rambut.jpg",
                }}
              />
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FF", // Use a background color or gradient
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  cardContainer: {
    width: windowWidth * 0.95,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 20,
  },
  greeting: {
    fontSize: 16,
    color: "#333",
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  logo: {
    height: 150,
    width: 100,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#333",
  },
  transactionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  shopName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  transactionImage: {
    height: 150,
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    flexDirection: "row",
  },
  recommendedImage: {
    height: 200,
    width: 300,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default Home;
