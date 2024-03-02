import PalworldBotDataManager from "./PalworldBotDataManager";
import DiscordBot from "dna-discord-framework/src/Bot/DiscordBot";

let Bot = new DiscordBot(PalworldBotDataManager);

Bot.StartBot();