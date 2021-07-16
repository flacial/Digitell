import React from 'react'
import { ImageBackground, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import Themes from "../../styles/theme/theme";

const BackgroundImage = () => {
  const theme = useSelector((state: any) => state.theme.themeMode);
  const currentThemeStyles = Themes[theme];

  return (
    <ImageBackground
    source={
      Platform.OS === "web" || "windows" || "macos"
        ? theme === "light"
          ? require("../../assets/images/lightThemeBg.png")
          : require("../../assets/images/darkThemeBg-laptop.png")
        : theme === "light"
        ? require("../../assets/images/lightThemeBg.png")
        : require("../../assets/images/darkThemeBg.png")
    }
    style={{
      width: "100%",
      height: "100%",
      opacity: currentThemeStyles.appBgOpacity,
      position: "absolute",
      zIndex: -30,
    }}
  >
  </ImageBackground>
  )
}


export default BackgroundImage