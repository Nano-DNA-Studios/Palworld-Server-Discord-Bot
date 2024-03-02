import FileSearch from "dna-discord-framework/src/FileSearch";
import PalworldBotDataManager from "./PalworldBotDataManager";
import DiscordBot from "dna-discord-framework/src/Bot/DiscordBot";


let Bot = new DiscordBot(PalworldBotDataManager);

Bot.StartBot();

console.log(new FileSearch().GetAllJSFiles())