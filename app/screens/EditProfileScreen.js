import React, { useState, useContext, useEffect } from "react";
import { Dimensions, StyleSheet, View, Image, ScrollView, Text} from "react-native";
import CustomInput from "../components/CustomInput";
import LoginStatusProvider from "../context/LoginStatusProvider";
import CustomButton from "../components/CustomButton";
import { useNavigation, StackActions } from "@react-navigation/native";
import { editProfile } from "../api/user";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChevronLeft from "react-native-vector-icons/Feather";

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const EditProfileScreen = () => {
    const { profile, setProfile, setIsSigningOut, jwtToken, ...loginContext } = useContext(LoginStatusProvider);
    const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [school, setSchool] = useState("");
	const [work, setWork] = useState("");
    const navigation = useNavigation();
    const popAction = StackActions.pop(1);


    const onSaveEdits = () => {

        (async () => {
            const token = await AsyncStorage.getItem("token");
            const res = await editProfile(profile.Id, firstName, lastName, school, work, token);
            
            navigation.dispatch(popAction);
        })();
	};


    return(
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "space-between",
                flexDirection: "column",
            }}
            style={{ paddingBottom: 20,}}
        >
            <View style={{flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: "2px"}}>
                    <ChevronLeft
                        name="chevron-left"
                        size={height *.04}
                        color={"#2F97C9"}
                        onPress={() => navigation.dispatch(popAction)}
                    />

                    <Text style={{marginLeft: width*.3, marginTop: 5, fontSize: height*.025, color: "#2F97C9"}}>Edit Profile</Text>

            </View>


            <View style={styles.root}>
                
                <Image source={{uri: profile.ProfilePicture}} style={styles.profilePic}/>

                <CustomInput onChangeText={setFirstName} value={firstName} placeholder={profile.FirstName} />
                <CustomInput onChangeText={setLastName} value={lastName} placeholder={profile.LastName} />

                <CustomInput onChangeText={setSchool} value={school} placeholder={profile.School} />

                <CustomInput onChangeText={setWork} value={work} placeholder={profile.Work} />

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
        alignItems: "center",
        height: height/5,
        width: height/5,
        borderRadius: height /2.5
	},
	profilePic: {
		height: height / 5,
		width: height / 5,
		borderRadius: height / 2.5,
	},
});

export default EditProfileScreen;