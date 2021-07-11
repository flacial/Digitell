import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { useSelector } from "react-redux";
import { ImageBackground, Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Themes from '../../styles/theme/theme'
import BlackLayer from '../black-layer/black-layer';

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
  const isSettingsRendered = useSelector((state: {misc: {isSettingsRendered: boolean}}) => state.misc.isSettingsRendered)

  return (
    <ThemeProvider theme={currentThemeStyles}>
      <StatusBar
        style={theme}
        animated={true}
        backgroundColor={currentThemeStyles.statusBarBg}
        hideTransitionAnimation={"slide"}
        hidden={false}
        translucent={false}
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
            Platform.OS === 'web' || 'windows' || 'macos' ? (
              theme === "light"
              ? require("../../assets/images/lightThemeBg.png")
              : require("../../assets/images/darkThemeBg-laptop.png") 
            ):
              theme === "light"
              ? require("../../assets/images/lightThemeBg.png")
              : require("../../assets/images/darkThemeBg.png")
            }
          style={{
            width: "100%",
            height: "100%",
            opacity: currentThemeStyles.appBgOpacity,
            position: "absolute",
            zIndex: -30
          }}
        ></ImageBackground>
        <View
          style={{
            alignItems: "center",
            display: "flex",
            width: "100%",
            height: "100%",
            paddingTop: 70,
          }}
        >
          {props.children}
        </View>
      </View>
      {
        // isSettingsRendered ? 
        // <BlackLayer /> :
        // null
      }
    </ThemeProvider>
  );
};

export default Cwrapper;
