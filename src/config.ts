import dotenv from "dotenv"

dotenv.config()

const{DISCORD_TOKEN, CLIENT_ID, GUILD_ID} = process.env
 
if(!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID){
    throw new Error("Missing environment variables")
}
const config = {
    DISCORD_TOKEN,
    CLIENT_ID,
    GUILD_ID
}

exports.DISCORD_TOKEN = DISCORD_TOKEN
exports.CLIENT_ID = CLIENT_ID
exports.GUILD_ID = GUILD_ID