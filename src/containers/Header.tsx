import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../styles/colors";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { setThemeMode } from "../redux/features/theme/themeSlice";

const StyledText = styled.Text`
  color: ${(props) => props.theme.color};
  font-size: 30;
  font-weight: bold;
`;

const Header = () => {
    const themeMode = useSelector((state: any) => state.theme.themeMode);
    const dispatch = useDispatch();

    const switchMode = () => {
        dispatch(setThemeMode());
    };

    return (
        <View style={styles.container}>
            <StyledText>Digitell</StyledText>
            <Button
                onPress={switchMode}
                title={`Change Mode to ${themeMode === "light" ? "Dark" : "Light"}`}
            />
            <Text style={{ margin: 10 }}>#DEV</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: `${colors.bg}`,
        alignItems: "center",
        justifyContent: "center",
        height: 20,
        // flexDirection: "row",
        margin: 2,
    },
});

export default Header;
