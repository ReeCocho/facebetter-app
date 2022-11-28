import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import React from "react";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

const CustomButton = ({
	onPress,
	text,
	type = "PRIMARY",
	bgColor,
	fgColor,
	padding,
}) => {
	return (
		<Pressable
			onPress={onPress}
			style={[
				styles.container,
				styles["container_" + type],
				bgColor ? { backgroundColor: bgColor } : {},
				padding ? { padding: padding } : {},
			]}
		>
			<Text
				style={[
					styles.text,
					styles["text_" + type],
					fgColor ? { color: fgColor } : {},
				]}
			>
				{text}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: width * .62,
		height: height * .035,
		padding: 6,
		borderRadius: 5,
		marginLeft: 9,
		top: 18,
		alignItems: "center"
	},
	container_PRIMARY: {
		backgroundColor: "#2F97C9",
	},
	container_SECONDARY: {
		borderColor: "#1757B8",
		borderWidth: 2,
	},
	container_TERTIARY: {
		padding: 0,
	},
	text: {
		fontWeight: "bold",
		color: "white",
	},
	text_SECONDARY: {
		color: "#1757B8",
	},
	text_TERTIARY: {
		color: "#1757B8",
	},
});

export default CustomButton;
