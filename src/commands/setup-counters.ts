import { Client, SlashCommandBuilder } from "discord.js";
import activeMembersCounter from "../counters/active-members-counter";
import totalMemberCounter from "../counters/total-member-counter";
import config from "../config";

module.exports = {
	data: new SlashCommandBuilder().setName("setup").setDescription("Creates member counters"),
	async execute(interaction: any, client: Client<boolean>) {
		const guild = client.guilds.cache.get(config.GUILD_ID);
		if (guild === undefined) throw new TypeError("The object must not be undefined, aborting");

		activeMembersCounter(guild);
		totalMemberCounter(guild);
		await interaction.reply("Member counters started.");
	},
};
