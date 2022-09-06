import { Client, Guild } from "discord.js";
import config from "../config";

function activeMembersCounter(client: Client<boolean>): void {
	const guild = client.guilds.cache.get(config.GUILD_ID);
	if (guild === undefined) {
		throw new TypeError("The object must not be undefined, aborting");
	}
	const onlineMembers = guild.members.cache.filter((member) => member.presence?.status === "online").size;
}
export default activeMembersCounter;
