import { Client } from "discord.js";
import config from "../config";

const totalMemberCounter = async (client: Client<boolean>): Promise<void> => {
	const guild = client.guilds.cache.get(config.GUILD_ID);
	if (guild === undefined) throw new TypeError("The object must not be undefined, aborting");
	const cacheOnlineMembers: number = guild.members.cache.filter((member: any) => member.presence?.status !== "offline" && !member.user.bot).size;
	const channelName: string = `Total Members: ${cacheOnlineMembers}`;
	let channelId: any;

	if (guild.channels.cache.find((channel) => channel.name === channelName)) {
		channelId = guild.channels.cache.find((channel) => channel.name === channelName)?.id;
	} else {
		const options: any = {
			name: channelName,
			type: 2,
		};
		guild.channels.create(options).then((response) => (channelId = response.id));
	}

	setInterval(() => {
		const channel = guild.channels.cache.get(channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined, aborting");
		const botMembers = guild?.members.cache.filter((member) => member.user.bot).size;
		const memberCount = guild?.memberCount - botMembers;

		channel?.setName(`Total Members: ${memberCount}`);
		console.log(`Updating total members in channel ${channel.name} channel id: ${channel.id}, total members: ${memberCount}`);
	}, 180000);
};

export default totalMemberCounter;
