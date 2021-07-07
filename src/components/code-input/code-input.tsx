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
  Vibration,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { useSelector } from "react-redux";
import {
  clearCellIndex,
  deleteInputCode,
  setCellCount,
  setCellIndex,
  setInputCode,
  setInputCodeManually,
} from "../../redux/features/guesser-d/guesserSlice";
import { useDispatch } from "react-redux";
import {
  setScoreType,
  setScoreValue,
} from "../../redux/features/score/scoreSlice";
import {
  setCurrentBinary,
  setDigitNumber,
} from "../../redux/features/guesser-d/guesserSlice";
import { useEffect } from "react";
import Cells from "./components/cells";

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
  const inputCode: Array<string> = useSelector((state: any) => state.guesser.inputCode);
  const cellIndex: number = useSelector((state: any) => state.guesser.cellIndex);
  const digitNumber: number = useSelector((state: any) => state.guesser.digitNumber);

  const dispatch = useDispatch();

  // Function to get the next binary
  const convertNextBinary = (): string => {
    return (digitNumber + 1).toString(2);
  };

  const CELL_COUNT: number = useSelector((state: any) => state.guesser.cellCount);

  // Function to check if the input is correct
  const isInputCorrect = (inputValue: string | null): void => {
    if (inputValue === convertNextBinary()) {
      dispatch(setDigitNumber(1));
      dispatch(setCurrentBinary());
      dispatch(setScoreType("Correct!"));
      dispatch(setScoreValue(10));
      dispatch(setCellCount(1));
      dispatch(setInputCodeManually([]));
      dispatch(clearCellIndex());
      Vibration.vibrate(10 * 10);
    } else {
      dispatch(setScoreType("Try Again!"));
    }
  };

  useEffect(() => {
    if (inputCode.length === convertNextBinary().length) {
      isInputCorrect(inputCode.join(""));
    }
  }, [inputCode]);

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

  const deleteCode = () => {
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
          dispatch(setCellIndex(-1));
        }
      });
    }
  };

  // Recursive Function, Base Case returns the cells, Recursive Case returns the initial parameters
  const cellRoot = (
    c = CELL_COUNT,
    i = 0,
    cells: Array<ReactElement> = []
  ): Array<ReactElement> => {
    if (i === c) return cells;
    cells.push(
      <View key={i}>
        <Cells
          i={i}
        />
      </View>
    );
    return cellRoot(c, i + 1, cells);
  };

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
              strokeOpacity="0.87"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
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
              strokeOpacity="0.87"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
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
