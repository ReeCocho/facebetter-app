import { View, Text, StyleSheet, ScrollView, Touchable, Pressable, Button } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import defaultImage from "../assets/images/profilePic.jpg";
import { getChannels, getMessages, getChannelMembers, getChannelTitle, getUsername } from "../api/user";
import ConversationOverview from "../components/ConversationOverview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChannelsStatusProvider from "../context/ChannelsStatusProvider";

const MessagesScreen = (title, timestamp, previewMessage) => {
	//todo add a loading indicator
	const navigation = useNavigation();
	const { conversations, setConversations, chat } = useContext(ChannelsStatusProvider);
	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: "space-between",
				flexDirection: "column",
			}}
			style={{ paddingBottom: 20 }}
		>
			{conversations && (
				<View>
					{Object.keys(conversations).map((ChannelID) => (
						<Pressable
							key={ChannelID}
							onPress={() => {
								// const ChannelID = Object.keys(conversation)[0];
								chat.current.setActiveChannel(ChannelID);
								navigation.navigate("ChannelScreen", { ChannelID: ChannelID });
							}}
						>
							<ConversationOverview props={ChannelID} />
						</Pressable>
					))}
					{/* <Button onPress={console.log(JSON.stringify(conversations))} title="pls"></Button> */}
				</View>
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({});

export default MessagesScreen;
