import { Guild } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";

const activeMembersCounter = async (guild: Guild): Promise<void> => {
	const channelName: string = `Active Members: ${
		guild.members.cache.filter((member: any) => member.presence?.status !== "offline" && !member.user.bot).size
	}`;
	const channelId: Promise<any> = getOrCreateChannelId(guild, channelName, 2);

	setInterval(async () => {
		const channel = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined, aborting");
		const onlineMembers: string = guild.members.cache
			.filter((member) => member.presence?.status !== "offline" && !member.user.bot)
			.size.toLocaleString();
		channel.setName(`Active Members: ${onlineMembers}`);
	}, 60000);
};
export default activeMembersCounter;
