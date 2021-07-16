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
import { useFonts, VT323_400Regular } from '@expo-google-fonts/vt323';
import AppLoading from 'expo-app-loading';
import CodeInput from '../code-input/code-input';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import { useSelector } from 'react-redux';

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
  const currentBinary = useSelector((state: any) => state.guesser.currentBinary)

  const [fontsLoaded] = useFonts({
    VT323_400Regular,
    Inter_400Regular,
  });


  return fontsLoaded ? (
    <>
    <View style={{
      justifyContent: 'center',
      alignContent: 'center',
      position: 'absolute',
      transform: Platform.OS === ('android' || 'ios') ? [{translateY: 205}] : [{translateY: 205}],
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
        zIndex: -1
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
