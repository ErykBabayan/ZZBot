import { Guild, TextChannel, EmbedBuilder, MessageOptions, MessagePayload, GuildBasedChannel } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";
import constants from "../../constants";

const totalMemberCounter = async (guild: Guild, logChannel: GuildBasedChannel | undefined): Promise<void> => {
	const botMembers: number = guild.members.cache.filter((member) => member.user.bot).size;
	let channelName: string = `Total Members: ${guild.memberCount - botMembers}`;
	// let channelId: Promise<any> | string;
	// if (!guild.channels.cache.get("1028678204656975946")) {
	// 	channelId = getOrCreateChannelId(guild, channelName, constants.VOICE_CHANNEL);
	// } else {
	// 	channelId = "1028678204656975946";
	// }
	const channelId: any = "1028678204656975946";
	setInterval(async () => {
		const channel: GuildBasedChannel | undefined = guild.channels.cache.get(channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined, aborting");

		const memberCount: number = guild.memberCount - botMembers;
		const memberDiff: number = calculateMemberDiff(channel, memberCount);

		channelName = `Total Members: ${memberCount}`;
		channel.setName(channelName);
		(logChannel as TextChannel).send({ embeds: [embedLog(channelId, channelName, memberDiff)] } as string | MessagePayload | MessageOptions);
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
