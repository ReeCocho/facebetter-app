import { StyleSheet, View, Image, Text, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import ProfilePicture from "../assets/images/profilePic.jpg";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import EditProfileButton from "../components/EditProfileButton";
import { useNavigation } from "@react-navigation/native";
import Settings from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen() {
	const [userValues, setUserValues] = useState(null);
	// return of api
	// {"Error": null, "FirstName": "Test", "Following": ["6344e4ea7c568d2a25ed0f6f"], "Id": "634b740db076952180cb8e5a", "LastName": "User", "School": "", "Work": ""}
	useEffect(() => {
		const getProfileData = async () => {
			const JSONuserInfo = await AsyncStorage.getItem("UserInfo");
			const userInfo =
				JSONuserInfo != null ? JSON.parse(JSONuserInfo) : null;
			res = await fetch("http://localhost:8001/api/retrieveprofile", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					_id: userInfo.userId,
				}),
			});
			res = await res.json();
			setUserValues(res);
		};
		getProfileData().catch(console.error);
	}, []);

	const onSettingPressed = () => {
		console.log("settings pressed");
	};
	const onEditProfilePressed = () => {
		console.log("profile edit button pressed");
	};

	return (
		<SafeAreaView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: "space-between",
				flexDirection: "column",
			}}
			style={{ paddingBottom: 20 }}
		>
			{userValues && (
				<View>
					<View style={[styles.profileContainer]}>
						<Image
							source={ProfilePicture}
							style={[styles.profile]}
							resizeMode="contain"
						/>
					</View>

					<Settings
						onPress={onSettingPressed}
						name="settings"
						size={30}
						color={"#000"}
						style={[styles.settingsIcon]}
					/>

					<View styles={styles.editProfileButton}>
						<EditProfileButton
							text={"Edit Profile"}
							onPress={onEditProfilePressed}
						/>
					</View>

					<View style={styles.nameContainer}>
						<Text style={styles.name}>
							{userValues.FirstName + " " + userValues.LastName}
						</Text>
					</View>

					<View style={styles.userNameContainer}>
						<Text>@vaderSux</Text>
					</View>

					<View style={styles.followersContainer}>
						<Text>25 Followers</Text>
					</View>

					<View style={styles.followingContainer}>
						<Text>122 Following</Text>
					</View>

					<View style={styles.textLineView}>
						<View style={styles.line} />
						<View style={styles.line} />
					</View>

					<View style={styles.messagesContainer}>
						<Text>MESSAGES HERE</Text>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: "center",
		padding: 20,
	},
	profileContainer: {
		marginLeft: 20,
		marginTop: 50,
		height: 150,
		width: 150,
		borderRadius: 75,
	},
	profile: {
		height: 150,
		width: 150,
		borderRadius: 75,
	},
	nameContainer: {
		left: 200,
		bottom: 165,
	},
	name: {
		fontSize: 25,
		fontWeight: "bold",
	},
	userNameContainer: {
		left: 200,
		bottom: 160,
	},
	settingsIcon: {
		marginLeft: 375,
		bottom: 150,
	},
	followersContainer: {
		marginLeft: 200,
		bottom: 145,
	},
	followingContainer: {
		marginLeft: 310,
		bottom: 162,
	},
	textLineView: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		bottom: 130,
	},
	line: {
		flex: 1,
		borderBottomColor: "black",
		borderBottomWidth: 2,
	},
	messagesContainer: {
		alignItems: "center",
	},
});
