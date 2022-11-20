import { StyleSheet, useWindowDimensions, View, Image, Text, ScrollView, Alert } from "react-native";
import React, { useState, useContext } from "react";
import Logo from "../assets/images/Logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { signIn, fetchUser } from "../api/user.js";
import LoginStatusProvider from "../context/LoginStatusProvider";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen";

export default function VerifyEmailScreen() {
	const { height } = useWindowDimensions();
	const navigation = useNavigation();
	const { setjwtToken, setProfile, ...loginContext } = useContext(LoginStatusProvider);

	const onReturnToLoginPressed = () => {
		navigation.popToTop();
	};

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: "space-between",
				flexDirection: "column",
			}}
			style={{ paddingBottom: 20 }}
		>
			<View style={styles.root}>
				<Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

				<Text style={styles.primaryText}>Please Verify Your Email </Text>
				<Text style={styles.secondaryText}>
					We have sent an email to the email provided. Please click the link in the email to verify you email. Once you
					have done so, you may come back to login.
				</Text>

				<CustomButton text={"Return To Login Screen"} onPress={onReturnToLoginPressed} />

				<View style={styles.copyrightText}>
					<Text>Group 8 ⓒ 2022</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	logo: {
		width: "70%",
		maxWidth: 300,
		maxHeight: 200,
	},
	primaryText: {
		textAlign: "center",
		padding: 10,
		fontWeight: "bold",
	},
	secondaryText: {
		textAlign: "center",
		padding: 10,
		color: "gray",
	},
	copyrightText: {
		flex: 1,
		justifyContent: "flex-end",
		color: "#A0A0A0",
	},
});
