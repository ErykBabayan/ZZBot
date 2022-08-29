import config from "./config"
import { Client, GatewayIntentBits }  from 'discord.js';
import totalMemberCounter from "./counters/total-member-counter"
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
	console.log('ZŻ Bot is online!');
	totalMemberCounter(client)
});

client.on('interactionCreate', async (interaction: {
	[x: string]: any; isChatInputCommand?: any; reply?: any; commandName?: any; //TODO Fix later
}) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server ID: ${interaction.guild.id}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Member Count ${interaction.guild.memberCount}`);
	}
});

client.login(config.DISCORD_TOKEN);
