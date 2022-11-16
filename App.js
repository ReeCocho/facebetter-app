import { SafeAreaView, StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import StackNavigator from "./app/navigation/index.js";
import { LoginStatusProvider } from "./app/context/LoginStatusProvider";

const App = () => {
	return (
		<LoginStatusProvider>
			<SafeAreaView style={styles.root}>
				<StackNavigator />
			</SafeAreaView>
		</LoginStatusProvider>
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
