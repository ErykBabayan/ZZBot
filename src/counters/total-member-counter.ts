import { Guild } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";

const totalMemberCounter = async (guild: Guild): Promise<void> => {
	const channelName: string = `Total Members: ${guild.memberCount}`;
	const channelId: Promise<any> = getOrCreateChannelId(guild, channelName);

	setInterval(async () => {
		const channel = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined, aborting");
		const botMembers = guild?.members.cache.filter((member) => member.user.bot).size;
		const memberCount = guild?.memberCount - botMembers;
		channel?.setName(`Total Members: ${memberCount}`);
		console.log(`Updating total members in channel ${channel.name} channel id: ${channel.id}, total members: ${memberCount}`);
	}, 10000); //small interval for testing
};

export default totalMemberCounter;
