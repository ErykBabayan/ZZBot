import { Guild, TextChannel } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";

const totalMemberCounter = async (guild: Guild): Promise<void> => {
	const botMembers: number = guild.members.cache.filter((member) => member.user.bot).size;
	const channelName: string = `Total Members: ${guild.memberCount - botMembers}`;
	const channelId: Promise<any> = getOrCreateChannelId(guild, channelName, 2);
	const logChannelId: Promise<any> = getOrCreateChannelId(guild, "logi-zż", 0);
	setInterval(async () => {
		const channel = guild.channels.cache.get(await channelId);
		const logChannel = guild.channels.cache.get(await logChannelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined, aborting");

		const memberCount: string = (guild.memberCount - botMembers).toLocaleString();
		channel.setName(`Total Members: ${memberCount}`);

		(logChannel as TextChannel).send(`Updating total members in channel ${channel.name}`);
	}, 50000);
};

export default totalMemberCounter;
