import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { useSelector } from "react-redux";
import { View } from "react-native";

const DarkTheme = {
  background: "#272727",
  color: "#fff7db",
};

const LightTheme = {
  background: "#f0f0f0",
  color: "#303030",
};

const Themes: any = {
  light: LightTheme,
  dark: DarkTheme,
};

const Cwrapper = (props: { children: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => {
  const theme = useSelector((state) => state.theme.themeMode);
  const currentThemeStyles = Themes[theme];

  return (
    <ThemeProvider theme={currentThemeStyles}>
      <View
        style={{
          backgroundColor: currentThemeStyles.background,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        {props.children}
      </View>
    </ThemeProvider>
  );
};

export default Cwrapper;
