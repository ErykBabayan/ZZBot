import { EmbedBuilder, Guild, GuildBasedChannel, GuildMember, TextChannel } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";
import constants from "../../constants";

const activeMembersCounter = async (guild: Guild, logChannel: GuildBasedChannel | undefined): Promise<void> => {
	const channelName: string = `Active Members: ${
		guild.members.cache.filter(
			(member: GuildMember) =>
				(member.presence?.status == "online" || member.presence?.status == "idle" || member.presence?.status == "dnd") && !member.user.bot
		).size
	}`;
	let channelId: any = "";
	if (Boolean(guild.channels.cache.get("1034481378496098364"))) {
		channelId = "1034481378496098364"
	}
	else{
		channelId = getOrCreateChannelId(guild, channelName, constants.VOICE_CHANNEL);
	}
	

	setInterval(async () => {
		const channel: GuildBasedChannel | undefined = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined nor null, aborting");
		const onlineMembers = guild.members.cache.filter(
			(member: GuildMember) =>
				(member.presence?.status == "online" || member.presence?.status == "idle" || member.presence?.status == "dnd") && !member.user.bot
		).size;
		channel.setName(`Active Members: ${onlineMembers}`);
		// const embedLog = new EmbedBuilder()
		// 	.setTitle("Updated active members channel")
		// 	.addFields({ name: "Online Members", value: `${onlineMembers}` });
		// (logChannel as TextChannel).send({ embeds: [embedLog] });
	}, constants.ACTIVE_MEMBERS_REFRESH_INTERVAL);
};
export default activeMembersCounter;
