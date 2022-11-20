import { StyleSheet, useWindowDimensions, View, Image, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import Logo from "../assets/images/Logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { LinearGradient } from "expo-linear-gradient";
import { signUp } from "../api/user.js";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [school, setSchool] = useState("");
	const [work, setWork] = useState("");
	const [email, setEmail] = useState("");
	const { height } = useWindowDimensions();
    const navigation = useNavigation();

	const onCreateAccountPressed = async () => {
		//check if firstname is entered
		if (firstName.trim() === "" || lastName.trim() === "" || username.trim() === "" || password.trim() === "") {
			Alert.alert("Please Enter All Required Fields", "", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
			return;
		}
		//send sign up info
		try {
			const response = await signUp(username, password, email, firstName, lastName, school, work);
			//account successfully created
            console.log(response);
			if (response.Error === null) {
                navigation.navigate("VerifyEmailScreen");
			} else {
				Alert.alert("Cannot Create Account", JSON.stringify(response.Error).replace(/['"]+/g, ""), [
					{ text: "OK", onPress: () => console.log("OK Pressed") },
				]);
				console.error(response.Error);
				return;
			}
		} catch (error) {
			Alert.alert("Something Went Wrong", "Please try again later", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
			console.error(error);
			return;
		}
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
					<Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />
					<CustomInput onChangeText={setFirstName} value={firstName} placeholder="Enter Your First Name" />
					<CustomInput onChangeText={setLastName} value={lastName} placeholder="Enter Your Last Name" />
	
					<CustomInput onChangeText={setUsername} value={username} placeholder="Choose Your Username" />

					<CustomInput onChangeText={setEmail} value={email} placeholder="Enter Your Email" />

					<CustomInput
						onChangeText={setPassword}
						value={password}
						placeholder="Chose Your Password"
						secureTextEntry={true}
					/>

					<CustomInput
						onChangeText={setSchool}
						value={school}
						placeholder="Where did you go to school? (optional)"
					/>

					<CustomInput onChangeText={setWork} value={work} placeholder="What's your occupation? (optional)" />

					<CustomButton text={"Create Account"} onPress={onCreateAccountPressed} />
					<View style={styles.copyrightText}>
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
	copyrightText: {
		flex: 1,
		justifyContent: "flex-end",
		color: "#A0A0A0",
	},
});
