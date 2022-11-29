import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import settings from "../assets/images/settings.png";
import ProfilePicture from "../assets/images/profilePic.jpg";

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
			<View>
                <Image source={ProfilePicture}/>
            </View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: "65%",
		padding: 10,
		marginVertical: 15,
		alignItems: "center",
		borderRadius: 5,
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