"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileSearch_1 = __importDefault(require("dna-discord-framework/src/FileSearch"));
const PalworldBotDataManager_1 = __importDefault(require("./PalworldBotDataManager"));
const DiscordBot_1 = __importDefault(require("dna-discord-framework/src/Bot/DiscordBot"));
let Bot = new DiscordBot_1.default(PalworldBotDataManager_1.default);
Bot.StartBot();
console.log(new FileSearch_1.default().GetAllJSFiles());
