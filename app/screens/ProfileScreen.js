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
				style={{height: height / 4.3, borderBottomWidth: "2px", borderBottomColor: "black"}}
			>
				{profile && (
					<View style={{flex: 1}}>
						<View style={[styles.profilePicContainer]}>
							<Image
								source={ProfilePicture}
								style={[styles.profilePic]}
								resizeMode="contain"
							/>
						</View>



						<View style={[styles.profileNamesContainer]}>
							<View style={styles.nameContainer}>
								<Text style={styles.name}>
									{profile.FirstName + " " + profile.LastName}
								</Text>
							</View>

							<View style={styles.userNameContainer}>
								<Text>{"@" + profile.Id}</Text>
							</View>

							<View >
								<EditProfileButton
									text={"Edit Profile"}
									onPress={onEditProfilePressed}
								/>
							</View>
						</View>

						
						<View style={styles.followInfoContainer}>
							<View style={{
								position: "relative",
								flexDirection: "row",
								justifyContent: "flex-start",
								width: widthPercentageToDP(80),
							}}>
								<Text style={{fontSize: height * .018, fontWeight: "bold"}}>{profile.Followers}</Text>
								<Text style={{fontSize: height * .018}}> Followers</Text>
							</View>

							<View style={{
								position: "relative",
								flexDirection: "row",
								justifyContent: "flex-start",
								width: widthPercentageToDP(80),
							}}>
								<Text style={{fontSize: height * .018, fontWeight: "bold"}}>{profile.Following}</Text>
								<Text style={{fontSize: height * .018}}> Following</Text>
							</View>					
						</View>


						
						<View style={styles.workSchoolContainer}>
							
							<Work
								name="work"
								size={height * .025}
								color={"#000"}
							/> 

							<View style={styles.work}>
								<Text style={{fontSize: height * .015}}>{profile.Work}</Text>
							</View>
							
							<School
								name="school"
								size={height * .025}
								color={"#000"}
							/>

							<View style={styles.school}>
								<Text style={{fontSize: height * .015}}>{profile.School}</Text>
							</View>
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
		padding: 20,
	},
	profilePicContainer: {
		left: 10,
		top: 12,
		// flex: 1,
		// height: 100,
		// width: 100,
		// borderRadius: 50,
	},
	profilePic: {
		height: height / 9,
		width: height / 9,
		borderRadius: height / 4.5,
	},
	profileNamesContainer: {
		// flex: 1,
		width: "70%",
		height: height / 9.5,
		marginLeft: width / 3.5,
		marginTop: scale(-70),
		position: "relative",
	},
	nameContainer: {
		left: 10,
		top: 10,
	},
	name: {
		fontSize: height * .03,
		fontWeight: "bold",
	},
	userNameContainer: {
		left: 10,
		top: 10,
	},
	followInfoContainer: {
		width: widthPercentageToDP(80),
		flex: .3,
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
		left: 6,
		top: 50
	},
	workSchoolContainer: {
		position: "relative",
		flex: .29,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		height: heightPercentageToDP(0),
		width: widthPercentageToDP(98),
		left: 6,
		top: -15
	},
	work: {
		left: -19,
		marginTop: 4
	},
	school: {
		left: -18,
		marginTop: 4
	},
	messagesContainer: {
		backgroundColor: "orange",
		top: 70,
		alignItems: "center",
		alignSelf: "center",
		width: widthPercentageToDP(90)
	},
	textLineView: {
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		height: height * .5
	},
	line: {
		flex: 1,
		borderBottomColor: "black",
		borderBottomWidth: 2,
	},
});
