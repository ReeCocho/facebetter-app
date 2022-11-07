import { SafeAreaView, StyleSheet, Button, Text, View } from "react-native";
import Navigation from "./app/navigation/index";
import React from "react";

const App = () => {
	return (

		<SafeAreaView style={styles.root}>
			<Navigation />
		</SafeAreaView>

	);
};

const styles = StyleSheet.create({ 
	root: {
		flex: 1,
		//backgroundColor: "#F9FBFC",
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
