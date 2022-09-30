import { Client, SlashCommandBuilder } from "discord.js";
import activeMembersCounter from "../counters/active-members-counter";
import totalMemberCounter from "../counters/total-member-counter";
import config from "../config";

module.exports = {
	data: new SlashCommandBuilder().setName("setup").setDescription("Creates member counters"),
	async execute(interaction: any, client: Client<boolean>) {
		if (interaction.member.roles.cache.some((role: any) => role.name === "Moderator")) {
			const guild: any = client.guilds.cache.get(config.GUILD_ID);
			if (guild === undefined) throw new TypeError("The object must not be undefined, aborting");
			activeMembersCounter(guild);
			totalMemberCounter(guild);
			await interaction.reply("Member counters started.");
		} else {
			await interaction.reply("You don't have permission to use this command.");
		}
	},
};
