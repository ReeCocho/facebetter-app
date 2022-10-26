import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
			</Stack.Navigator>
		</NavigationContainer>
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

export default Navigation;
