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
import FollowersScreen from "../screens/FollowersScreen";
import FollowingScreen from "../screens/FollowingScreen";
import SearchScreen from "../screens/SearchScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ViewProfileScreen from "../screens/ViewProfileScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChannelScreen from "../screens/ChannelScreen";

export default StackNavigator = () => {
	const Stack = createNativeStackNavigator();
	const { jwtToken, isSigningOut, isLoading } = useContext(LoginStatusProvider);
	if (isLoading) {
		return <AppLoader />;
	}
    //todo create loading indicator, get receive messages working, update the preview of convo 
    

	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{jwtToken !== null ? (
					<>
						<Stack.Screen name="ProfileScreen" component={ProfileScreen} />
						<Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
						<Stack.Screen name="FollowersScreen" component={FollowersScreen} />
						<Stack.Screen name="FollowingScreen" component={FollowingScreen} />
						<Stack.Screen name="SearchScreen" component={SearchScreen} />
						<Stack.Screen
							name="ViewProfileScreen"
							component={ViewProfileScreen}
							options={{ title: "UserId" }}
						/>
                        <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{headerShown: true}}/>
                        <Stack.Screen name="ChannelScreen" component={ChannelScreen} options={{headerShown: true}}/>
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
