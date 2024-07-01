import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { Checkbox } from "react-native-paper";
import { gql, useMutation, useQuery } from "@apollo/client";

import * as Location from "expo-location";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { useNavigation } from "@react-navigation/native";

const GET_DETAIL = gql`
  query GetOne($idBarber: idBarber!) {
    getOne(IdBarber: $idBarber) {
      _id
      alamat
      image
      name
      queue
      services {
        service
        price
      }
      price
    }
  }
`;
const UPDATE_QUE = gql`
  mutation UpdateQueue($idBarber: idBarber!) {
    updateQueue(IdBarber: $idBarber) {
      _id
      alamat
      image
      name
      queue
    }
  }
`;
const SAVE_HISTORY = gql`
  mutation SaveHistory($historySave: HistorySave) {
    saveHistory(historySave: $historySave) {
      _id
      alamat
      image
      nama
      queue
      userID
    }
  }
`;
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function DetailBarber({ route }) {
  const navigation = useNavigation();

  const { barberId } = route.params;
  const [serviceChecked, setServiceChecked] = useState(
    Array(data?.getOne?.services.length).fill(false)
  );

  const handleCheckboxPress = (index) => {
    const updatedCheckedState = [...serviceChecked];
    updatedCheckedState[index] = !updatedCheckedState[index];
    setServiceChecked(updatedCheckedState);
  };
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: { idBarber: { _id: barberId } },
  });
  const [updateQ, { data2, loading2, error2 }] = useMutation(UPDATE_QUE, {
    variables: { idBarber: { _id: barberId } },
    refetchQueries: [GET_DETAIL],
  });
  // console.log(data);

  const authContext = useContext(AuthContext);

  const [userLocation, setUserLocation] = useState();
  const [userRegion, setUserRegion] = useState();
  const [addressBarber, setAddressBarber] = useState("");
  const mapRef = useRef(null);
  const GOOGLE_MAPS_APIKEY = "AIzaSyBSF9g5SY921IGFMssJnVjdh-CfSsKvlAw";
  const aspectRatio = windowWidth / windowHeight;
  const getPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync();
      setUserLocation(currentLocation);
      // console.log(currentLocation.coords, "<--");
      setUserRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0095,
        longitudeDelta: 0.009 * aspectRatio,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(userRegion, "<--userRegion");
  const getLocationBarber = async () => {
    try {
      if (!data?.getOne?.alamat) {
        return;
      }
      // console.log("address =>", data?.getOne?.alamat);
      const geocodedLocation = await Location.geocodeAsync(
        data?.getOne?.alamat
      );
      // console.log("Geocoded Address: ", geocodedLocation);
      const getGeocoded = geocodedLocation[0];
      // console.log(getGeocoded, "<--geocoded");
      setAddressBarber({
        latitude: getGeocoded.latitude,
        longitude: getGeocoded.longitude,
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPermission();
  }, []);
  useEffect(() => {
    getLocationBarber();
    // console.log('address barber')
  }, [data]);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.mapContainer}>
          <Marker
            pinColor="#fb2e01"
            coordinate={{
              latitude: addressBarber.latitude ? latitude: 0,
              longitude: addressBarber.longitude ? longitude: 0,
            }}
            description={data?.getOne?.name}
          ></Marker>
          <MapView
            style={styles.map}
            region={userRegion}
            showsUserLocation
            showsMyLocationButton
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
          >
            <MapViewDirections
              origin={userRegion}
              destination={addressBarber}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeColor="blue"
              strokeWidth={3}
            />
          </MapView>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.barberName}>{data?.getOne?.name}</Text>
          <View
            style={{
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#5142AA",
                borderRadius: 5,
                alignContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={styles.queueText}>Antrian</Text>
              <Text style={styles.queueText}>{data?.getOne?.queue}</Text>
            </View>
            <View
              style={{
                alignContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <Text style={styles.serviceListText}>Service List</Text>
              <View>
                {data?.getOne?.services.length > 0 ? (
                  data?.getOne?.services.map((el, index) => (
                    <Checkbox.Item
                      key={index}
                      onPress={() => handleCheckboxPress(index)}
                      label={`${el.service} - Rp. ${el.price}`}
                      status={serviceChecked[index] ? "checked" : "unchecked"}
                      color="#5142AA"
                    />
                  ))
                ) : (
                  <Text>No services available</Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() => {
              updateQ();
              navigation.navigate("Invoice", { data: data.getOne });
            }}
          >
            <Text style={styles.bookingButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F8FF",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    flex: 3,
    width: "100%",
  },
  map: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
  contentContainer: {
    marginTop: 20,
    flex: 2,
    width: "100%",
    padding: 16,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  barberName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  queueText: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#F6F8FF",
  },
  serviceListText: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  bookingButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 45,
    width: "100%",
    backgroundColor: "#5142AA",
    marginTop: 15,
  },
  bookingButtonText: {
    color: "white",
    fontSize: 16,
  },
});
