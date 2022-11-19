import React, { useState, useContext } from "react";
import { Dimensions, StyleSheet, View, Image, ScrollView, } from "react-native";
import CustomInput from "../components/CustomInput";
import ProfilePicture from "../assets/images/profilePic.jpg";
import LoginStatusProvider from "../context/LoginStatusProvider";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import editProfile from "../api/user";
import * as ImagePicker from "expo-image-picker";


var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const EditProfileScreen = () => {
    const { profile, setProfile, setIsSigningOut, jwtToken, ...loginContext } = useContext(LoginStatusProvider);
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [school, setSchool] = useState("");
	const [work, setWork] = useState("");
    const navigation = useNavigation();

    const onSaveEdits = () => {
		console.log("save changes pressed");

        //this might need to be fixed

        editProfile(profile.Id, firstName, lastName, school, work, jwtToken);
		navigation.navigate("ProfileScreen");
	};

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

    return(
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                flexDirection: "column",
            }}
            style={{ paddingBottom: 20, backgroundColor: "#D9DDD9" }}
        >
            <View style={styles.root}>
                <Image source={ProfilePicture} style={styles.profilePic} />
                <CustomInput onChangeText={setFirstName} value={firstName} placeholder={profile.firstName} />
                <CustomInput onChangeText={setLastName} value={lastName} placeholder={profile.lastName} />

                <CustomInput onChangeText={setSchool} value={school} placeholder={profile.school} />

                <CustomInput onChangeText={setWork} value={work} placeholder={profile.work} />

                <CustomButton text={"Save Changes"} onPress={onSaveEdits} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
		alignItems: "center",
		padding: 20,
    },
    infoView: {
        flex: 4,
    },
    profilePicContainer: {
        flex: 1,
	},
	profilePic: {
		height: height / 5,
		width: height / 5,
		borderRadius: height / 2.5,
	},
});

export default EditProfileScreen;