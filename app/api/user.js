import * as Crypto from "expo-crypto";
import { CryptoDigestAlgorithm } from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signIn = async (username, password) => {
    //todo return something in the catch block
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

export const signUp = async (username, password, email, firstName, lastName, school, work) => {
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
				Email: email,
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

export const editProfile = async (Id, firstName, lastName, school, work, jwt) => {
	try {
		let response = await fetch("http://localhost:8001/api/editprofile", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				_id: Id,
				FirstName: firstName,
				LastName: lastName,
				School: school,
				Work: work,
				JwtToken: jwt
			}),
		});
		response = await response.json();
		return response;
	} catch (error) {
		console.log("error within edit profile call ", error.message);
	}
};

export const validateJWT = async (jwt) => { //returns refreshed jwt token
    if (jwt == null) { 
        return null;
    }
    try {
		let response = await fetch("http://localhost:8001/api/verifytoken", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({				
				JwtToken: jwt
			}),
		});
		response = await response.json();
        if (response.Error != null) {
            return response
        }
        const token = response["JwtToken"]["accessToken"];
		await AsyncStorage.setItem("token", token);
		return token;
	} catch (error) {
		console.log("error within validate JWT call ", error.message);
	}
};
export const checkEmail = async (email) => { //returns refreshed id of email if found
    try {
		let response = await fetch("http://localhost:8001/api/checkemail", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({				
				Email: email
			}),
		});
		response = await response.json();
        if (response.Error != null) {
            return response
        }
        return response["_id"];
	} catch (error) {
		console.log("error within checkEmail call ", error.message);
	}
};
export const searchProfiles = async (query) => {
	try {
		let response = await fetch("http://localhost:8001/api/searchprofiles", {
			method: "POST",
			headers: {
				Accept: "applicaation/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				search: query
			}),
		});
		response = await response.json();
		return response;
	} catch (error) {
		console.log("error within searchProfileData call ", error.message);
	}
};