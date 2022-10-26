import {
	StyleSheet,
	useWindowDimensions,
	View,
	Image,
	Text,
	ScrollView,
	Alert,
} from "react-native";
import React, { useState } from "react";

export default function TestScreen() {
	
	return (
		<Text> Hello Home</Text>
	);
}
const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	logo: {
		width: "70%",
		maxWidth: 300,
		maxHeight: 200,
	},
	textLineView: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	text: {
		textAlign: "center",
		flex: 0.2,
		padding: 10,
	},
	line: {
		flex: 1,
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	copyrightText: {
		flex: 1,
		justifyContent: "flex-end",
		color: "#A0A0A0",
	},
});
