import { EmbedBuilder, Guild, GuildBasedChannel, GuildMember, TextChannel } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";
import constants from "../../constants";

const activeMembersCounter = async (guild: Guild, logChannel: GuildBasedChannel | undefined): Promise<void> => {
	const channelName: string = `Active Members: ${
		guild.members.cache.filter(
			(member) =>
				(member.presence?.status == "online" || member.presence?.status == "idle" || member.presence?.status == "dnd") && !member.user.bot
		).size
	}`;
	const channelId: Promise<any> | string = getOrCreateChannelId(guild, channelName, constants.VOICE_CHANNEL);

	setInterval(async () => {
		const channel: GuildBasedChannel | undefined = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined nor null, aborting");
		const onlineMembers = guild.members.cache.filter(
			(member) =>
				(member.presence?.status == "online" || member.presence?.status == "idle" || member.presence?.status == "dnd") && !member.user.bot
		).size;
		channel.setName(`Active Members: ${onlineMembers}`);
		console.log(`Active Members updated: ${onlineMembers}`);
	}, constants.ACTIVE_MEMBERS_REFRESH_INTERVAL);
};
export default activeMembersCounter;