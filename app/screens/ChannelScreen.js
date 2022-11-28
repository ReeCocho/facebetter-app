import { View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { getMessages, getChannelMembers, getChannelTitle, getUsername } from "../api/user";
import ChannelsStatusProvider from "../context/ChannelsStatusProvider";
import LoginStatusProvider from "../context/LoginStatusProvider";
import { ChatListener } from "../api/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChannelScreen = ({ route }) => {
	//todo modify conversations so that I do not have to pass this through the route.params
	const [messages, setMessages] = useState([]);
	const { ChannelID } = route.params;
	const { conversations, setConversations, chat } = useContext(ChannelsStatusProvider);
	const { profile, ...loginContext } = useContext(LoginStatusProvider);
	const conversation = conversations[ChannelID];

	/*
    conversation = {"Messages":[{"SenderId":"636da7d3f459ca05f325a0c9","ChannelId":"63799e7004bf7a829d85a5b1","Content":"Dfs","DateCreated":"2022-11-27T22:09:32.737Z"}],"Members":[{"636da7d3f459ca05f325a0c9":"test4"}],"Title":"Gamer Chat"}
    */

	//todo make it load all at once and not one by one
	useEffect(() => {
		const getChannelMessages = async (async) => {
			const response = await getMessages(ChannelID, 50, Date.now());
			if (response === null || response.Error !== null) {
				//todo add alert with error
				return;
			}
			let formattedMessages = [];
			for (let i = 0; i < response.Messages.length; i++) {
				let username = await getUsername(response.Messages[i].SenderId);
				username = username == undefined || username.Error !== null ? "" : username.Result;
				let formattedMessage = {
					_id: i,
					text: response.Messages[i].Content,
					createdAt: response.Messages[i].DateCreated,
					user: {
						_id: response.Messages[i].SenderId,
						name: username,
						avatar: "https://placeimg.com/140/140/any",
					},
				};
				formattedMessages.push(formattedMessage);
			}
			setMessages(formattedMessages);
			// setConversations({ ...conversations, Messages: [...conversations.Messages, formattedMessage] });
			// setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: [...conversation.Messages, formattedMessage]}});
			// setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: [formattedMessage]}});
		};
		getChannelMessages();
        // setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: messages}});
        // return () => {
        //     console.log("here")
        //     setConversations({ ...conversations, [conversations[ChannelID]]: {...conversation, Messages: messages}});
        // }
	}, []);

	const onSend = useCallback(async (messages = []) => {
		// setConversations({ ...conversations, Messages: [...conversations.Messages, formattedMessage] });
		// setConversations((previousMessages) => GiftedChat.append(previousMessages, messages));
		setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
		//todo add error handling
        await chat.current.sendMessage(await AsyncStorage.getItem("token"), messages[0].text);
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
