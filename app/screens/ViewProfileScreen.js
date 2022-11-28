import React, { useState, useContext, useEffect } from "react";
import { Dimensions, StyleSheet, View, Image, ScrollView, Text, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchUser, unfollow, follow } from '../api/user';
import { SafeAreaView } from "react-native-safe-area-context";
import { scale } from "react-native-size-matters";
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Work from "react-native-vector-icons/MaterialIcons";
import School from "react-native-vector-icons/Ionicons";
import { useNavigation, StackActions } from "@react-navigation/native";
import FollowButton from "../components/FollowButton"
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChevronLeft from "react-native-vector-icons/Feather"

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const ViewProfileScreen = ({ route }) => {
    const { id, myProfile } = route.params;
    const navigation = useNavigation();
    const popAction = StackActions.pop(1);
    const [profile, setProfile] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    let isFollowing = false;
    let buttonText = "Follow";


    for(const followingId of myProfile.Following) {
        if(followingId === id) {
            isFollowing = true;
            buttonText = "Unfollow";
            break;
        }
    }

    useEffect(() => {
        (async () => {
            for(const followingId of myProfile.Following) {
                if(followingId === id) {
                    isFollowing = true;
                    buttonText = "Unfollow";
                    break;
                }
                
                isFollowing = false;
                buttonText = "Follow";
            }

           
            const res = await fetchUser(id);
            setProfile(res);
            setFollowers(res.Followers.length);
            setFollowing(res.Following.length);

        })();
    }, [isFollowing]);

    const onFollowButtonPressed = () => {
        console.log("follow button pressed");

        if(isFollowing) {
            (async () => {
                const token = await AsyncStorage.getItem("token");
                await unfollow(myProfile.Id, id, token);
                isFollowing = false;
                buttonText = "Follow";
            })();
        }
        
        (async () => {
            const token = await AsyncStorage.getItem("token");
            console.log(myProfile.Login);
            const res = await follow(myProfile.Id, profile.Login, token);

            console.log(res);
            isFollowing = true;
            buttonText = "Unfollow";
        })();
        
        //window.location.href = "ViewProfileScreen"
    }
    
    return(
        <SafeAreaView
        contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-between",
            flexDirection: "column",
        }}
        style={{height: height}}
    >
        <View style={{flexDirection: "row"}}>
                    <ChevronLeft
                        name="chevron-left"
                        size={height *.04}
                        color={"#2F97C9"}
                        onPress={() => navigation.dispatch(popAction)}
                    />
        </View>
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
                    <Text style={{fontSize: height * .02}}>{"@" + profile.Login}</Text>
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
                        <Text style={{fontSize: height * .018, fontWeight: "bold"}}>{followers}</Text>
                        <Text style={{fontSize: height * .018}}> Followers</Text>
                </View>

                <View 
                    style={styles.followingContainer}
                    onStartShouldSetResponder={() => navigation.navigate(FollowingScreen)}>
                        <Text style={{fontSize: height * .018, fontWeight: "bold"}}>{following}</Text>
                        <Text style={{fontSize: height * .018}}> Following</Text>
                </View>


                <FollowButton
                    text={buttonText}
                    onPress={onFollowButtonPressed}
                />
            </View>
        )}
    </SafeAreaView>

    );
};

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

export default ViewProfileScreen