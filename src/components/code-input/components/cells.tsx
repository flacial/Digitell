import React from "react";
import { Animated, StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  focusedCell: {
    borderColor: "#C75B39",
    borderWidth: Platform.OS === "web" ? 3 : 2,
  },
  unfocusedCell: {
    borderWidth: 0,
  },
  cell: {
    backgroundColor: "#212121",
    borderRadius: 8,
    color: "white",
    fontSize: 30,
    width: 30,
    height: 50,
    display: "flex",
    marginBottom: 20,
    marginLeft: 20,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    lineHeight: 50,
  },
});

const Cells = ({
  cellIndex,
  inputCode,
  i,
  cellsAnims,
  transformUp,
  transformDown,
}: {cellIndex: number, inputCode: Array<string>, i: number, cellsAnims: Array<Animated.Value>}) => {
  cellIndex === i ? transformUp(i) : transformDown(i);
  return (
    <Animated.Text
      style={[
        styles.cell,
        cellIndex === i ? styles.focusedCell : styles.unfocusedCell,
        { transform: [{ translateY: cellsAnims[i] }] },
        Platform.OS === "web" && { userSelect: "none" },
      ]}
    >
      {inputCode[i] || "_"}
    </Animated.Text>
  );
};

export default Cells;
