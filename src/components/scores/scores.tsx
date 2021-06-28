import React from "react";
import { View } from "react-native";
import { useFonts, VT323_400Regular } from "@expo-google-fonts/vt323";
import styled from "styled-components/native";
import AppLoading from "expo-app-loading";
import { useSelector } from 'react-redux';

const ScoresContainer = styled.View`
  width: 330;
  height: 64;
  background: #5eb8ff;
  border-radius: 25;
  margin-top: 48;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 26;
  padding-right: 26;
  align-items: center;
`;

const PointsText = styled.Text`
    color: ${props => props.theme.binaryText}
`;

const Scores = () => {
  let [fontsLoaded] = useFonts({
    VT323_400Regular,
  });

  const scoreValue = useSelector(state => state.score.scoreValue)

  return (
    fontsLoaded ? 
    <View>
      <ScoresContainer>
        <PointsText
          style={{
            fontSize: 40,
            fontFamily: "VT323_400Regular",
            lineHeight: 36  
          }}
        >
          Points
        </PointsText>
        <PointsText
          style={{
            fontSize: 50,
            fontFamily: "VT323_400Regular",
            lineHeight: 54
          }}
        >
          {scoreValue}
        </PointsText>
      </ScoresContainer>
    </View>
    : <AppLoading />
  );
};

export default Scores;
