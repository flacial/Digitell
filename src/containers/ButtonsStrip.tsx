import React from "react" 
import { StyleSheet, Text, View, Pressable} from "react-native" 
import colors from "../styles/colors" 
import styled from "styled-components/native" 
import { useSelector, useDispatch } from "react-redux" 
import { setThemeMode } from "../redux/features/theme/themeSlice"
import Svg, { Path } from 'react-native-svg'

function ButtonsStrip() {
    return (
      <View style={{ flex:1, flexDirection:"row" }}>
        <Pressable
          style={style.previous_next} 
          onPress={() => { }} >
          <Text>&lt;</Text>
        </Pressable>
        <Pressable
          style={style.zero_one} 
          onPress={() => { }} >
          <Text>0</Text>
        </Pressable>
        <Pressable
          style={style.zero_one} 
          onPress={() => { }} >
          <Text>1</Text>
        </Pressable>
        <Pressable
          style={style.previous_next} 
          onPress={() => { }} >
          <Text>&gt;</Text>
        </Pressable>
        </View>
    );
}

export default ButtonsStrip

const style = StyleSheet.create({
  bg: {
    alignItems: "center",
    justifyContent: "center",
    flex: .8,
    height: 20,
    margin: 2,
    flexDirection: "row",
    textAlign: 'center',
    shadowColor: colors.ui.bg,
  },
  previous_next: {
    shadowColor: colors.ui.primary
    
  },
  zero_one: {
    
  },
  generalShadowSettings: { 
    shadowOffset: { width: 10, height: 0 },
    shadowRadius: 20,
  }
});
