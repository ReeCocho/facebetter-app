import {
	StyleSheet,
	useWindowDimensions,
	View,
	Image,
	Text,
	ScrollView,
	Alert,
} from "react-native";
import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { height } = useWindowDimensions();
    const navigation = useNavigation();
	const onSignInPressed = async () => {
		if (username.trim() === "" || password.trim() === "") {
			console.warn("Please Enter Username and Password");
			return;
		}
		let res;
		try {
			res = await fetch("http://localhost:8001/api/login", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					login: username.toLowerCase(),
					password: password,
				}),
			});
			res = await res.json();
		} catch (error) {
			Alert.alert("Something Went Wrong", "Please Try Again Later", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
			console.error(error);
			return;
		}
		if (res.id !== -1) {
            //navigate to home
            // navigation.navigate("TestScreen");
		} else {
			Alert.alert("Incorrect Username or Password", "Please Try Again", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
		}
	};
	const onForgotPasswordPressed = () => {
		console.warn("Forgot Password Pressed");
	};
	const onCreateNewAccountPressed = () => {
		console.warn("Create New Account Pressed");
	};

	return (
		<LinearGradient colors={["#488ED4", "white"]} style={styles.linearGradient}>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					flexDirection: "column",
				}}
				style={{ paddingBottom: 20 }}
			>
				<View style={styles.root}>
					<Image
						source={Logo}
						style={[styles.logo, { height: height * 0.3 }]}
						resizeMode="contain"
					/>
					<CustomInput
						onChangeText={setUsername}
						value={username}
						placeholder="Enter Your Username"
					/>
					<CustomInput
						onChangeText={setPassword}
						value={password}
						placeholder="Enter Your Password"
						secureTextEntry={true}
					/>
					<CustomButton text={"Log In"} onPress={onSignInPressed} />
					<CustomButton
						text={"Forgot Password"}
						onPress={onForgotPasswordPressed}
						type="TERTIARY"
					/>
					<View style={styles.textLineView}>
						<View style={styles.line} />
						<Text style={styles.text}>or</Text>
						<View style={styles.line} />
					</View>
					<CustomButton
						text={"Create new Account"}
						onPress={() => navigation.navigate("RegisterScreen")}
						bgColor="#17B84E"
					/>
					<View style={styles.copyrightText} >
						<Text>Group 8 ⓒ 2022</Text>
					</View>
				</View>
			</ScrollView>
		</LinearGradient>
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
	linearGradient: {
		flex: 1,
	}
});
