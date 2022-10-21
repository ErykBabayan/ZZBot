import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";
import config from "./config";
import fs from "node:fs";
import path from "node:path";
// import GUILD_ID from "./index"; // prod ready only

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(config.TEST_DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(config.TEST_CLIENT_ID, config.TEST_GUILD_ID), { body: commands }) // change to GUILD_ID when prod ready
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);
