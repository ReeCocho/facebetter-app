import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

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
		width: "25%",
		padding: 10,
		borderRadius: 5,
		marginLeft: 220,
		bottom: 182
	},
	container_PRIMARY: {
		backgroundColor: "#1757B8",
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
