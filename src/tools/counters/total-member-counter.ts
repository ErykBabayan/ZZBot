import { Guild, TextChannel, EmbedBuilder, MessageOptions, MessagePayload, GuildBasedChannel } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";
import constants from "../../constants";

const totalMemberCounter = async (guild: Guild, logChannel: GuildBasedChannel | undefined): Promise<void> => {
	const botMembers: number = guild.members.cache.filter((member) => member.user.bot).size;
	let channelName: string = `👤| Wszyscy: ${guild.memberCount - botMembers}`;
	let channelId: any = "";
	if (Boolean(guild.channels.cache.get("1032036974091051088"))) {
		channelId = "1032036974091051088";
	} else {
		channelId = getOrCreateChannelId(guild, channelName, constants.VOICE_CHANNEL);
	}

	setInterval(async () => {
		const channel: GuildBasedChannel | undefined = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined, aborting");

		const memberCount: number = guild.memberCount - botMembers;
		const memberDiff: number = calculateMemberDiff(channel, memberCount);

		channelName = `👤| Wszyscy: ${memberCount}`;
		channel.setName(channelName);
		(logChannel as TextChannel).send({ embeds: [embedLog(await channelId, channelName, memberDiff)] } as
			| string
			| MessagePayload
			| MessageOptions);
	}, constants.TOTAL_MEMBERS_REFRESH_INTERVAL);
};

const embedLog = (channelId: Promise<any>, channelName: string, memberDiff: number) => {
	const embedMessage = new EmbedBuilder()
		.setColor(0x0099ff)
		.setTitle("Total Members channel update")
		.addFields({ name: "Name", value: channelName, inline: true }, { name: "New users", value: `${memberDiff}`, inline: true })
		.setTimestamp()
		.setFooter({ text: `Channel ID: ${channelId}` });

	return embedMessage;
};

const calculateMemberDiff = (channel: GuildBasedChannel | undefined, memberCount: number) => {
	const splitPrevUsersChannel: any = channel?.name.split(" ");
	const prevUsersChannel = splitPrevUsersChannel[splitPrevUsersChannel.length - 1];
	return memberCount - prevUsersChannel;
};
export default totalMemberCounter;
