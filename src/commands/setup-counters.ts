import { Client, SlashCommandBuilder } from "discord.js";
import activeMembersCounter from "../counters/active-members-counter";
import totalMemberCounter from "../counters/total-member-counter";

module.exports = {
	data: new SlashCommandBuilder().setName("setup").setDescription("Creates member counters"),
	async execute(interaction: any, client: Client<boolean>) {
		activeMembersCounter(client);
		totalMemberCounter(client);
		await interaction.reply("Member counters created.");
	},
};
