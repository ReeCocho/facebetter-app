import * as Crypto from "expo-crypto";
import { CryptoDigestAlgorithm } from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (username, password) => {
	try {
		let response = await fetch("http://localhost:8001/api/login", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Login: username.toLowerCase(),
				Password: await Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, password),
			}),
		});
		response = await response.json();
		if (response.Error !== null) {
			return response;
		}
		const token = response["JwtToken"]["accessToken"];
		await AsyncStorage.setItem("token", token);
		return response;
	} catch (error) {
		console.log("error within sign in method", error.message);
	}
};

export const signUp = async (username, password, firstName, lastName, school, work) => {
	try {
		let response = await fetch("http://localhost:8001/api/register", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Login: username.toLowerCase(),
				Password: await Crypto.digestStringAsync(CryptoDigestAlgorithm.SHA256, password),
				FirstName: firstName,
				LastName: lastName,
				School: school,
				Work: work,
			}),
		});
		response = await response.json();
		return response;
	} catch (error) {
		console.log("error within sign up call ", error.message);
	}
};

export const fetchUser = async (id) => {
	//might need to check the behavior when a token expires
	try {
		let response = await fetch("http://localhost:8001/api/retrieveprofile", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				_id: id,
			}),
		});
		response = await response.json();
		return response;
	} catch (error) {
		console.log("error within getProfileData call ", error.message);
	}
};

export const validateJWT = async (jwt) => {};
