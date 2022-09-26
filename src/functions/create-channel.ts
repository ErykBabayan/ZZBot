import { Guild } from "discord.js";
export default async function createChannel(channelName: string, channelType: number, guild: Guild) {
    const options: any = {
        name: channelName,
        type: channelType,
    };
    return guild?.channels.create(options);
}