import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import colors from "../styles/colors";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { setThemeMode } from "../redux/features/theme/themeSlice";
import Svg, { Path } from 'react-native-svg';

const StyledText = styled.Text`
  color: ${(props: { theme: { TextColor: string } }) => props.theme.TextColor};
  font-size: 36;
  margin-right: 160;
`;

const Header = () => {
  const scoreType = useSelector(
    (state: { score: { scoreType: string } }) => state.score.scoreType
  );

  const themeMode = useSelector(
    (state: { theme: { themeMode: string } }) => state.theme.themeMode
  );
  const dispatch = useDispatch();

  const switchMode = () => {
    dispatch(setThemeMode());
  };

  return (
    <View>
      {/* <Button
        onPress={() => switchMode()}
        title={`${themeMode === "light" ? "Dark" : "Light"}`}
        color="rgb(59, 255, 108)"
        /> */}
    <View style={styles.container}>
      <StyledText>{scoreType}</StyledText>
      <Svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none" >
          <Path
            fill={colors.ui.primary}
            d="M22.33 15.092C22.372 14.742 22.4 14.378 22.4 14C22.4 13.622 22.372 13.258 22.316 12.908L24.682 11.06C24.892 10.892 24.948 10.584 24.822 10.346L22.582 6.46799C22.442 6.21599 22.148 6.13199 21.896 6.21599L19.11 7.33599C18.522 6.88799 17.906 6.52399 17.22 6.24399L16.8 3.27599C16.758 2.99599 16.52 2.79999 16.24 2.79999H11.76C11.48 2.79999 11.256 2.99599 11.214 3.27599L10.794 6.24399C10.108 6.52399 9.47799 6.90199 8.90399 7.33599L6.11799 6.21599C5.86599 6.11799 5.57199 6.21599 5.43199 6.46799L3.19199 10.346C3.05199 10.598 3.10799 10.892 3.33199 11.06L5.69799 12.908C5.64199 13.258 5.59999 13.636 5.59999 14C5.59999 14.364 5.62799 14.742 5.68399 15.092L3.31799 16.94C3.10799 17.108 3.05199 17.416 3.17799 17.654L5.41799 21.532C5.55799 21.784 5.85199 21.868 6.10399 21.784L8.88999 20.664C9.47799 21.112 10.094 21.476 10.78 21.756L11.2 24.724C11.256 25.004 11.48 25.2 11.76 25.2H16.24C16.52 25.2 16.758 25.004 16.786 24.724L17.206 21.756C17.892 21.476 18.522 21.098 19.096 20.664L21.882 21.784C22.134 21.882 22.428 21.784 22.568 21.532L24.808 17.654C24.948 17.402 24.892 17.108 24.668 16.94L22.33 15.092ZM14 18.2C11.69 18.2 9.79999 16.31 9.79999 14C9.79999 11.69 11.69 9.79999 14 9.79999C16.31 9.79999 18.2 11.69 18.2 14C18.2 16.31 16.31 18.2 14 18.2Z"
          /> 
      </Svg>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    margin: 2,
    flexDirection: "row",
    textAlign: 'center',
  },
});

export default Header;
