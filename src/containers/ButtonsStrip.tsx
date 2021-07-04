import React from "react" 
import { StyleSheet, Text, View, Button } from "react-native" 
import colors from "../styles/colors" 
import styled from "styled-components/native" 
import { useSelector, useDispatch } from "react-redux" 
import { setThemeMode } from "../redux/features/theme/themeSlice"
import Svg, { Path } from 'react-native-svg'

function ButtonsStrip() {
    return (
        <View>
             
        </View>
    );
}

export default ButtonsStrip

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: .8,
    height: 20,
    margin: 2,
    flexDirection: "row",
    textAlign: 'center',
  },
});
