import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import styled from 'styled-components/native'

const StyledText = styled.Text`
    color: red;
    font-size: 30;
    font-weight: bold;
`

function Header() {
  return (
    <View style={styles.container}>
        <StyledText>
            Digitell
        </StyledText>
    </View>
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
