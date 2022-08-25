import config from "./config"
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async (interaction: {
	[x: string]: any; isChatInputCommand?: any; reply?: any; commandName?: any; //TODO Fix later
}) => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server members count: ${interaction?.guild.id}`);
	} else if (commandName === 'user') {
		await interaction.reply(`User ${interaction.user.tag}`);
	}
});

client.login(config.DISCORD_TOKEN);