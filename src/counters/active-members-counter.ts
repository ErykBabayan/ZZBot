import { Guild } from "discord.js";
import getOrCreateChannelId from "../functions/get-or-create-channelId";

const activeMembersCounter = async (guild: Guild): Promise<void> => {
	const channelName = `Active Members: ${
		guild.members.cache.filter((member: any) => member.presence?.status !== "offline" && !member.user.bot).size
	}`;
	const channelId:Promise<any> = getOrCreateChannelId(guild,channelName)

	 setInterval(async () => {
		const channel = guild.channels.cache.get(await channelId);
		if (channel === undefined) throw new TypeError("The object must not be undefined, aborting");
		const onlineMembers: number = guild?.members.cache.filter((member) => member.presence?.status !== "offline" && !member.user.bot).size;
		channel.setName(`Active Members: ${onlineMembers}`);
		console.log(`Updating active members in channel ${channel.name} channel id: ${channel.id}, online members: ${onlineMembers}`);
	}, 10000); //small interval for testing
};
export default activeMembersCounter;
