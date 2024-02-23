"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CommandHandler = require("./CommandHandler");
const CommandRegisterer_1 = __importDefault(require("./CommandRegisterer"));
const BotDataManager_1 = __importDefault(require("./BotDataManager"));
const BotData_1 = __importDefault(require("./BotData"));
const discord_js_1 = require("discord.js");
const FileSearch_1 = __importDefault(require("./FileSearch"));
/**
 * Gets the Guild ID Based off the Name Provided
 * @param guildName Name of the Guild/Discord Server
 * @returns Guild ID
 */
function GetGuildID(guildName) {
    return __awaiter(this, void 0, void 0, function* () {
        let guildID = "";
        const guilds = yield client.guilds.fetch();
        for (const guild of guilds.values()) {
            if (guild.name === guildName) {
                guildID = guild.id;
                break;
            }
        }
        return guildID;
    });
}
function RegisterCommands() {
    let registerer = new CommandRegisterer_1.default(Data);
    let fileSearch = new FileSearch_1.default();
    let commands = fileSearch.GetAllCommands();
    registerer.AddCommands(commands);
    registerer.RegisterCommands();
}
/**
 * Starts the Discord Bot
 */
function StartBot() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Data.LoadData();
        yield client.login(Data.DISCORD_BOT_TOKEN);
        let guildID = yield GetGuildID(Data.GUILD_NAME);
        yield Data.SetGuildID(guildID);
        yield Data.SetClientID(client.user.id);
        yield RegisterCommands();
    });
}
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.IntentsBitField.Flags.Guilds,
        discord_js_1.IntentsBitField.Flags.GuildMembers,
        discord_js_1.IntentsBitField.Flags.GuildMessages,
        discord_js_1.IntentsBitField.Flags.MessageContent,
    ],
});
const Data = BotData_1.default.Instance(BotDataManager_1.default);
StartBot();
client.on("ready", (c) => {
    console.log(`Bot is ready ${c.user.tag}`);
});
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand())
        return;
    console.log(interaction.commandName);
    new CommandHandler().HandleCommand(interaction, client, Data);
}));
