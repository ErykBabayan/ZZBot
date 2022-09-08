import { Client, Guild } from "discord.js";
import config from "../config";

const activeMembersCounter = async(client: Client<boolean>): Promise<void> => {
	const guild = client.guilds.cache.get(config.GUILD_ID);
	const channel = guild?.channels.cache.get("1016392952026775622")

	setInterval(()=>{
		const onlineMembers = guild?.members.cache.filter((member) => member.presence?.status !== "offline" && !member.user.bot).size;
		channel?.setName(`Active Members: ${onlineMembers}`)
		console.log("updating onlineMembers: ", onlineMembers);
	},180000)



}
export default activeMembersCounter;
