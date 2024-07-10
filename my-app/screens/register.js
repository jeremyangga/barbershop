import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { gql, useMutation } from "@apollo/client";
import AwesomeAlert from 'react-native-awesome-alerts';

const REGISTER_USER = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      _id
      name
      username
      email
      password
      phone_number
    }
  }
`;

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Register({ navigation }) {
  const [name, setname] = useState("");
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone_number, setphone_number] = useState("");
  const [password, setpassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const [register, { data, loading, error }] = useMutation(REGISTER_USER);

  const showAlertDialog = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };
  
  const handleRegister = async () => {
    try {
      const userInput = { username, email, password, name, phone_number };
      userInput.username = userInput.name;
      if(!name || name === '' || name === ' ') {
        showAlertDialog("Perhatian!", "Nama harus diisi");
      } else if(!phone_number || phone_number === '' || phone_number === ' ') {
        showAlertDialog("Perhatian!", "Nomor telepon harus diisi");
      } else if(!email || email === '' || email === ' ') {
        showAlertDialog("Perhatian!", "Email harus diisi");
      } else if(!password || password === '' || password === ' ') {
        showAlertDialog("Perhatian!", "Password harus diisi");
      } else {
        const result = await register({ variables: { userInput } });
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [data]);

  const onFocus = () => {
    setIsTyping(true);
  };

  const onBlur = () => {
    setIsTyping(false);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View
          style={{ flex: 5, justifyContent: "center", alignItems: "center" }}
        >
          <TextInput
            style={styles.input}
            onChangeText={setname}
            onFocus={onFocus}
            onBlur={onBlur}
            value={name}
            placeholder="Name"
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={setusername}
            onFocus={onFocus}
            onBlur={onBlur}
            value={username}
            placeholder="Username"
          /> */}
          <TextInput
            style={styles.input}
            onChangeText={setphone_number}
            onFocus={onFocus}
            onBlur={onBlur}
            value={phone_number}
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.input}
            onChangeText={setemail}
            onFocus={onFocus}
            onBlur={onBlur}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={setpassword}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => {
              console.log("register klik");
              handleRegister();
            }}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
        {!isTyping && (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              style={styles.backLogin}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text>Already have an account</Text>
            </TouchableOpacity>
          </View>
        )}
         <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={alertTitle}
          message={alertMessage}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Oke"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={hideAlert}
        />
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
  input: {
    height: 50,
    width: windowWidth / 1.1,
    borderWidth: 2,
    padding: 10,
    borderColor: "#5142AA",
    borderRadius: 10,
    margin: 10,
  },
  buttonRegister: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 45,
    width: windowWidth / 1.2,
    backgroundColor: "#5142AA",
    marginTop: 25,
  },
  backLogin: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#5142AA",
    borderRadius: 10,
    borderWidth: 2,
    height: 45,
    width: windowWidth / 1.2,
  },
});
