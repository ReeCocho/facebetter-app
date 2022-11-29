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

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { height } = useWindowDimensions();
	const navigation = useNavigation();
	const { setjwtToken, setProfile, ...loginContext } = useContext(LoginStatusProvider);

	const onSignInPressed = async () => {
		//todo implement form checking
		if (username.trim() === "" || password.trim() === "") {
			console.warn("Please Enter Username and Password");
			return;
		}
		try {
			let response = await signIn(username, password);
			// let response = await signIn("test01", "test");
			if (response.Error !== null) {
                console.log(response.Error)
                if (response.Error === "Please verify your email account.") { 
                    navigation.navigate("VerifyEmailScreen");
                    return
                }
				Alert.alert(response.Error, "", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
				return;
			}
			//get profile
			token = await AsyncStorage.getItem("token");
			response = await fetchUser(jwtDecode(token)["userId"]);
			if (response.Error !== null) {
				Alert.alert(response.Error, "", [{ text: "OK", onPress: () => console.log("OK Pressed") }]);
				console.log("Error getting user profile", response.Error);
				return;
			}
			const { Error, ...profile } = response;
			setProfile(profile);
			setjwtToken(token);
		} catch (error) {
			Alert.alert("Something Went Wrong", "Please Try Again Later", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
			console.error(error);
			return;
		}
	};

	const onForgotPasswordPressed = () => {
		navigation.navigate("ResetPasswordScreen");
	};

	const onCreateNewAccountPressed = () => {
		navigation.navigate("RegisterScreen");
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
				<CustomInput onChangeText={setUsername} value={username} placeholder="Enter Your Username" />
				<CustomInput
					//todo change autocapitalize to none
					onChangeText={setPassword}
					value={password}
					placeholder="Enter Your Password"
					secureTextEntry={true}
				/>
				<CustomButton text={"Log In"} onPress={onSignInPressed} />
				<CustomButton text={"Forgot Password"} onPress={onForgotPasswordPressed} type="TERTIARY" />
				<View style={styles.textLineView}>
					<View style={styles.line} />
					<Text style={styles.text}>or</Text>
					<View style={styles.line} />
				</View>
				<CustomButton text={"Create new Account"} onPress={onCreateNewAccountPressed} bgColor="#17B84E" />
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
	textLineView: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	text: {
		textAlign: "center",
		flex: 0.2,
		padding: 10,
	},
	line: {
		flex: 1,
		borderBottomColor: "black",
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	copyrightText: {
		flex: 1,
		justifyContent: "flex-end",
		color: "#A0A0A0",
	},
});
