import React from "react";
import styled, { ThemeProvider } from "styled-components/native";
import { useSelector } from "react-redux";
import { ImageBackground, Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Themes from "../../styles/theme/theme";
import BlackLayer from "../black-layer/black-layer";
import { WhichOS } from "../../utils/basedMethods";
import BackgroundImage from "../background-image/background-image.tsx";

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
        style={[
          {
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            width: "100%",
            height: "100%",
          },
          WhichOS.isLargeScreenOS() ? { overflow: "hidden" } : null,
        ]}
      >
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

        <BackgroundImage />

          <View
            style={{
              alignItems: "center",
              display: "flex",
              width: "100%",
              height: "100%",
              // paddingTop: WhichOS.isMobile() ? 70 : 20,
              justifyContent: 'center'
            }}
          >
            {props.children}
          </View>
        </View>
        <BlackLayer />
      </View>
    </ThemeProvider>
  );
};

export default Cwrapper;
