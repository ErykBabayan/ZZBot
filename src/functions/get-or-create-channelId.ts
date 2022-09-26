import { Guild } from "discord.js";
import createChannel from "./create-channel";

export default async function getOrCreateChannelId(guild: Guild, channelName: string) {
	if (guild.channels.cache.find((channel) => channel.name === channelName)) {
		return guild.channels.cache.find((channel) => channel.name === channelName)?.id;
	}
	const channel = await createChannel(channelName, 2, guild);
	if (channel) {
		console.log(channel.id);
		return channel.id
	}
	return null;
}
