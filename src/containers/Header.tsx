import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import currentTheme from '../../src/styles/currentTheme'
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
            <Text style={{ margin: 10 }}>#DEV</Text>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `${currentTheme.bg}`,
        alignItems: "center",
        justifyContent: "center",
        height: 20,
        flexDirection: "row",
        margin: 2
    },
});

export default Header;
