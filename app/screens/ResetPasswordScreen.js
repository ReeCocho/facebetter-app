import { StyleSheet, useWindowDimensions, View, Image, Text, ScrollView, Alert } from "react-native";
import React, { useState, useContext } from "react";
import Logo from "../assets/images/Logo.png";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { checkEmail} from "../api/user.js";
import LoginStatusProvider from "../context/LoginStatusProvider";

export default function LoginScreen() {
	const [email, setEmail] = useState("");
	const { height } = useWindowDimensions();
	const navigation = useNavigation();
	const { setjwtToken, setProfile, ...loginContext } = useContext(LoginStatusProvider);
	const onSendLoginLink = async () => {
        try {
            const response = await checkEmail(email);
        } catch (error) {
            
        }
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

				<Text style={styles.primaryText}>Trouble Logging In? </Text>
				<Text style={styles.secondaryText}>
					Enter your email, phone, or username and we'll send you a link to get back into your account.
				</Text>

				<CustomInput onChangeText={setEmail} value={email} placeholder="Enter Your Email" />

				<CustomButton text={"Send Login Link"} onPress={onSendLoginLink} />

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
        fontWeight: 'bold',
	},
	secondaryText: {
		textAlign: "center",
		padding: 10,
        color: 'gray',
	},
	copyrightText: {
		flex: 1,
		justifyContent: "flex-end",
		color: "#A0A0A0",
	},
});
