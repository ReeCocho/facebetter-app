import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import defaultImage from "../assets/images/profilePic.jpg";
import { useNavigation } from "@react-navigation/native";
import ChannelsStatusProvider from "../context/ChannelsStatusProvider";

const ConversationOverview = ({ props }) => {
	const navigation = useNavigation();
	const ChannelID = props;
	const { conversations, setConversations, chat } = useContext(ChannelsStatusProvider);
    const conversation = conversations[ChannelID] 
    const onPress = () => {
		navigation.navigate("ChannelScreen", { ChannelID });
	};
    
	return (
		//todo fix the date
		//todo test with multiple members
		// <Pressable onPress={onPress} style={styles.container}>

		<View style={styles.container}>
			{/* <Image source={{ uri: chatRoom.imageUri || user?.imageUri }} style={styles.image} /> */}
			<Image source={defaultImage} style={styles.image} />
			<View style={styles.rightContainer}>
				<View style={styles.row}>
                    <Text style={styles.name}> {conversation.Title || Object.values(conversation.Members[0])}</Text>
					<Text style={styles.text}> {conversation.Messages[0] !== undefined ? conversation.Messages[conversation.Messages.length - 1].DateCreated : ""}</Text>
				</View>
				<Text numberOfLines={1} style={styles.text}>
					{conversation.Messages[0] !== undefined ? conversation.Messages[conversation.Messages.length - 1].Content : ""}
				</Text>
			</View>
		</View>

		// <View>
		// 	<Text>Jeff</Text>
		// </View>
		// </Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		padding: 10,
	},
	image: {
		height: 50,
		width: 50,
		borderRadius: 30,
		marginRight: 10,
	},
	badgeContainer: {
		backgroundColor: "#3777f0",
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "white",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		left: 45,
		top: 10,
	},
	badgeText: {
		color: "white",
		fontSize: 12,
	},
	rightContainer: {
		flex: 1,
		justifyContent: "center",
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	name: {
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 3,
	},
	text: {
		color: "grey",
	},
});

export default ConversationOverview;
