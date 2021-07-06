import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import colors from "../styles/colors";

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
		<View style={style.bg}>
			<Pressable
				onPress={previous_Click}
				style={(style.previous_next, { marginRight: 20 })}
			>
				<Text style={style.previous_next_text}>&lt;</Text>
			</Pressable>

			<Pressable
				onPress={zero_Click}
				style={(style.zero_one, { marginLeft: 5, marginRight: 5 })}
			>
				<Text style={style.zero_one_text}>0</Text>
			</Pressable>

			<Pressable
				onPress={one_Click}
				style={(style.zero_one, { marginLeft: 5, marginRight: 5 })}
			>
				<Text style={style.zero_one_text}>1</Text>
			</Pressable>

			<Pressable
				onPress={next_Click}
				style={(style.previous_next, { marginLeft: 20 })}
			>
				<Text style={style.previous_next_text}>&gt;</Text>
			</Pressable>
		</View>
	);
};

export default ButtonsStrip;

const style = StyleSheet.create({
	bg: {
		shadowOffset: { width: 10, height: 0 },
		shadowRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		flexDirection: "row",
		flex: 0.8,
		height: 20,
		borderRadius: 100,
		backgroundColor: colors.ui.bg,
	},

	previous_next_text: {
		color: colors.ui.primary,
		textAlign: "center",
	},
	previous_next: {
		width: 64,
		height: 64,
		borderRadius: 32,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.5,
		textShadowRadius: 20,
		shadowColor: colors.ui.primary,
		color: colors.ui.bg_raised_1,
	},

	zero_one_text: {
		color: colors.ui.text,
		textAlign: "center",
	},
	zero_one: {
		justifyContent: "center",
		alignItems: "center", 
		height: 100,
		width: 100,
		borderRadius: 50,
		marginLeft: 5,
		marginRight: 5,
		backgroundColor: colors.ui.primary,
	},
});
