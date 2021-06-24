import * as React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Colors from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import tailwind from "tailwind-rn";

function Header() {
  return (
    // <View style={styles.container}>
    //     <Text style={{color: Colors.text.primary}}>
    //         Digitell
    //     </Text>
    // </View>
    <SafeAreaView style={tailwind("h-full")}>
      <View style={tailwind("pt-12 items-center")}>
        <View style={tailwind("bg-blue-200 px-3 py-1 rounded-full")}>
          <Text style={tailwind("text-blue-800 font-semibold")}>
            Hello Tailwind
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: "20",
  },
});

export default Header;
