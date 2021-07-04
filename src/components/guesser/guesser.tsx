/* eslint-disable react/jsx-filename-extension */
// eslint-disable-next-line no-use-before-define
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  Button,
  Vibration,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { useDispatch } from 'react-redux';
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import AppLoading from 'expo-app-loading';
import {
  setScoreType,
  setScoreValue,
} from '../../redux/features/score/scoreSlice';
import CodeInput from '../code-input/code-input';
import { Inter_400Regular } from '@expo-google-fonts/inter';

const styles = StyleSheet.create({
  root: { padding: 20 },
  codeFieldRoot: { justifyContent: 'center' },
  cell: {},
  focusCell: {
    borderColor: '#C75B39',
  },
});

const CellsStyled = styled.Text`
  font-size: 35;
  border-width: 2;
  line-height: 48;
  text-align: center;
  margin-right: 4;
  color: ${(props: { theme: { TextColor: string } }) => props.theme.TextColor};
  width: 33px;
  height: 54px;
  border-color: "rgba(0, 0, 0, 0)";

  background: ${(props) => props.theme.binaryText};
  border-radius: 8;
`;

const GuesserContainer = styled.View`
  width: 330;
  height: 330;
  background-color: ${(props: { theme: { containersBg: string } }) => props.theme.containersBg};

  border-radius: 25;
  margin-top: 38;
`;

const TitleStyled = styled.Text`
  font-size: 36;
  color: ${(props: { theme: { binaryText: string } }) => props.theme.binaryText};
  font-family: VT323_400Regular;
  margin-left: 26;
  margin-bottom: 12;
  ${Platform.OS === 'web' ? `user-select: none` : null}
`;

const CurrentDigitStyled = styled.Text`
  font-size: 36;
  color: ${(props: { theme: { TextColor: string } }) => props.theme.binaryText};
  font-family: Inter_400Regular;
  letter-spacing: 16;
  ${Platform.OS === 'web' ? `user-select: none` : null}
`;

const Guesser = () => {
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    VT323_400Regular,
    Inter_400Regular,
  });

  const [value, setValue] = useState('');
  //   const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [counter, setCounter] = useState(0);
  const [currentBinary, setCurrentBinary] = useState('0');

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
        const prevStateValue = prevState + 1;
        setCurrentBinary(prevStateValue.toString(2));
        dispatch(setScoreType('Correct!'));
        dispatch(setScoreValue(10));
        Vibration.vibrate(10 * 10);
        return prevStateValue;
      });
    } else {
      dispatch(setScoreType('Try Again!'));
    }
  };

  // #mixCode
  const onEnterPress = (e: any): void => {
    if (Platform.OS === 'web') {
      if (e.nativeEvent.key === 'Enter') {
        isCorrect(value);
        setValue('');
      }
      return;
    }

    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      if (e.nativeEvent.text && e.nativeEvent.target) {
        setValue('');
        isCorrect(value);
      }
    }
  };

  return fontsLoaded ? (
    <>
    <View style={{
      justifyContent: 'center',
      alignContent: 'center',
      position: 'absolute',
      transform: Platform.OS === ('android' || 'ios') ? [{translateY: 450}] : [{translateY: 380}],
      elevation: 30,
      zIndex: 30
    }}>
    <CodeInput />
    </View>
    <GuesserContainer
      style={{
        shadowColor: '#86b6ff8f',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
      }}
    >
      <View style={{ marginTop: 36 }}>
        <TitleStyled>Current Digit:</TitleStyled>
        <View style={{ alignItems: 'center' }}>
          <CurrentDigitStyled>{currentBinary}</CurrentDigitStyled>
        </View>
      </View>
      <View>
        <TitleStyled>Next Digit:</TitleStyled>
      </View>
    </GuesserContainer></>
  ) : (
    <AppLoading />
  );
};

export default Guesser;
