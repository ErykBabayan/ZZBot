import { Guild, GuildBasedChannel, GuildMember } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";
import constants from "../../constants";

const activeMembersCounter = async (guild: Guild): Promise<void> => {
	const channelName: string = `Active Members: ${
		guild.members.cache.filter((member: GuildMember) => member.presence?.status !== "offline" && !member.user.bot).size
	}`;
	if (getOrCreateChannelId(guild, channelName, constants.VOICE_CHANNEL) === null || undefined) {
		throw new TypeError("The object must not be undefined, aborting");
	}
	const channelId: Promise<any> = getOrCreateChannelId(guild, channelName, constants.VOICE_CHANNEL);

	setInterval(async () => {
		const channel: GuildBasedChannel | undefined = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined nor null, aborting");
		const onlineMembers: string = guild.members.cache
			.filter((member) => member.presence?.status !== "offline" && !member.user.bot)
			.size.toLocaleString();
		channel.setName(`Active Members: ${onlineMembers}`);
	}, constants.ACTIVE_MEMBERS_REFRESH_INTERVAL);
};
export default activeMembersCounter;
