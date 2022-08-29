import { Client } from "discord.js"
import config from "../config"
const totalMemberCounter = async (client: Client<boolean>) => { 
    setInterval(()=>{
        const guild = client.guilds.cache.get(config.GUILD_ID)
        const memberCount = guild?.memberCount
        const channel = guild?.channels.cache.get("1012755948709884064")
        channel?.setName(`Total Members: ${memberCount?.toLocaleString()}`)
        console.log("updating memberCount: ",memberCount)
    },5000) // TODO: change time to every 4-6h

}
export default totalMemberCounter