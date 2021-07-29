import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, Animated } from "react-native";

const AnimatedSplashC = () => {
  // const widthAnim = useRef(new Animated.Value(200)).current;

  // const widthOut = () => {
  //   Animated.timing(widthAnim, {
  //     toValue: 170,
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start(() => widthIn());
  // };

  // const widthIn = () => {
  //   Animated.timing(widthAnim, {
  //     toValue: 200,
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start(() => widthOut());
  // };

  // const fontSizeAnim = useRef(new Animated.Value(50)).current;

  // const fontSizeOut = () => {
  //   Animated.timing(fontSizeAnim, {
  //     toValue: 60,
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start(() => fontSizeIn());
  // };

  // const fontSizeIn = () => {
  //   Animated.timing(fontSizeAnim, {
  //     toValue: 50,
  //     duration: 400,
  //     useNativeDriver: true,
  //   }).start(() => fontSizeOut());
  // };

  // useEffect(() => {
  //   fontSizeOut();
  // }, []);

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "#2e2e2e",
          zIndex: 400,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Animated.Text
            style={{
              fontSize: 50,
              color: "white",
              textShadowColor: "#00FFFF",
              textShadowRadius: 0,
              textShadowOffset: {
                width: 10,
                height: 0,
              },
              position: "absolute",
            }}
          >
            Maybe loading?
          </Animated.Text>
          <Animated.Text
            style={{
              fontSize: 50,
              color: "white",
              textShadowColor: "#FF0000",
              textShadowRadius: 10,
              textShadowOffset: {
                width: 4,
                height: 0,
              },
              position: "absolute",
            }}
          >
            Maybe loading?
          </Animated.Text>
        </View>
      </View>
    </>
  );
};

export default AnimatedSplashC;
