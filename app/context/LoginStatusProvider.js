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
		const retrieveAppStatus = async () => {
			setIsLoading(true);
			let token = null;
			//comment this try catch block to remove auto login
			// try {
            //     token = await AsyncStorage.getItem("token");
			// } catch (error) {
			// 	console.log("error fetching token ", error);
			// }
			if (token !== null) {
                let response = await validateJWT(token);
                if (response.Error != null) {
                    console.log("Error verifying jwt token", response.Error);
					setjwtToken(null);
					setIsLoading(false);
					return;
                }
                token = jwtDecode(response);
				response = await fetchUser(token.userId);
				if (response.Error !== null) {
					console.log("Error getting user profile", response.Error);
					setjwtToken(null);
					setIsLoading(false);
					return;
				}
				const { Error, ...profile } = response;
				setProfile(profile);
				setjwtToken(token);
			} else { 
                setIsLoading(false);
                setProfile(null);
                setjwtToken(null);
            }
			setIsLoading(false);
		};
		retrieveAppStatus();
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
