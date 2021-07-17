import React from "react";
import { ImageBackground, Platform } from "react-native";
import { useSelector } from "react-redux";
import { setIsBackgroundLoaded } from "../../redux/features/misc/miscSilce";
import Themes from "../../styles/theme/theme";
import { useDispatch } from "react-redux";

const BackgroundImage = () => {
  const theme = useSelector((state: any) => state.theme.themeMode);
  const currentThemeStyles = Themes[theme];

  const dispatch = useDispatch();

  return (
    <ImageBackground
      onLoad={() => {
        dispatch(setIsBackgroundLoaded(true));
      }}
      source={
        Platform.OS === ("web" || "windows" || "macos")
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
    ></ImageBackground>
  );
};

export default BackgroundImage;
