import { SafeAreaView, StyleSheet, Button, Text, View } from "react-native";
import LoginScreen from "./app/screens/LoginScreen";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

const App = () => {
	return (
		<SafeAreaView style={styles.root}>
			<LinearGradient
				colors={["#99ccff", "white"]}
				style={styles.background}
			>
				<LoginScreen />
			</LinearGradient>
		</SafeAreaView>
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
