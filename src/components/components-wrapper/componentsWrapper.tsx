import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { useSelector } from "react-redux";
import { ImageBackground, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Themes from '../../styles/theme/theme'

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
      <StatusBar
        style={theme}
        animated={true}
        backgroundColor={currentThemeStyles.statusBarBg}
        hideTransitionAnimation={"slide"}
        hidden={false}
        translucent={true}
      />
      <View
        style={{
          backgroundColor: currentThemeStyles.bodyBackground,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <ImageBackground
          source={
              theme === "light" 
              ? require("../../assets/images/lightThemeBg.png")
              : require("../../assets/images/darkThemeBg.png")
            }
          style={{
            width: "100%",
            height: "100%",
            opacity: currentThemeStyles.appBgOpacity,
            position: "absolute",
          }}
        ></ImageBackground>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: "100%",
            height: "100%",
            paddingTop: 100,
          }}
        >
          {props.children}
        </View>
      </View>
    </ThemeProvider>
  );
};

export default Cwrapper;
