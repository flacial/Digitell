import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, Platform, Button } from "react-native";
import styled from "styled-components/native";
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useDispatch, useSelector } from "react-redux";
import { setScoreType, setScoreValue } from "../../redux/features/score/scoreSlice";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";
import AppLoading from "expo-app-loading";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, marginTop: 50 },
  codeFieldRoot: { marginTop: 20, justifyContent: "center" },
  cell: {},
  focusCell: {
    borderColor: "#fa4242",
  },
});

const CellsStyled = styled.Text`
  width: 40;
  height: 40;
  line-height: 38;
  font-size: 24;
  border-width: 2;
  border-color: "rgb(255, 117, 117)";
  text-align: center;
  border-radius: 7;
  margin-right: 4;
  color: ${(props) => props.theme.TextColor};
`;

const TitleStyled = styled.Text`
  font-size: 40;
  color: ${(props: { theme: { TextColor: string } }) => props.theme.TextColor};
  font-family: VT323_400Regular;
`;

const Guesser = () => {
  const dispatch = useDispatch();
  
  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  const [value, setValue] = useState("");
  //   const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [counter, setCounter] = useState(0);
  const [currentBinary, setCurrentBinary] = useState("0");

  // Function to guess the next number
  const guessBinary = (): string => {
    const next: string = (counter + 1).toString(2);
    return next;
  };

  // Set the cell count to the next digit length
  const CELL_COUNT = guessBinary().length;

  // Function to check if the input is correct
  const isCorrect = (inputValue: string | null): void => {
    if (inputValue === guessBinary()) {
      setCounter((prevState: any) => {
        let prevStateValue = prevState + 1;
        setCurrentBinary(prevStateValue.toString(2));
        dispatch(setScoreType("Correct!"))
        dispatch(setScoreValue())
        return prevStateValue;
      });
    } else {
    dispatch(setScoreType("Try Again!"))
    }
  };

  // #mixCode
  const onEnterPress = (e: any): void => {
    if (Platform.OS === "web") {
      if (e.nativeEvent.key === "Enter") {
        isCorrect(value);
        setValue("");
      }
      return;
    }

    if (Platform.OS === "android" || Platform.OS === "ios") {
      if (e.nativeEvent.text && e.nativeEvent.target) {
        setValue("");
        isCorrect(value);
      }
    }
  };

  return (
    fontsLoaded ?
    <SafeAreaView style={styles.root}>
      <TitleStyled>Current Digit: {currentBinary}</TitleStyled>
      <CodeField
        onSubmitEditing={(e: object) => onEnterPress(e)}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={(e) => setValue(e)}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => (
          <CellsStyled
            key={index}
            style={[isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </CellsStyled>
        )}
      />
      {/* <Button color="red" title="Advance" onPress={() => {}}/> */}
    </SafeAreaView>
    : <AppLoading />
  );
};

export default Guesser;
