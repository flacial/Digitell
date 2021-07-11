import React from "react";
import { View } from "react-native";

const BlackLayer = () => {
  return (
    <View
      style={{
        width: "100%",
        position: "absolute",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.65)",
      }}
    ></View>
  );
};

export default BlackLayer;
