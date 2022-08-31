import { Client, Guild } from "discord.js";
import config from "../config";

const totalMemberCounter = async (client: Client<boolean>) => {
	const guild = client.guilds.cache.get(config.GUILD_ID);
	if (guild === undefined) {
		throw new TypeError("The object must not be undefined, aborting");
	}
	setInterval(() => {
		const channel = guild.channels.cache.get("1012755948709884064");
		if (channel === undefined) {
			throw new TypeError("The object must not be undefined, aborting");
		}
		const memberCount = guild.memberCount;
		channel.setName(`Total Members: ${memberCount}`);
		console.log("updating memberCount: ", memberCount);
	}, 300000); // TODO: change time to every 4-6
};

export default totalMemberCounter;
