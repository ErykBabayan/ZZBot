import config from "./config"
import { Client, GatewayIntentBits } from "discord.js"

const client = new Client({ intents: [GatewayIntentBits.Guilds]})

client.once('ready', () => {
	console.log('Beep Boop');
});

client.login(config.DISCORD_TOKEN);