import React, { createContext, useState, useEffect, useRef } from "react";
import { validateJWT, fetchUser } from "../api/user.js";
import jwtDecode from "jwt-decode";
import { getChannels, getMessages, getChannelMembers, getChannelTitle, getUsername } from "../api/user";
import { ChatListener } from "../api/chat";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChannelsContext = createContext();

export function ChannelsStatusProvider({ children }) {
	const [conversations, setConversations] = useState(false);
	const chat = useRef(null);
	// use this for testing
	// dc dc

	useEffect(() => {
		const establishWebSocketConnection = async () => {
			if (chat === null || chat.current === null) {
				chat.current = new ChatListener(await AsyncStorage.getItem("token"));
			}
			//added async to this if something breaks
			chat.current.setListener(async (message) => {
				//use memo to get the name and avatar
				let username = await getUsername(message.SenderId);
				username == null || username.Error != null ? "" : username;
				const formattedMessage = {
					_id: 1, //todo add this
					text: message.Content,
					createdAt: message.DateCreated,
					user: {
						_id: message.SenderId,
						name: username,
						avatar: "https://placeimg.com/140/140/any", //todo add profile image call
					},
				};

				// setConversations([...messages, formattedMessage]);
				setConversations({ ...conversations, Messages: [...conversations.Messages, formattedMessage] });
			});
		};
		const getConversationsCall = async () => {
			//todo add lazy loading
			let tmpChannel = {};
			const response = await getChannels();
			if (response.Error != null) {
				console.log(response.Error);
				//todo send alert with error
				return;
			}
			for (let i = 0; i < response.Channels.length; i++) {
				//todo add lazy loading
				const message = await getMessages(response.Channels[i], 1);
				const channelMembers = await getChannelMembers(response.Channels[i], 0, 10000);
				const channelTitle = await getChannelTitle(response.Channels[i]);

				if (message.Error !== null || channelMembers.Error !== null || channelTitle.Error !== null) {
					//todo send alert with error
					return;
				}

				let channelMembersInfo = [];
				for (let i = 0; i < channelMembers.Members.length; i++) {
					const username = await getUsername(channelMembers.Members[i]);
					if (username == undefined || username.Error !== null) {
						//todo send alert with error
						return;
					}
					channelMembersInfo.push({ [channelMembers.Members[i]]: username.Result });
				}

				tmpChannel = { ...tmpChannel, 
					[response["Channels"][i]]: {
						Messages: [message["Messages"][0]],
						Members: channelMembersInfo,
						Title: channelTitle["Title"],
					},
				};
			}
			setConversations(tmpChannel);
		};
		getConversationsCall();
		establishWebSocketConnection();
	}, []);

	return (
		<ChannelsContext.Provider
			value={{
				conversations,
				setConversations,
				chat,
			}}
		>
			{children}
		</ChannelsContext.Provider>
	);
}

export default ChannelsContext;
// ChannelID: response["Channels"][i],
// Messages: message["Messages"][0],
// Members: channelMembersInfo,
// Title: channelTitle["Title"],
