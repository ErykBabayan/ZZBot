import { Guild } from "discord.js";
import createChannel from "./create-channel";

export default async function getOrCreateChannelId(guild: Guild | undefined, channelName: string, channelType:number) {
	if (guild === undefined) throw new TypeError("The guild must not be undefined, aborting");
	if (guild.channels.cache.find((channel) => channel.name === channelName)) {
		return guild.channels.cache.find((channel) => channel.name === channelName)?.id;
	}
	const channel = await createChannel(channelName, channelType, guild);
	if (channel) {
		return channel.id;
	}
	return null;
}
