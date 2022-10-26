import { SafeAreaView, StyleSheet, Button, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";
import { LinearGradient } from "expo-linear-gradient";
import Navigation from "./app/navigation/index";
import React from "react";

const App = () => {
	return (
		<LinearGradient colors={["#99ccff", "white"]} style={styles.background}>
			<SafeAreaView style={styles.root}>
				<Navigation />
			</SafeAreaView>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		// backgroundColor: "#F9FBFC",
	},
	background: {
		flex: 1,
	},
	text: {
		backgroundColor: "transparent",
		fontSize: 15,
		color: "black",
	},
});

export default App;
