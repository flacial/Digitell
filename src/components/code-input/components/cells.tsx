import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, Platform } from "react-native";
import { useSelector } from "react-redux";

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
  i,
}: {
  i: number;
}) => {
  const CELL_COUNT = useSelector((state: any) => state.guesser.cellCount);
  const inputCode = useSelector((state: any) => state.guesser.inputCode);
  const cellIndex = useSelector((state: any) => state.guesser.cellIndex);
  const scoreType = useSelector((state: any) => state.score.scoreType)

  const generateAnims = (
    c = CELL_COUNT,
    b: Array<Animated.Value> = []
  ): Array<Animated.Value> => {
    if (b.length === c) {
      return b;
    }

    b.push(new Animated.Value(0));

    return generateAnims(c, b);
  };

  const [cellsAnims, setCellsAnims] = useState(generateAnims());

  const transformUp = (i: number) => {
    // Will change transformAnim value to -10 in 0.2 seconds
    if (cellsAnims[i]) {
      Animated.timing(cellsAnims[i], {
        toValue: -10,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  const transformDown = (i: number) => {
    // Will change transformAnim value to 0 in 0.2 seconds
    if (cellsAnims[i]) {
      Animated.timing(cellsAnims[i], {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  cellIndex === i ? transformUp(i) : transformDown(i);

  useEffect(() => {
    if (scoreType === 'Correct!')
      setCellsAnims(generateAnims());
  }, [CELL_COUNT]);

  useEffect(() => {
    setCellsAnims(generateAnims());
  }, [scoreType])
  
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
