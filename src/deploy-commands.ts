import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import config from "./config";
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(config.DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);

// const commands = [
// 	new SlashCommandBuilder().setName("setup").setDescription("Starts setup for member counters"),
// 	new SlashCommandBuilder().setName("server").setDescription("Replies with server info!"),		SlashCommand if else
// 	new SlashCommandBuilder().setName("user").setDescription("Replies with user info!"),
// ].map((command) => command.toJSON());
