import { EmbedBuilder, Guild, GuildBasedChannel, GuildMember, TextChannel } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";
import constants from "../../constants";

const activeMembersCounter = async (guild: Guild, logChannel: GuildBasedChannel | undefined): Promise<void> => {
	const channelName: string = `Active Members: ${
		guild.members.cache.filter((member: GuildMember) => member.presence?.status !== "offline" && !member.user.bot).size
	}`;
	const channelId: Promise<any> = getOrCreateChannelId(guild, channelName, constants.VOICE_CHANNEL);

	setInterval(async () => {
		const channel: GuildBasedChannel | undefined = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined nor null, aborting");
		const onlineMembers = (await guild.members.fetch()).filter((member) => !member.user.bot && member.presence?.status !== "offline").size;
		channel.setName(`Active Members: ${onlineMembers}`);
		const embedLog = new EmbedBuilder()
			.setTitle("Updated active members channel")
			.addFields({ name: "Online Members", value: `${onlineMembers}` });
		(logChannel as TextChannel).send({ embeds: [embedLog] });
	}, constants.ACTIVE_MEMBERS_REFRESH_INTERVAL);
};
export default activeMembersCounter;
