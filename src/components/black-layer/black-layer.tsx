import React, { useRef } from "react";
import { Animated } from "react-native";
import Settings from "../settings/settings";
import { useSelector } from "react-redux";

const BlackLayer = () => {
  const isSettingsRendered = useSelector(
    (state: { misc: { isSettingsRendered: boolean } }) =>
      state.misc.isSettingsRendered
  );

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const zIndexValue = useRef(new Animated.Value(-30)).current // Initial value for zindex: -30

  const zIndexIn = () => {
    Animated.timing(zIndexValue, {
      toValue: 500,
      duration: 100,
      useNativeDriver: true
    }).start()
  }

  const zIndexOut = () => {
    Animated.timing(zIndexValue, {
      toValue: -200,
      duration: 310,
      useNativeDriver: true
    }).start()
  }

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    if (isSettingsRendered)  {
      fadeIn();
      zIndexIn()
    }
    else {
      fadeOut();
      zIndexOut()
    }
  }, [isSettingsRendered]);

  return (
    <>
        <Animated.View
          style={{
            width: "100%",
            position: "absolute",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.65)",
            opacity: fadeAnim,
            zIndex: zIndexValue,
          }}
          pointerEvents={isSettingsRendered ? "auto" : "none"}
        >
          <Settings />
        </Animated.View>
    </>
  );
};

export default BlackLayer;
