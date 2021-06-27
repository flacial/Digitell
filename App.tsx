import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./src/containers/Header";
import Guesser from "./src/components/guesser/guesser";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Cwrapper from "./src/components/components-wrapper/componentsWrapper";

const App = () => {
  return (
    <Provider store={store}>
      <Cwrapper>
        <Header />
        <Guesser />
        <StatusBar style="auto" />
      </Cwrapper>
    </Provider>
  );
};

export default App;
