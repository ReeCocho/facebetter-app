import { StyleSheet, View, Image, Text, SafeAreaView, Dimensions, Alert, ScrollView } from "react-native";
import React, { useState, useContext } from "react";
import ProfilePicture from "../assets/images/profilePic.jpg";
import EditProfileButton from "../components/EditProfileButton";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import LoginStatusProvider from "../context/LoginStatusProvider";
import { moderateScale, scale } from "react-native-size-matters";
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import Work from "react-native-vector-icons/MaterialIcons";
import School from "react-native-vector-icons/Ionicons";
import FollowersScreen from "./FollowersScreen";
import FollowingScreen from "./FollowingScreen";
import EditProfileScreen from "./EditProfileScreen";

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

export default function ProfileScreen() {
	const [image, setImage] = useState(null);
	const navigation = useNavigation();
	const { profile, setProfile, setIsSigningOut, ...loginContext } = useContext(LoginStatusProvider);

	const onEditProfilePressed = () => {
		console.log("edit profile pressed");
		navigation.navigate("EditProfileScreen");

	};

	return (
		<ScrollView>
			<SafeAreaView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "space-between",
					flexDirection: "column",
				}}
				style={{height: height}}
			>
				{profile && (
					<View style={styles.root}>
						<View style={[styles.profilePicContainer]}>
							<Image
								source={{uri: profile.ProfilePicture}}
								style={[styles.profilePic]}
								resizeMode="contain"
							/>
						</View>

				
						<View style={styles.nameContainer}>
							<Text style={styles.name}>
								{profile.FirstName + " " + profile.LastName}
							</Text>
						</View>

						<View style={styles.userNameContainer}>
							<Text>{"@" + profile.Id}</Text>
						</View>


					
						
						<View style={styles.workContainer}>	
							<Work
								name="work"
								size={height * .035}
								color={"#000"}
							/> 

							<View style={styles.work}>
								<Text style={{fontSize: height * .02, marginLeft: scale(7)}}>{profile.Work}</Text>
							</View>
						</View>

						<View style={styles.schoolContainer}>
							<School
								name="school"
								size={height * .035}
								color={"#000"}
							/>

							<Text style={{fontSize: height * .02, marginLeft: scale(7)}}>{profile.School}</Text>
						</View>


						<View 
							style={styles.followersContainer}
							onStartShouldSetResponder={() => navigation.navigate(FollowersScreen)}>
								<Text style={{fontSize: height * .018, fontWeight: "bold"}}>{profile.Followers.length}</Text>
								<Text style={{fontSize: height * .018}}> Followers</Text>
						</View>

						<View 
							style={styles.followingContainer}
							onStartShouldSetResponder={() => navigation.navigate(FollowingScreen)}>
								<Text style={{fontSize: height * .018, fontWeight: "bold"}}>{profile.Following.length}</Text>
								<Text style={{fontSize: height * .018}}> Following</Text>
						</View>

						<View >
							<EditProfileButton
								text={"Edit Profile"}
								onPress={onEditProfilePressed}
							/>
						</View>
					</View>
				)}
			</SafeAreaView>


		</ScrollView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1,
		alignItems: "center",
		flexDirection: "column"
	},
	profilePicContainer: {
		marginTop: 30,
		height: height/4,
		width: height/4,
		borderRadius: height/2,
		backgroundColor: "gray"
	},
	profilePic: {
		height: height / 4,
		width: height / 4,
		borderRadius: height / 2,
	},
	profileNamesContainer: {
		alignItems: "center",
		width: "70%",
		marginTop: scale(15),
		position: "relative",
	},
	nameContainer: {
		marginTop: scale(20),
		alignItems: "center",
		width: widthPercentageToDP(100)
	},
	name: {
		fontSize: height * .03,
		fontWeight: "bold",
	},
	userNameContainer: {
		marginTop: scale(10)
	},
	workContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: scale(10)
	},
	schoolContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: scale(10)
	},
	followersContainer: {
		marginTop: scale(10),
		flexDirection: "row"
	},
	followingContainer: {
		marginTop: scale(10),
		flexDirection: "row"
	}
});
