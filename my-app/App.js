import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./navigations/mainStack";
import AuthProvider from "./context/AuthContext";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apolloClient";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AuthProvider>
          <MainStack />
        </AuthProvider>
      </NavigationContainer>
    </ApolloProvider>
  );
}
