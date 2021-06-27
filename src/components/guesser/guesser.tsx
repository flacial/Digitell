import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, Platform } from "react-native";
import Button from '@material-ui/core/Button'

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20, marginTop: 50 },
    title: { textAlign: "center", fontSize: 30 },
    codeFieldRoot: { marginTop: 20, justifyContent: "center" },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: "#ff7575",
        textAlign: "center",
        borderRadius: 7,
        marginRight: 4,
    },
    focusCell: {
        borderColor: "#fa4242",
    },
});

const Guesser = () => {
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
                return prevStateValue;
            });
        } else {
            alert("Wrong Answer!");
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
        <SafeAreaView style={styles.root}>
            <Text style={styles.title}>Current Binary is: {currentBinary}</Text>
            <CodeField
                onSubmitEditing={(e: object) => onEnterPress(e)}
                {...props}
                // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
            <Button color="primary" onClick={() => new KeyboardEvent('keypress', { key: 'enter', })}>
                Advance
            </Button>
        </SafeAreaView >
    );
};

export default Guesser;
