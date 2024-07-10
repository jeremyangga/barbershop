import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { gql, useMutation } from "@apollo/client";
import { useEffect } from "react";
import { getValueFor, save } from "../helpers/secureStore";
import AwesomeAlert from 'react-native-awesome-alerts';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const LOGIN_USER = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      access_token
    }
  }
`;

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const authContext = useContext(AuthContext);
  const [mutateFunction, { data, loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log(data);
    },
  });

  const showAlertDialog = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const handleLogin = async () => {
    try {
      const loginInput = { email, password };
      const result = await mutateFunction({ variables: { loginInput } });
      console.log(result, '<--result')
    } catch (error) {
      showAlertDialog("Perhatian!", "Email atau password salah");
      console.error(error, '<<---error');
    }
  };

  useEffect(() => {
    if (data?.login && !error) {
      save("accessToken", data.login.access_token).then(() => {
        authContext.setIsSignedIn(true);
      });
    }
  }, [data]);

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
          <Image style={styles.logo} source={require("../assets/logo.png")} />
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            onFocus={onFocus}
            onBlur={onBlur}
            value={email}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            onFocus={onFocus}
            onBlur={onBlur}
            secureTextEntry
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => {
              console.log("login di click");
              handleLogin();
            }}
          >
            <Text style={{ color: "white" }}>Log in</Text>
          </TouchableOpacity>
        </View>
        {isTyping ? null : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Register");
              }}
            >
              <View style={styles.buttonCreateAccount}>
                <Text>Create new account</Text>
              </View>
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
  buttonLogin: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 45,
    width: windowWidth / 1.2,
    backgroundColor: "#5142AA",
    marginTop: 25,
  },
  buttonCreateAccount: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#5142AA",
    borderRadius: 10,
    borderWidth: 2,
    height: 45,
    width: windowWidth / 1.2,
  },
  logo: {
    height: 150,
    width: 150,
  },
});
