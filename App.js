import { SafeAreaView, StyleSheet, Button, Text, View } from "react-native";
import React from "react";
import StackNavigator from "./app/navigation/index.js";
import { LoginStatusProvider } from "./app/context/LoginStatusProvider";
import { ChannelsStatusProvider } from "./app/context/ChannelsStatusProvider";

const App = () => {
	return (
		<LoginStatusProvider>
			<ChannelsStatusProvider>
				<SafeAreaView style={styles.root}>
					<StackNavigator />
				</SafeAreaView>
			</ChannelsStatusProvider>
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
