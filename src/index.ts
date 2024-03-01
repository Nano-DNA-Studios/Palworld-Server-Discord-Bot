import PalworldBotDataManager from "./PalworldBotDataManager";
import { DiscordBot } from "dna-discord-framework";


let Bot = new DiscordBot(PalworldBotDataManager);

Bot.StartBot();