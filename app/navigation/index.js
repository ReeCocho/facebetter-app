import { StyleSheet } from "react-native";
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AppLoader from "../screens/AppLoader";
import LoginStatusProvider from "../context/LoginStatusProvider";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import VerifyEmailScreen from "../screens/VerifyEmailScreen";

export default StackNavigator = () => {
	const Stack = createNativeStackNavigator();
	const { jwtToken, isSigningOut, isLoading } = useContext(LoginStatusProvider);
	if (isLoading) {
		return <AppLoader />;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{jwtToken !== null ? (
					<>
						<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                        <Stack.Screen name="EditProfileScreen" component={ProfileScreen} />
					</>
				) : (
					<>
						<Stack.Screen
							name="LoginScreen"
							component={LoginScreen}
							options={{ animationTypeForReplace: isSigningOut ? "pop" : "push" }}
						/>
						<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
                        {/* <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} /> */}
                        <Stack.Screen name="VerifyEmailScreen" component={VerifyEmailScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		backgroundColor: "#F9FBFC",
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

