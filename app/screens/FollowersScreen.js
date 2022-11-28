import { View, Text, StyleSheet, ScrollView, Dimensions, Button, Image } from 'react-native'
import LoginStatusProvider from "../context/LoginStatusProvider";
import React, { useEffect, useState, useContext } from "react";
import { fetchUser } from '../api/user';
import Work from "react-native-vector-icons/MaterialIcons";
import School from "react-native-vector-icons/Ionicons";
import ChevronLeft from "react-native-vector-icons/Feather"
import { useNavigation, StackActions } from "@react-navigation/native";
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import ViewProfileScreen from './ViewProfileScreen';

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;

const FollowersScreen = () => {
    const { profile, setProfile, setIsSigningOut, ...loginContext } = useContext(LoginStatusProvider);
    const [ followers, setFollowers ] = useState([]);
    const navigation = useNavigation();
    const popAction = StackActions.pop(1);

    useEffect(() => {
        (async () => {
            let followerProfiles = [];
            for(const id of profile.Followers) {
                
                const res = await fetchUser(id);

                followerProfiles.push(res);
            }

            setFollowers(followerProfiles);
        })();
    }, []);

   


    return (
        <View styles={styles.container}>
            <ScrollView>
                
                <View style={{flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: "2px"}}>
                    <ChevronLeft
                        name="chevron-left"
                        size={height *.04}
                        color={"#2F97C9"}
                        onPress={() => navigation.dispatch(popAction)}
                    />

                    <Text style={{marginLeft: width*.3, marginTop: 5, fontSize: height*.025, color: "#2F97C9"}}>Followers</Text>

                </View>

                {followers.map((item) => (
                        <View 
                            key={item.Id}  
                            style={styles.itemContainer} 
                            onStartShouldSetResponder={() => 
                                {console.log(item.Id)
                                navigation.navigate("ViewProfileScreen", {
                                id: item.Id,
                                myProfile: profile
                            })}}>
                            
                            <View style={[styles.profilePicContainer]}>
                                <Image
                                    source={{uri: item.ProfilePicture}}
                                    style={[styles.profilePic]}
                                    resizeMode="contain"
                                />
						    </View>
                            
                            <View>
                                <Text style={styles.name}>{item.FirstName + " " + item.LastName}</Text>
                                <Text style={styles.id}>{"@" + item.Login}</Text>

                                <View style={styles.workSchoolContainer}>

                                    <View style={styles.work}>
                                        <Work
                                            name="work"
                                            size={height * .021}
                                            color={"#000"}
                                        /> 

                                    
                                        <Text style={{fontSize: height * .013, marginLeft: 5, marginTop: 3}}>{item.Work}</Text>
                                    </View>
                                    
                                    <View style={styles.school}>
                                        <School
                                            name="school"
                                            size={height * .021}
                                            color={"#000"}
                                        />

                                    
                                        <Text style={{fontSize: height * .013, marginLeft: 5, marginTop: 3}}>{item.School}</Text>
                                    </View>
						        </View>

                                
                            </View>
                        </View>
                    )
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    itemContainer: {
        marginTop: 1,
        height: height/10,
        padding: 10,
        //backgroundColor: "pink",
        fontSize: 24,
        borderBottomColor: "gray",
        borderBottomWidth: "2px",
        flexDirection: "row",
        alignItems: "flex-start"
    },
    profilePicContainer: {
		height: height / 15,
		width: height / 15,
		borderRadius: height / 7.5,
	},
    profilePic: {
		height: height / 15,
		width: height / 15,
		borderRadius: height / 7.5,
	},
    name: {
        fontSize: height*.028,
        marginLeft: 10
    },
    id: {
        fontSize: height * .015,
        marginLeft: 10,
        marginTop: 2
    },
    workSchoolContainer: {
		// position: "relative",
		// flex: .29,
        marginTop: 5,
        marginLeft: 10,
		flexDirection: "row",
		//justifyContent: "space-between",
		 alignItems: "flex-start",
		// height: heightPercentageToDP(0),
		//width: widthPercentageToDP(98),
		// left: 6,
		// top: -15
	},
    work: {
		flexDirection: "row"
	},
	school: {
		flexDirection: "row",
        marginLeft: 7
	},
    
})

export default FollowersScreen