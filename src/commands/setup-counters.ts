import { Client, GuildBasedChannel, SlashCommandBuilder } from "discord.js";
import activeMembersCounter from "../tools/counters/active-members-counter";
import totalMemberCounter from "../tools/counters/total-member-counter";
import config from "../config";
import constants from "../constants";
import getOrCreateChannelId from "../tools/functions/get-or-create-channelId";
//import GUILD_ID from "../index"

module.exports = {
	data: new SlashCommandBuilder().setName("setup").setDescription("Creates member counters"),
	async execute(interaction: any, client: Client<boolean>) {
		if (interaction.member.roles.cache.some((role: any) => role.name === constants.MODERATOR_ROLE)) {
			const guild = client.guilds.cache.get(config.TEST_GUILD_ID);
			const logChannelId: Promise<any> = getOrCreateChannelId(guild, "logi-zż", constants.TEXT_CHANNEL);
			const logChannel: GuildBasedChannel | undefined = guild?.channels.cache.get(await logChannelId);

			if (guild === undefined) throw new TypeError("The object must not be undefined, aborting");
			activeMembersCounter(guild, logChannel);
			totalMemberCounter(guild, logChannel);
			await interaction.reply("Member counters started.");
		} else {
			await interaction.reply("You don't have permission to use this command.");
		}
	},
};
