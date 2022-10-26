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
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { height } = useWindowDimensions();
	const onCreateAccountPressed = () => {
		//TODO check if username and password have been given
		console.warn("Create account Pressed");
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


