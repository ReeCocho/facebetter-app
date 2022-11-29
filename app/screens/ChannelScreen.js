import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { getMessages, getChannelMembers, getChannelTitle, getUsername } from "../api/user";
import ChannelsStatusProvider from "../context/ChannelsStatusProvider";
import LoginStatusProvider from "../context/LoginStatusProvider";
import { ChatListener } from "../api/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChannelScreen = ({ route }) => {
	//todo modify conversations so that I do not have to pass this through the route.params
	const [messages, setMessages] = useState([]);
	const { ChannelID, Profile } = route.params;
	// const { conversations, setConversations, chat } = useContext(ChannelsStatusProvider);

	const chat = useRef(null);

	useEffect(() => {
		const establishWebSocketConnection = async () => {
			if (chat === null || chat.current === null) {
				chat.current = new ChatListener(await AsyncStorage.getItem("token"), ChannelID);
			}
			//added async to this if something breaks
			chat.current.setListener((message) => {
				//use memo to get the name and avatar
				let username = Profile.Login;
				username == null || username.Error != null ? "" : username;
				const formattedMessage = {
					_id: message.DateCreated, // todo
					text: message.Content,
					createdAt: message.DateCreated,
					user: {
						_id: message.SenderId,
						name: username,
						avatar: Profile.ProfilePicture, //todo add profile image call
					},
				};
				setMessages((previousMessages) => GiftedChat.append(previousMessages, formattedMessage));
			});
		};

		(async () => {
			await establishWebSocketConnection();
		})();
	}, []);

	const { profile, ...loginContext } = useContext(LoginStatusProvider);

	/*
    conversation = {"Messages":[{"SenderId":"636da7d3f459ca05f325a0c9","ChannelId":"63799e7004bf7a829d85a5b1","Content":"Dfs","DateCreated":"2022-11-27T22:09:32.737Z"}],"Members":[{"636da7d3f459ca05f325a0c9":"test4"}],"Title":"Gamer Chat"}
    */

	//todo make it load all at once and not one by one
	useEffect(() => {
		const getChannelMessages = async (async) => {
			const response = await getMessages(ChannelID, 1000, Date.now());
			if (response === null || response.Error !== null) {
				//todo add alert with error
				return;
			}
			let formattedMessages = [];
			for (let i = 0; i < response.Messages.length; i++) {
				let username = await getUsername(response.Messages[i].SenderId);
				username = username == undefined || username.Error !== null ? "" : username.Result;
				let formattedMessage = {
					_id: response.Messages[i].DateCreated, // todo
					text: response.Messages[i].Content,
					createdAt: response.Messages[i].DateCreated,
					user: {
						_id: response.Messages[i].SenderId,
						name: username,
						avatar: Profile.ProfilePicture,
					},
				};
				formattedMessages.push(formattedMessage);
			}
			setMessages(formattedMessages);
			// setConversations({ ...conversations, Messages: [...conversations.Messages, formattedMessage] });
			// setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: [...conversation.Messages, formattedMessage]}});
			// setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: [formattedMessage]}});
		};
		
		(async () => {
			getChannelMessages();
		})();

        // setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: messages}});
        // return () => {
        //     console.log("here")
        //     setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: messages}});
        // }
	}, []);

	const onSend = useCallback((messages = []) => {
        (async () => {
			chat.current.sendMessage(
				await AsyncStorage.getItem("token"), 
				messages[0].text
			);
		})();
	}, []);

	return (
		<GiftedChat
			messages={messages}
			onSend={(messages) => onSend(messages)}
			user={{
				_id: profile.Id,
			}}
		/>
	);
};

export default ChannelScreen;
