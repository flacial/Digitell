import React from "react" 
import { StyleSheet, Text, View, Pressable, TouchableOpacity} from "react-native" 
import colors from "../styles/colors"  

function zero_Click() {

}

function one_Click() {
  
}

function previous_Click() {
  
}

function next_Click() {
  
}

const ButtonsStrip = () => {
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        
        <Pressable
          style={style.previous_next} 
          onPress={previous_Click} >
          
          <Text style={style.previous_next_text}>
            &lt;
          </Text>

        </Pressable>

        <Pressable
          onPress={zero_Click}
          style={style.zero_one} >
          
          <Text style={style.zero_one_text}>
            0
          </Text>

        </Pressable> 
        
        <Pressable
          onPress={one_Click}
          style={style.zero_one} >

          <Text style={style.zero_one_text}>
            1
          </Text>

        </Pressable>
        
        
        <Pressable
          onPress={next_Click}
          style={style.previous_next} > 
          
          <Text style={style.previous_next_text} >
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
    justifyContent: 'center',
    alignItems: 'center', 
    borderRadius: 100,
  },
  
  bg: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'center',
    flexDirection: "row",
    flex: .8,
    height: 20, 
    backgroundColor: colors.ui.bg,
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
    width: 100, height: 100,
    backgroundColor: colors.ui.primary,
  },
  
});
