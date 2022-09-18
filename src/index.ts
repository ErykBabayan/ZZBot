import config from "./config";
const fs = require("node:fs");
const path:any = require("node:path");
import { Client, GatewayIntentBits, Collection } from "discord.js";
import totalMemberCounter from "./counters/total-member-counter";
import activeMembersCounter from "./counters/active-members-counter";

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
 const commandPath = path.join(__dirname, "commands"); // joins dir absolute path with commands folder

 const commandFiles = fs.readdirSync(commandPath).filter((file: string) => file.endsWith(".js")); // readdirSync returns array with filenames in a dir

for (const file of commandFiles) {
	const filePath = path.join(commandFiles, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// client.on("ready", () => {
// 	console.log("ZŻ Bot is online!");
// 	//totalMemberCounter(client);
// 	//activeMembersCounter(client);
// 	console.log(commandPath);
// });

// client.on(
// 	"interactionCreate",
// 	async (interaction: {
// 		[x: string]: any;
// 		isChatInputCommand?: any;
// 		reply?: any;
// 		commandName?: any; //TODO Fix later
// 	}) => {
// 		if (!interaction.isChatInputCommand()) return;

// 		// const command = interaction.client.commands.get(interaction.commandName); // fetching command from interaction Collection
// 		// if (!command) return;
// 		// try {
// 		// 	await command.execute(interaction);
// 		// } catch (error) {
// 		// 	console.error(error);
// 		// 	await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
// 		// }

// 		/*  Executing command via if else approach  */
// 		const { commandName } = interaction;
// 		if (commandName === "setup") {
// 			interaction.reply("Successfully started setup");
// 			await totalMemberCounter(client);
// 		} else if (commandName === "server") {
// 			await interaction.reply(`Server ID: ${interaction.guild.id}`);
// 		} else if (commandName === "user") {
// 			await interaction.reply(`Member Count ${interaction.guild.memberCount}`);
// 		}
// 	}
// );

client.login(config.DISCORD_TOKEN);
