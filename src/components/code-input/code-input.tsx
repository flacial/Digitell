/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line no-use-before-define
import React, { useState, ReactElement } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";
import {
  deleteInputCode,
  setCellIndex,
  setInputCode,
  setInputCodeManually,
} from "../../redux/features/guesser-d/guesserSlice";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const CELL_COUNT = 6;

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
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonMove: {
    width: 48,
    height: 48,
    backgroundColor: "#212121",
    borderRadius: 100,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDigit: {
    width: 64,
    height: 64,
    backgroundColor: "#212121",
    borderRadius: 100,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDigitText: {
    width: 23,
    height: 51,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 36,
    lineHeight: 51,
    color: "#5EB8FF",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },
});

export default function CodeInput() {
  const inputCode = useSelector((state: any) => state.guesser.inputCode);
  const cellIndex = useSelector((state: any) => state.guesser.cellIndex);

  const dispatch = useDispatch();
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

  const cellsAnims = useState(generateAnims());

  const transformUp = (i: number) => {
    // Will change transformAnim value to -10 in 0.2 seconds
    Animated.timing(cellsAnims[0][i], {
      toValue: -10,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const transformDown = (i: number) => {
    // Will change transformAnim value to 0 in 0.2 seconds
    Animated.timing(cellsAnims[0][i], {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // const styleFocusedCell = (num = cellIndex, isContainerFocused = true) => {
  // if (isContainerFocused)
  //   document.querySelectorAll('.cell').forEach(cell => {
  //     if (+cell.classList[1] === num) {
  //       cell.style.border = '2px solid #C75B39';
  //       cell.style.transform = 'translateY(-10px)';
  //     } else {
  //       cell.style.border = '';
  //       cell.style.transform = '';
  //     }
  //   });
  // else
  //   document.querySelectorAll('.cell').forEach(cell => {
  //     cell.style.border = '';
  //     cell.style.transform = '';
  //   });
  // };

  const cellIndexChanger = () => {
    if (cellIndex < CELL_COUNT) {
      dispatch(setCellIndex(1));
    }
  };

  const codeChanger = (digit: any) => {
    cellIndexChanger();
    dispatch(setInputCode(digit));
  };

  const getCodeValue = (digit: string) => {
    if (cellIndex < CELL_COUNT) {
      return codeChanger(digit);
    }
  };

  const deleteCode = async () => {
    dispatch(deleteInputCode(inputCode))
      .then((unwrapResult: any) =>
        dispatch(setInputCodeManually(unwrapResult.payload))
      )
      .then((originalResult: any) => {
        if (!originalResult.message) {
          dispatch(setCellIndex(-1));
        }
      })
      .catch((err: any) => console.log(err));
  };

  // useEffect(() => {
  //   console.log(cellIndex);
  // }, [cellIndex]);

  const moveThroughCells = (direction: string) => {
    if (direction === "right") {
      dispatch(() => {
        if (
          cellIndex < CELL_COUNT &&
          inputCode[cellIndex + 1] !== undefined &&
          inputCode[cellIndex + 1]
        ) {
          dispatch(setCellIndex(1));
        }
      });
    } else {
      dispatch(() => {
        if (cellIndex > 0) {
          dispatch(setCellIndex(-1))
        }
      }

      );
    }
  };

  const cellRoot = (
    c = CELL_COUNT,
    i = 0,
    cells: Array<ReactElement> = []
  ): Array<ReactElement> => {
    if (i === c) return cells;
    cells.push(
      <View key={i}>
        <Animated.Text
          style={[
            styles.cell,
            cellIndex === i ? styles.focusedCell : styles.unfocusedCell,
            { transform: [{ translateY: cellsAnims[0][i] }] },
            Platform.OS === "web" && { userSelect: "none" },
          ]}
        >
          {cellIndex === i ? transformUp(i) : transformDown(i)}
          {inputCode[i] || "_"}
        </Animated.Text>
      </View>
    );
    return cellRoot(c, i + 1, cells);
  };

  // const handleBlur = e => {
  //   const currentTarget = e.currentTarget;
  //   setTimeout(() => {
  //     if (!currentTarget.contains(document.activeElement)) {
  //       styleFocusedCell(null, false);
  //     }
  //   }, 0);
  // };

  // const focusFirstCell = () => {
  //   const firstCell = document.querySelector('.cell');
  //   firstCell.style.border = '2px solid #C75B39';
  //   firstCell.style.transform = 'translateY(-10px)';
  // };

  // useEffect(() => {
  //   focusFirstCell();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        {cellRoot()}
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          style={({ pressed }) => [{ marginRight: 10 }, styles.buttonMove]}
          onPress={() => moveThroughCells("left")}
        >
          <Svg
            width="15"
            height="22"
            viewBox="0 0 15 22"
            fill="none"
            color="white"
            strokeWidth={4}
            strokeOpacity="0.87"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={Platform.OS === "web" && { userSelect: "none" }}
          >
            <Path
              d="M12.75 2.75L2.25 11L12.75 19.25"
              stroke="white"
              stroke-opacity="0.87"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buttonDigit,
            Platform.OS === "web"
              ? { cursor: "pointer", userSelect: "none" }
              : null,
            { marginRight: 7 },
            { backgroundColor: pressed ? "#353535" : "#212121" },
          ]}
          onPress={() => getCodeValue("0")}
        >
          <Text style={styles.buttonDigitText}>0</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.buttonDigit,
            Platform.OS === "web"
              ? { cursor: "pointer", userSelect: "none" }
              : null,
            { backgroundColor: pressed ? "#353535" : "#212121" },
          ]}
          onPress={() => getCodeValue("1")}
        >
          <Text style={styles.buttonDigitText}>1</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonMove, { marginLeft: 10 }]}
          onPress={() => moveThroughCells("right")}
        >
          <Svg
            width="15"
            height="22"
            viewBox="0 0 15 22"
            fill="none"
            color="white"
            strokeWidth={4}
            strokeOpacity="0.87"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={Platform.OS === "web" && { userSelect: "none" }}
          >
            <Path
              d="M2.25 19.25L12.75 11L2.25 2.75"
              stroke="white"
              stroke-opacity="0.87"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </Svg>
        </Pressable>
        {
          <Pressable
            style={styles.buttonDigit}
            onPress={inputCode.length ? deleteCode : null}
          >
            <Text
              style={[
                { color: "white" },
                Platform.OS === "web" ? { userSelect: "none" } : null,
              ]}
            >
              Delete
            </Text>
          </Pressable>
        }
      </View>
    </View>
  );
}
