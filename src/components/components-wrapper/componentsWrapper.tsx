import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { useSelector } from "react-redux";
import { ImageBackground, View, StatusBar } from "react-native";

const DarkTheme = {
  background: "#272727",
  TextColor: "#fff7db",
};

const LightTheme = {
  background: "#f0f0f0",
  TextColor: "#EFEFEF",
};

const Themes: any = {
  light: LightTheme,
  dark: DarkTheme,
};

const Cwrapper = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const theme = useSelector((state: any) => state.theme.themeMode);
  const currentThemeStyles = Themes[theme];

  return (
    <ThemeProvider theme={currentThemeStyles}>
      <View
        style={{
          backgroundColor: "#000000",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
           <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"light-content"}
        showHideTransition={"slide"}
        hidden={false} />
        <ImageBackground
          source={require("../../assets/images/darkThemeBg.png")}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.5,
            position: "absolute"
          }}
        >
            </ImageBackground>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              width: "100%",
              height: "100%",
              paddingTop: 100
            }}
          >
            {props.children}
          </View>
      </View>
    </ThemeProvider>
  );
};

export default Cwrapper;
