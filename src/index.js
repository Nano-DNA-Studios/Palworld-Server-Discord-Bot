"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PalworldBotDataManager_1 = __importDefault(require("./PalworldBotDataManager"));
//import DiscordBot from "dna-discord-framework/src/Bot/DiscordBot";
const dna_discord_framework_1 = require("dna-discord-framework");
let Bot = new dna_discord_framework_1.DiscordBot(PalworldBotDataManager_1.default);
Bot.StartBot();
