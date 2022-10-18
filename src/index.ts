import config from "./config";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "node:fs";
import path from "node:path";

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildPresences,
	],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith(".js"));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

client.on("ready", () => {
	console.log("ZŻ Bot is online!");
});
let setupOnce = false; //TODO: REFACTOR INFO BETTER CODE QUALITY SOLUTION
client.on("interactionCreate", async (interaction: any) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);
	if (!setupOnce) {
		if (!command) return;
		try {
			if (interaction.commandName === "setup") setupOnce = true;
			await command.execute(interaction, client);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
		}
	} else if (setupOnce) {
		await interaction.reply({ content: "Setup is already running!", ephemeral: true });
	}
});

client.login(config.DISCORD_TOKEN);
