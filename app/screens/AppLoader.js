import { View, StyleSheet, Image } from "react-native";
import React from "react";
import Logo from "../assets/images/Logo.png";

export default function AppLoader() {
	return (
		<View style={[StyleSheet.absoluteFillObject, styles.container]}>
			<Image source={Logo} resizeMode="contain" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#F9FBFC",
		justifyContent: "center",
		alignItems: "center",
	},
});
