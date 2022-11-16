import { StyleSheet, View, Image, Text, SafeAreaView, Alert } from "react-native";
import React, { useState, useContext } from "react";
import ProfilePicture from "../assets/images/profilePic.jpg";
import EditProfileButton from "../components/EditProfileButton";
import { useNavigation } from "@react-navigation/native";
import Settings from "react-native-vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import LoginStatusProvider from "../context/LoginStatusProvider";

export default function ProfileScreen() {
	const [image, setImage] = useState(null);
	const navigation = useNavigation();
	const { profile, setProfile, setIsSigningOut, ...loginContext } = useContext(LoginStatusProvider);

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

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
			{profile && (
				<View>
					<View style={[styles.profileContainer]}>
						<Image
							source={image == null ? ProfilePicture : { uri: image }}
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
						<EditProfileButton text={"Edit Profile"} onPress={pickImage} />
					</View>

					<View style={styles.nameContainer}>
						<Text style={styles.name}>{profile.FirstName + " " + profile.LastName}</Text>
					</View>

					<View style={styles.userNameContainer}>
						<Text>@vaderSux</Text>
					</View>

					<View style={styles.followersContainer}>
						<Text>25 Followers</Text>
					</View>

					<View style={styles.followingContainer}>
						<Text>{profile.Following.length} Following</Text>
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
