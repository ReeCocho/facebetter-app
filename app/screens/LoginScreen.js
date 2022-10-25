import {
	StyleSheet,
	useWindowDimensions,
	View,
	Image,
	Text,
	ScrollView,
} from "react-native";
import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { height } = useWindowDimensions();
	const onSignInPressed = () => {
		//TODO check if username and password have been given
        if (username.trim() === '' || password.trim() === '') {
            console.warn("Please Enter Username and Password");    
        } else {
            console.warn("Sing in Pressed"); 
        }
	};
	const onForgotPasswordPressed = () => {
		console.warn("Forgot Password Pressed");
	};
	const onCreateNewAccountPressed = () => {
		console.warn("Create New Account Pressed");
	};

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: "space-between",
				flexDirection: "column",
			}}
			style={{paddingBottom: 20}}
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
					onPress={onForgotPasswordPressed}
					bgColor="#17B84E"
				/>
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
