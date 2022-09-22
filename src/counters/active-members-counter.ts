import { Client, Guild } from "discord.js";
import config from "../config";

const activeMembersCounter = async (client: Client<boolean>): Promise<void> => {
	const guild = client.guilds.cache.get(config.GUILD_ID);
	const channel = guild?.channels.cache.get("1016392952026775622");
	if (guild === undefined) throw new TypeError("The object must not be undefined, aborting");
	const options: any = {
		name: `ActiveMembers: ${guild?.members.cache.filter((member) => member.presence?.status !== "offline" && !member.user.bot).size}`,
		type: 2,
	};
	guild.channels.create(options);

	setInterval(() => {
		const onlineMembers = guild?.members.cache.filter((member) => member.presence?.status !== "offline" && !member.user.bot).size;
		channel?.setName(`Active Members: ${onlineMembers}`);
		console.log("updating onlineMembers: ", onlineMembers);
	}, 180000);
};
export default activeMembersCounter;
