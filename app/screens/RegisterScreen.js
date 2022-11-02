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

export default function LoginScreen() {
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [school, setSchool] = useState("");
	const [work, setWork] = useState("");
	const { height } = useWindowDimensions();
	const onCreateAccountPressed = async () => {

		console.warn("Create account Pressed");
		
		//check if firstname is entered
		if(firstName.trim() === "") {
			console.warn("Please enter your First Name");
		}
		//check if lastname is entered
		if(lastName.trim() === "") {
			console.warn("Please enter your Last Name");
		}
		//check if username is entered
		if(username.trim() === "") {
			console.warn("Please enter an Username");
		}
		//check if password is entered
		if(password.trim() === "") {
			console.warn("Please enter a Password");
		}


		//send sign up info
		let res;
		try {
			res = await fetch("http://localhost:8001/api/register", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Login: username.toLowerCase(),
					Password: password,
					FirstName: firstName,
					LastName: lastName,
					School: school,
					Work: work,
				})
			});
			res = await res.json();
		} catch (error) {
			Alert.alert("Cannot Create Account", "Please try again later", [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);

			console.error(error);
			return;
		}

		//account successfully created
		if(res.Error === null) {
			console.warn("Account Created");
		} else {
			Alert.alert("Cannot Create Account", JSON.stringify(res.Error).replace(/['"]+/g, ''), [
				{ text: "OK", onPress: () => console.log("OK Pressed") },
			]);
			console.error(res.Error);
			return;
		}
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
					onChangeText={setFirstName}
					value={firstName}
					placeholder="Enter Your First Name"
				/>
				<CustomInput
					onChangeText={setLastName}
					value={lastName}
					placeholder="Enter Your Last Name"
				/>

                <CustomInput
					onChangeText={setUsername}
					value={username}
					placeholder="Choose Your Username"
				/>

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

				<CustomInput
					onChangeText={setWork}
					value={work}
					placeholder="What's your occupation? (optional)"
				/>


				<CustomButton text={"Create Account"} onPress={onCreateAccountPressed} />
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
	copyrightText: {
		flex: 1,
		justifyContent: "flex-end",
		color: "#A0A0A0",
	},
});


