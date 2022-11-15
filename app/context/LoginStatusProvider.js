import React, { createContext, useState, useEffect } from "react";
import { validateJWT, fetchUser } from "../api/user.js";
import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext();

export function LoginStatusProvider({ children }) {
	const [jwtToken, setjwtToken] = useState(null);
	const [isSigningOut, setIsSigningOut] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const tmp = async () => {
			setIsLoading(true);
			let token = null;
			//comment this try catch block to remove auto login
			try {
				token = jwtDecode(await AsyncStorage.getItem("token"));
			} catch (error) {
				console.log("error fetching token ", error);
			}

			if (token !== null) {
				//todo check to see if it valid
				const response = await fetchUser(token.userId);
				if (response.Error !== null) {
					console.log("Error getting user profile", response.Error);
					setjwtToken(null);
					setIsLoading(false);
					return;
				}
				const { Error, ...profile } = response;
				console.log(profile);
				setProfile(profile);
				setjwtToken(token);
			}
			setIsLoading(false);
		};
		tmp();
	}, []);

	return (
		<LoginContext.Provider
			value={{
				jwtToken,
				setjwtToken,
				isSigningOut,
				setIsSigningOut,
				isLoading,
				setIsLoading,
				profile,
				setProfile,
			}}
		>
			{children}
		</LoginContext.Provider>
	);
}

export default LoginContext;
