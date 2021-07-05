import React from "react" 
import { StyleSheet, Text, View, Pressable, ImageBackgroundBase} from "react-native" 
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
          <Text style={style.previous_next_text}>
            &lt;
          </Text>
        </Pressable>
        <Pressable
          style={style.zero_one} 
          onPress={() => { }} >
          <Text style={style.zero_one_text}>
            0
          </Text>
        </Pressable>
        <Pressable
          style={style.zero_one} 
          onPress={() => { }} >
          <Text style={style.zero_one_text}>
            1
          </Text>
        </Pressable>
        <Pressable
          style={style.previous_next}
          onPress={() => { }} >
          <Text style={style.previous_next_text}>
            &gt;
          </Text>
        </Pressable>
        </View>
    );
}

export default ButtonsStrip

const style = StyleSheet.create({
  
  generalShadowSettings: { 
    shadowOffset: { width: 10, height: 0 },
    shadowRadius: 20,
  },
  
  bg: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
    flexDirection: "row",
    flex: .8,
    height: 20, 
    shadowColor: colors.ui.bg,
  },

  previous_next_text: {
    color: colors.ui.primary, 
  },
  previous_next: {
    shadowColor: colors.ui.primary,
    width: 64, height: 64,
    color: colors.ui.bg_raised_1,
  },
  
  zero_one_text: {
    color: colors.ui.text,
    textAlign:"center"
  },
  zero_one: {
    color: colors.ui.primary, 
  },
  
});
